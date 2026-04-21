import { JSON } from "assemblyscript-json/assembly";
import {
  ENS_CORE_ABI,
} from "../../lib/evm";
import { createEvmLens, EvmLogDocument } from "../../lib/evm";
import {
  ENS_BASE_REGISTRAR_ADDRESS,
  ENS_ETH_NODE,
  ENS_LEGACY_ETH_REGISTRAR_CONTROLLER_ADDRESS,
  ENS_NAME_WRAPPER_ADDRESS,
  ENS_PUBLIC_RESOLVER_ADDRESS,
  ENS_REGISTRY_ADDRESS,
  ENS_UNWRAPPED_ETH_REGISTRAR_CONTROLLER_ADDRESS,
  ENS_WRAPPED_ETH_REGISTRAR_CONTROLLER_ADDRESS,
  ENS_ZERO_ADDRESS,
  buildDisplayName,
  childNode,
  decodeDnsEncodedName,
  json,
  LensContext,
  namehash,
  labelhash,
  normalizeEnsAddress,
  normalizeEnsName,
  rows,
  row,
  skip,
  LensOutput,
} from "../../lib/index";

class NoArgs {}

function stripHexPrefix(value: string): string {
  if (
    value.length >= 2 &&
    value.charCodeAt(0) == 48 &&
    (value.charCodeAt(1) == 120 || value.charCodeAt(1) == 88)
  ) {
    return value.substring(2);
  }

  return value;
}

function normalizeBytes32(value: string): string {
  const clean = stripHexPrefix(value).toLowerCase();
  if (clean.length >= 64) {
    return "0x" + clean.substring(clean.length - 64);
  }

  let padded = clean;
  while (padded.length < 64) {
    padded = "0" + padded;
  }

  return "0x" + padded;
}

function parseHexWordToI32(value: string): i32 {
  const clean = stripHexPrefix(value);
  let out: u64 = 0;
  for (let i = 0; i < clean.length; i++) {
    const code = clean.charCodeAt(i);
    let nibble: u64 = 0;
    if (code >= 48 && code <= 57) {
      nibble = <u64>(code - 48);
    } else if (code >= 97 && code <= 102) {
      nibble = <u64>(code - 87);
    } else if (code >= 65 && code <= 70) {
      nibble = <u64>(code - 55);
    }
    out = (out << 4) | nibble;
    if (out > <u64>i32.MAX_VALUE) {
      return i32.MAX_VALUE;
    }
  }
  return <i32>out;
}

function readDataWord(cleanDataHex: string, byteOffset: i32): string {
  const start = byteOffset * 2;
  if (start + 64 > cleanDataHex.length) {
    return "";
  }
  return cleanDataHex.substring(start, start + 64);
}

function parseUint256Array(cleanDataHex: string, headByteOffset: i32): string[] {
  const offsetWord = readDataWord(cleanDataHex, headByteOffset);
  if (offsetWord.length == 0) {
    return [];
  }

  const dynamicOffset = parseHexWordToI32(offsetWord);
  const lengthWord = readDataWord(cleanDataHex, dynamicOffset);
  if (lengthWord.length == 0) {
    return [];
  }

  const count = parseHexWordToI32(lengthWord);
  const out = new Array<string>();
  for (let i = 0; i < count; i++) {
    const itemWord = readDataWord(cleanDataHex, dynamicOffset + 32 + i * 32);
    if (itemWord.length == 0) break;
    out.push(normalizeBytes32(itemWord));
  }
  return out;
}

function firstLabelOfName(name: string): string {
  const dotIndex = name.indexOf(".");
  return dotIndex == -1 ? name : name.substring(0, dotIndex);
}

function parentNameOfName(name: string): string {
  const dotIndex = name.indexOf(".");
  return dotIndex == -1 ? "" : name.substring(dotIndex + 1);
}

function eventId(log: EvmLogDocument, suffix: string = ""): string {
  const base = log.transaction.hash.toLowerCase() + ":" + log.logIndex.toString();
  return suffix.length > 0 ? base + ":" + suffix : base;
}

function isZeroAddress(address: string): bool {
  return normalizeEnsAddress(address) == ENS_ZERO_ADDRESS;
}

function getOrSeedKnownResolvers(ctx: LensContext<NoArgs>): string[] {
  const store = ctx.store.entity<string, string>("EnsKnownResolvers");
  if (!store.has(ENS_PUBLIC_RESOLVER_ADDRESS)) {
    store.set(ENS_PUBLIC_RESOLVER_ADDRESS, ENS_PUBLIC_RESOLVER_ADDRESS);
  }
  return store.values();
}

