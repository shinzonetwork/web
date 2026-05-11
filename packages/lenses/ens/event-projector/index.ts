import { JSON } from "assemblyscript-json/assembly";
import {
  createLens,
  row,
  skip,
  LensOutput,
} from "../../lib/index";
import {
  parseEnsNormalizedEvent,
  putInt,
  putString,
} from "../utils/normalized";
import { json } from "../../lib/json";

class NoArgs {}

const lens = createLens<NoArgs, JSON.Obj>((doc): LensOutput<JSON.Obj> | null => {
  const event = parseEnsNormalizedEvent(doc);
  if (event.eventId.length == 0 || event.domainId.length == 0) {
    return skip<JSON.Obj>();
  }

  const out = json.object();
  out.set("id", event.eventId);
  out.set("eventType", event.eventType);
  out.set("domainId", event.domainId);
  putString(out, "name", event.name);
  putString(out, "owner", event.owner);
  putString(out, "registrant", event.registrant);
  putString(out, "resolver", event.resolver);
  putString(out, "ttl", event.ttl);
  putString(out, "expiryDate", event.expiryDate);
  putString(out, "fuses", event.fuses);
  putString(out, "recordType", event.recordType);
  putString(out, "recordKey", event.recordKey);
  putString(out, "coinType", event.coinType);
  putString(out, "value", event.value);
  putString(out, "actor", event.actor);
  out.set("txHash", event.txHash);
  putInt(out, "blockNumber", event.blockNumber);
  putInt(out, "logIndex", event.logIndex);
  putString(out, "timestamp", event.timestamp);
  return row(out);
});

export default lens;
export * from "../../lib/exports";
