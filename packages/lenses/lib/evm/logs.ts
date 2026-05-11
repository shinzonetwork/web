import { JSON } from "assemblyscript-json/assembly";
import { keccak256 } from "../keccak256";
import { hexEncode } from "../hex";
import { decodeAbiValue, decodeIndexedAbiWord, decodeAbiWord } from "./decoder";
import { AbiEvent, AbiInput, DecodedArgument, DecodedLog } from "./types";

export class EvmLogLike {
  address: string = "";
  topics: string[] = [];
  data: string = "";
}

/** Parses an ABI JSON array and returns only event definitions. */
export function parseAbi(abiJson: string): AbiEvent[] {
  const events = new Array<AbiEvent>();
  const items = <JSON.Arr>JSON.parse(abiJson);
  const values = items.valueOf();

  for (let i = 0; i < values.length; i++) {
    const item = <JSON.Obj>values[i];
    const typeField = item.getString("type");
    if (typeField == null || typeField.valueOf() != "event") continue;

    const nameField = item.getString("name");
    if (nameField == null) continue;

    const inputsField = item.getArr("inputs");
    if (inputsField == null) continue;

    const inputs = new Array<AbiInput>();
    const types = new Array<string>();
    const inputValues = inputsField.valueOf();

    for (let j = 0; j < inputValues.length; j++) {
      const input = <JSON.Obj>inputValues[j];
      const inputName = input.getString("name");
      const inputType = input.getString("type");
      if (inputName == null || inputType == null) continue;

      const indexedField = input.getBool("indexed");
      const indexed = indexedField != null ? indexedField.valueOf() : false;

      const typeName = inputType.valueOf();
      inputs.push(new AbiInput(inputName.valueOf(), typeName, indexed));
      types.push(typeName);
    }

    const signature = nameField.valueOf() + "(" + types.join(",") + ")";
    events.push(new AbiEvent(nameField.valueOf(), signature, computeSelector(signature), inputs));
  }

  return events;
}

/** Returns `true` when the provided ABI can be parsed successfully. */
export function validateAbi(abiJson: string): bool {
  parseAbi(abiJson);
  return true;
}

/** Computes the Keccak-derived topic0 selector for an event signature. */
export function computeSelector(signature: string): string {
  const sigBytes = String.UTF8.encode(signature, false);
  const hash = keccak256(Uint8Array.wrap(sigBytes));
  return "0x" + hexEncode(hash);
}

/** Compares two topics/selectors case-insensitively. */
export function topicEquals(topic: string, selector: string): bool {
  return topic.toLowerCase() == selector.toLowerCase();
}

/** Finds the ABI event whose selector matches `topic0`. */
export function findMatchingEvent(events: AbiEvent[], topic0: string): AbiEvent | null {
  for (let i = 0; i < events.length; i++) {
    if (topicEquals(topic0, events[i].selector)) {
      return events[i];
    }
  }

  return null;
}

/**
 * Decodes a log using the provided ABI JSON string.
 *
 * This is the simplest entrypoint when you do not need to cache parsed ABI
 * events yourself.
 */
export function decodeLog(abiJson: string, log: EvmLogLike): DecodedLog | null {
  if (log.topics.length == 0) return null;

  return decodeLogWithEvents(parseAbi(abiJson), log);
}

/** Finds an ABI event definition by its event name. */
export function findEventByName(events: AbiEvent[], eventName: string): AbiEvent | null {
  for (let i = 0; i < events.length; i++) {
    if (events[i].name == eventName) {
      return events[i];
    }
  }

  return null;
}

/** Decodes a log using pre-parsed ABI events. */
export function decodeLogWithEvents(events: AbiEvent[], log: EvmLogLike): DecodedLog | null {
  if (log.topics.length == 0) return null;

  const matched = findMatchingEvent(events, log.topics[0]);
  if (matched == null) return null;

  const decoded = new DecodedLog();
  decoded.name = matched.name;
  decoded.event = matched.name;
  decoded.signature = matched.signature;
  decoded.selector = matched.selector;
  decoded.arguments = decodeEvent(matched, log.topics, log.data);
  return decoded;
}

/** Decodes one event payload from its topics and data. */
export function decodeEvent(event: AbiEvent, topics: string[], data: string): DecodedArgument[] {
  const args = new Array<DecodedArgument>();
  const nonIndexed = new Array<AbiInput>();
  let topicIndex = 1;

  for (let i = 0; i < event.inputs.length; i++) {
    const input = event.inputs[i];
    if (input.indexed) {
      if (topicIndex < topics.length) {
        args.push(
          new DecodedArgument(
            input.name,
            input.typeName,
            decodeIndexedAbiWord(input.typeName, topics[topicIndex]),
          ),
        );
      }
      topicIndex++;
      continue;
    }

    nonIndexed.push(input);
  }

  if (data.length <= 2) return args;

  let dataHex = data;
  if (dataHex.length >= 2 && dataHex.charCodeAt(0) == 48 && (dataHex.charCodeAt(1) == 120 || dataHex.charCodeAt(1) == 88)) {
    dataHex = dataHex.substring(2);
  }

  let offset = 0;
  for (let i = 0; i < nonIndexed.length; i++) {
    if (offset + 64 > dataHex.length) break;
    const chunk = "0x" + dataHex.substring(offset, offset + 64);
    args.push(
      new DecodedArgument(
        nonIndexed[i].name,
        nonIndexed[i].typeName,
        decodeAbiValue(nonIndexed[i].typeName, dataHex, chunk),
      ),
    );
    offset += 64;
  }

  return args;
}

/**
 * Decodes one ABI-encoded parameter into a normalized string form.
 *
 * Numeric values are returned as decimal strings, addresses are normalized to
 * `0x`-prefixed lowercase, and fixed bytes stay hex-encoded.
 */
export function decodeParam(typeName: string, hexData: string): string {
  return decodeAbiWord(typeName, hexData);
}