function rememberResolver(ctx: LensContext<NoArgs>, resolver: string): void {
  const normalized = normalizeEnsAddress(resolver);
  if (isZeroAddress(normalized)) {
    return;
  }

  const store = ctx.store.entity<string, string>("EnsKnownResolvers");
  store.set(normalized, normalized);
}

function isKnownResolver(ctx: LensContext<NoArgs>, resolver: string): bool {
  getOrSeedKnownResolvers(ctx);
  return ctx
    .store
    .entity<string, string>("EnsKnownResolvers")
    .has(normalizeEnsAddress(resolver));
}

function makeBaseEvent(log: EvmLogDocument, eventType: string): JSON.Obj {
  const out = json.object();
  out.set("eventId", eventId(log));
  out.set("eventType", eventType);
  out.set("txHash", log.transaction.hash.toLowerCase());
  out.set("actor", normalizeEnsAddress(log.transaction.from));
  out.set("blockNumber", log.blockNumber);
  out.set("logIndex", log.logIndex);
  if (log.block.timestamp.length > 0) {
    out.set("timestamp", log.block.timestamp);
  }
  return out;
}

function makeDomainEvent(
  log: EvmLogDocument,
  eventType: string,
  domainId: string,
): JSON.Obj {
  const out = makeBaseEvent(log, eventType);
  out.set("domainId", normalizeBytes32(domainId));
  return out;
}

function emitRegistryTransfer(log: EvmLogDocument, owner: string): JSON.Obj {
  const out = makeDomainEvent(log, "registry_transfer", log.topics[1]);
  out.set("owner", normalizeEnsAddress(owner));
  return out;
}

function emitRegistryNewOwner(
  log: EvmLogDocument,
  owner: string,
): JSON.Obj {
  const parentId = normalizeBytes32(log.topics[1]);
  const rawLabelhash = normalizeBytes32(log.topics[2]);
  const domainId = childNode(parentId, rawLabelhash);
  const out = makeDomainEvent(log, "registry_new_owner", domainId);
  out.set("parentId", parentId);
  out.set("labelhash", rawLabelhash);
  out.set("owner", normalizeEnsAddress(owner));
  return out;
}

function emitRegistryNewResolver(
  ctx: LensContext<NoArgs>,
  log: EvmLogDocument,
  resolver: string,
): JSON.Obj {
  const normalizedResolver = normalizeEnsAddress(resolver);
  rememberResolver(ctx, normalizedResolver);

  const out = makeDomainEvent(log, "registry_new_resolver", log.topics[1]);
  out.set("resolver", normalizedResolver);
  return out;
}

function emitRegistryNewTtl(log: EvmLogDocument, ttl: string): JSON.Obj {
  const out = makeDomainEvent(log, "registry_new_ttl", log.topics[1]);
  out.set("ttl", ttl);
  return out;
}

function emitRegistrationCreated(
  log: EvmLogDocument,
  labelName: string,
  registrant: string,
  expiryDate: string,
  cost: string,
): JSON.Obj {
  const rawLabelhash = normalizeBytes32(log.topics[1]);
  const domainId = childNode(ENS_ETH_NODE, rawLabelhash);
  const out = makeDomainEvent(log, "registration_created", domainId);
  const normalizedLabel = normalizeEnsName(labelName);

  out.set("registrationId", rawLabelhash);
  out.set("labelhash", rawLabelhash);
  out.set("registrant", normalizeEnsAddress(registrant));
  out.set("expiryDate", expiryDate);
  out.set("cost", cost);

  if (normalizedLabel.length > 0) {
    out.set("labelName", normalizedLabel);
    out.set("name", buildDisplayName(normalizedLabel, rawLabelhash, "eth"));
  } else {
    out.set("name", buildDisplayName("", rawLabelhash, "eth"));
  }

  return out;
}

function emitRegistrationRenewed(
  log: EvmLogDocument,
  labelName: string,
  expiryDate: string,
  cost: string,
): JSON.Obj {
  const rawLabelhash = normalizeBytes32(log.topics[1]);
  const domainId = childNode(ENS_ETH_NODE, rawLabelhash);
  const out = makeDomainEvent(log, "registration_renewed", domainId);
  const normalizedLabel = normalizeEnsName(labelName);

  out.set("registrationId", rawLabelhash);
  out.set("labelhash", rawLabelhash);
  out.set("expiryDate", expiryDate);
  out.set("cost", cost);

  if (normalizedLabel.length > 0) {
    out.set("labelName", normalizedLabel);
    out.set("name", buildDisplayName(normalizedLabel, rawLabelhash, "eth"));
  }

  return out;
}

function emitRegistrationTransferred(
  log: EvmLogDocument,
  registrant: string,
): JSON.Obj {
  const rawLabelhash = normalizeBytes32(log.topics[3]);
  const domainId = childNode(ENS_ETH_NODE, rawLabelhash);
  const out = makeDomainEvent(log, "registration_transferred", domainId);
  out.set("registrationId", rawLabelhash);
  out.set("labelhash", rawLabelhash);
  out.set("registrant", normalizeEnsAddress(registrant));
  return out;
}

function emitNameWrapped(
  log: EvmLogDocument,
  name: string,
  owner: string,
  fuses: string,
  expiryDate: string,
): JSON.Obj {
  const domainId = normalizeBytes32(log.topics[1]);
  const out = makeDomainEvent(log, "name_wrapped", domainId);
  const normalizedName = normalizeEnsName(name);
  const labelName = firstLabelOfName(normalizedName);
  const parentName = parentNameOfName(normalizedName);

  out.set("wrappedOwner", normalizeEnsAddress(owner));
  out.set("owner", normalizeEnsAddress(owner));
  out.set("fuses", fuses);
  out.set("expiryDate", expiryDate);

  if (normalizedName.length > 0) {
    out.set("name", normalizedName);
    if (labelName.length > 0) {
      out.set("labelName", labelName);
      out.set("labelhash", labelhash(labelName));
    }
    if (parentName.length > 0) {
      out.set("parentId", namehash(parentName));
    }
  }

  return out;
}

function emitNameUnwrapped(log: EvmLogDocument, owner: string): JSON.Obj {
  const out = makeDomainEvent(log, "name_unwrapped", log.topics[1]);
  out.set("owner", normalizeEnsAddress(owner));
  return out;
}

function emitFusesSet(log: EvmLogDocument, fuses: string): JSON.Obj {
  const out = makeDomainEvent(log, "fuses_set", log.topics[1]);
  out.set("fuses", fuses);
  return out;
}

function emitExpiryExtended(log: EvmLogDocument, expiryDate: string): JSON.Obj {
  const out = makeDomainEvent(log, "expiry_extended", log.topics[1]);
  out.set("expiryDate", expiryDate);
  return out;
}

function emitWrappedTransfer(
  log: EvmLogDocument,
  domainId: string,
  owner: string,
  suffix: string = "",
): JSON.Obj {
  const out = makeDomainEvent(log, "wrapped_transfer", domainId);
  out.set("eventId", eventId(log, suffix));
  out.set("wrappedOwner", normalizeEnsAddress(owner));
  out.set("owner", normalizeEnsAddress(owner));
  return out;
}

function emitResolverRecord(
  log: EvmLogDocument,
  eventType: string,
  recordType: string,
  value: string,
): JSON.Obj {
  const out = makeDomainEvent(log, eventType, log.topics[1]);
  out.set("resolver", normalizeEnsAddress(log.address));
  out.set("recordType", recordType);
  if (value.length > 0) {
    out.set("value", value);
  }
  return out;
}

const lens = createEvmLens<NoArgs, JSON.Obj>(
  (log, decoded, ctx): LensOutput<JSON.Obj> | null => {
    const normalizedAddress = normalizeEnsAddress(log.address);
    const cleanDataHex = stripHexPrefix(log.data);

    if (normalizedAddress == ENS_REGISTRY_ADDRESS) {
      if (decoded.name == "Transfer") {
        const owner = decoded.getArg("owner");
        if (owner == null) return skip<JSON.Obj>();
        return row(emitRegistryTransfer(log, owner));
      }

      if (decoded.name == "NewOwner") {
        const owner = decoded.getArg("owner");
        if (owner == null) return skip<JSON.Obj>();
        return row(emitRegistryNewOwner(log, owner));
      }

      if (decoded.name == "NewResolver") {
        const resolver = decoded.getArg("resolver");
        if (resolver == null) return skip<JSON.Obj>();
        const nextDoc = emitRegistryNewResolver(ctx, log, resolver);
        return row<JSON.Obj>(nextDoc);
      }

      if (decoded.name == "NewTTL") {
        const ttl = decoded.getArg("ttl");
        if (ttl == null) return skip<JSON.Obj>();
        return row(emitRegistryNewTtl(log, ttl));
      }
    }

    if (normalizedAddress == ENS_BASE_REGISTRAR_ADDRESS) {
      if (decoded.name == "NameRegistered") {
        const owner = decoded.getArg("owner");
        const expires = decoded.getArg("expires");
        if (owner == null || expires == null) return skip<JSON.Obj>();
        return row(emitRegistrationCreated(log, "", owner, expires, ""));
      }

      if (decoded.name == "NameRenewed") {
        const expires = decoded.getArg("expires");
        if (expires == null) return skip<JSON.Obj>();
        return row(emitRegistrationRenewed(log, "", expires, ""));
      }

      if (decoded.name == "Transfer") {
        const to = decoded.getArg("to");
        if (to == null) return skip<JSON.Obj>();
        return row(emitRegistrationTransferred(log, to));
      }
    }

    if (
      normalizedAddress == ENS_LEGACY_ETH_REGISTRAR_CONTROLLER_ADDRESS ||
      normalizedAddress == ENS_WRAPPED_ETH_REGISTRAR_CONTROLLER_ADDRESS ||
      normalizedAddress == ENS_UNWRAPPED_ETH_REGISTRAR_CONTROLLER_ADDRESS
    ) {
      if (decoded.name == "NameRegistered") {
        const nameArg = decoded.getArg("name");
        const labelArg = decoded.getArg("label");
        const owner = decoded.getArg("owner");
        const expires = decoded.getArg("expires");
        if (owner == null || expires == null) return skip<JSON.Obj>();

        const labelName = nameArg != null && nameArg.length > 0 ? nameArg : (labelArg != null ? labelArg : "");
        let cost = "";
        const baseCost = decoded.getArg("baseCost");
        const premium = decoded.getArg("premium");
        const singleCost = decoded.getArg("cost");
        if (baseCost != null && premium != null) {
          cost = baseCost.length > 0 && premium.length > 0 ? baseCost + "+" + premium : "";
        } else if (singleCost != null) {
          cost = singleCost;
        }

        return row(emitRegistrationCreated(log, labelName, owner, expires, cost));
      }

      if (decoded.name == "NameRenewed") {
        const nameArg = decoded.getArg("name");
        const labelArg = decoded.getArg("label");
        const expires = decoded.getArg("expires");
        const cost = decoded.getArg("cost");
        if (expires == null) return skip<JSON.Obj>();

        const labelName = nameArg != null && nameArg.length > 0 ? nameArg : (labelArg != null ? labelArg : "");
        return row(emitRegistrationRenewed(log, labelName, expires, cost != null ? cost : ""));
      }
    }

    if (normalizedAddress == ENS_NAME_WRAPPER_ADDRESS) {
      if (decoded.name == "NameWrapped") {
        const rawName = decoded.getArg("name");
        const owner = decoded.getArg("owner");
        const fuses = decoded.getArg("fuses");
        const expiry = decoded.getArg("expiry");
        if (rawName == null || owner == null || fuses == null || expiry == null) {
          return skip<JSON.Obj>();
        }

        const decodedName = decodeDnsEncodedName(rawName);
        return row(
          emitNameWrapped(
            log,
            decodedName != null ? decodedName : "",
            owner,
            fuses,
            expiry,
          ),
        );
      }

      if (decoded.name == "NameUnwrapped") {
        const owner = decoded.getArg("owner");
        if (owner == null) return skip<JSON.Obj>();
        return row(emitNameUnwrapped(log, owner));
      }

      if (decoded.name == "FusesSet") {
        const fuses = decoded.getArg("fuses");
        if (fuses == null) return skip<JSON.Obj>();
        return row(emitFusesSet(log, fuses));
      }

      if (decoded.name == "ExpiryExtended") {
        const expiry = decoded.getArg("expiry");
        if (expiry == null) return skip<JSON.Obj>();
        return row(emitExpiryExtended(log, expiry));
      }

      if (decoded.name == "TransferSingle") {
        const to = decoded.getArg("to");
        const idWord = readDataWord(cleanDataHex, 0);
        if (to == null || idWord.length == 0) return skip<JSON.Obj>();
        return row(emitWrappedTransfer(log, normalizeBytes32(idWord), to));
      }

      if (decoded.name == "TransferBatch") {
        const to = decoded.getArg("to");
        if (to == null) return skip<JSON.Obj>();

        const ids = parseUint256Array(cleanDataHex, 0);
        const out = new Array<JSON.Obj>();
        for (let i = 0; i < ids.length; i++) {
          out.push(emitWrappedTransfer(log, ids[i], to, i.toString()));
        }
        return out.length > 0 ? rows(out) : skip<JSON.Obj>();
      }
    }

    if (!isKnownResolver(ctx, normalizedAddress)) {
      return skip<JSON.Obj>();
    }

    if (decoded.name == "AddrChanged") {
      const value = decoded.getArg("a");
      if (value == null) return skip<JSON.Obj>();
      return row(
        emitResolverRecord(
          log,
          "resolver_addr_changed",
          "addr",
          normalizeEnsAddress(value),
        ),
      );
    }

    if (decoded.name == "AddressChanged") {
      const coinType = decoded.getArg("coinType");
      const value = decoded.getArg("newAddress");
      if (coinType == null || value == null) return skip<JSON.Obj>();
      const out = emitResolverRecord(
        log,
        "resolver_multicoin_addr_changed",
        "multicoin-addr",
        value,
      );
      out.set("coinType", coinType);
      return row(out);
    }

    if (decoded.name == "TextChanged") {
      const key = decoded.getArg("key");
      if (key == null || key.length == 0) return skip<JSON.Obj>();

      const out = emitResolverRecord(
        log,
        "resolver_text_changed",
        "text",
        decoded.getArg("value") != null ? decoded.getArg("value")! : "",
      );
      out.set("recordKey", key);
      return row(out);
    }

    if (decoded.name == "NameChanged") {
      const value = decoded.getArg("name");
      if (value == null) return skip<JSON.Obj>();
      return row(
        emitResolverRecord(log, "resolver_name_changed", "name", normalizeEnsName(value)),
      );
    }

    if (decoded.name == "ContenthashChanged") {
      const value = decoded.getArg("hash");
      if (value == null) return skip<JSON.Obj>();
      return row(
        emitResolverRecord(log, "resolver_contenthash_changed", "contenthash", value),
      );
    }

    if (decoded.name == "ABIChanged") {
      const contentType = decoded.getArg("contentType");
      if (contentType == null) return skip<JSON.Obj>();
      const out = emitResolverRecord(log, "resolver_abi_changed", "abi", contentType);
      out.set("recordKey", "contentType");
      return row(out);
    }

    if (decoded.name == "PubkeyChanged") {
      const x = decoded.getArg("x");
      const y = decoded.getArg("y");
      if (x == null || y == null) return skip<JSON.Obj>();
      return row(
        emitResolverRecord(log, "resolver_pubkey_changed", "pubkey", x + ":" + y),
      );
    }

    if (decoded.name == "InterfaceChanged") {
      const interfaceId = decoded.getArg("interfaceID");
      const implementer = decoded.getArg("implementer");
      if (interfaceId == null || implementer == null) return skip<JSON.Obj>();
      const out = emitResolverRecord(
        log,
        "resolver_interface_changed",
        "interface",
        normalizeEnsAddress(implementer),
      );
      out.set("recordKey", interfaceId);
      return row(out);
    }

    if (decoded.name == "AuthorisationChanged") {
      const owner = decoded.getArg("owner");
      const target = decoded.getArg("target");
      const authorised = decoded.getArg("isAuthorised");
      if (owner == null || target == null || authorised == null) return skip<JSON.Obj>();
      const out = emitResolverRecord(
        log,
        "resolver_authorisation_changed",
        "authorisation",
        authorised,
      );
      out.set("owner", normalizeEnsAddress(owner));
      out.set("recordKey", normalizeEnsAddress(target));
      return row(out);
    }

    if (decoded.name == "VersionChanged") {
      const version = decoded.getArg("newVersion");
      if (version == null) return skip<JSON.Obj>();
      return row(
        emitResolverRecord(log, "resolver_version_changed", "version", version),
      );
    }

    return skip<JSON.Obj>();
  },
  null,
  null,
  null,
  (ctx) => {
    getOrSeedKnownResolvers(ctx);
  },
  null,
  ENS_CORE_ABI,
);

export default lens;
export * from "../../lib/exports";
