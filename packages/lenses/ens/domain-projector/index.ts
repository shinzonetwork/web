import { JSON } from "assemblyscript-json/assembly";
import {
  ENS_ROOT_NODE,
  EntityStore,
  buildDisplayName,
  childNode,
  createLens,
  labelhash,
  normalizeEnsAddress,
  normalizeEnsName,
  placeholderLabel,
  rows,
  skip,
  LensContext,
  LensOutput,
} from "../../lib/index";
import {
  EnsNormalizedEvent,
  parseEnsNormalizedEvent,
  putBool,
  putInt,
  putString,
} from "../utils/normalized";
import { json } from "../../lib/json";

class NoArgs {}

class DomainState {
  id: string = "";
  labelName: string = "";
  labelhash: string = "";
  parentId: string = "";
  owner: string = "";
  registrant: string = "";
  wrappedOwner: string = "";
  resolver: string = "";
  ttl: string = "";
  resolvedAddress: string = "";
  expiryDate: string = "";
  createdAt: string = "";
  isWrapped: bool = false;
  subdomainCount: i32 = 0;
}

function compareDecimal(left: string, right: string): i32 {
  if (left.length != right.length) {
    return left.length > right.length ? 1 : -1;
  }

  if (left == right) {
    return 0;
  }

  return left > right ? 1 : -1;
}

function getDomains(ctx: LensContext<NoArgs>): EntityStore<string, DomainState> {
  return ctx.store.entity<string, DomainState>("EnsDomainState");
}

function getOrCreateDomain(
  ctx: LensContext<NoArgs>,
  id: string,
  timestamp: string,
): DomainState {
  const domains = getDomains(ctx);
  let state = domains.get(id);
  if (state == null) {
    const state = new DomainState();
    state.id = id;
    state.createdAt = timestamp;
    domains.set(id, state);
    return state;
  }

  return state;
}

function setParent(
  ctx: LensContext<NoArgs>,
  domain: DomainState,
  parentId: string,
  timestamp: string,
): void {
  if (parentId.length == 0 || domain.parentId == parentId) {
    return;
  }

  if (domain.parentId.length > 0) {
    const previousParent = getOrCreateDomain(ctx, domain.parentId, timestamp);
    if (previousParent.subdomainCount > 0) {
      previousParent.subdomainCount -= 1;
      getDomains(ctx).set(previousParent.id, previousParent);
    }
  }

  domain.parentId = parentId;
  const nextParent = getOrCreateDomain(ctx, parentId, timestamp);
  nextParent.subdomainCount += 1;
  getDomains(ctx).set(nextParent.id, nextParent);
}

function ensureNamedDomainPath(
  ctx: LensContext<NoArgs>,
  fullName: string,
  timestamp: string,
): string {
  const normalized = normalizeEnsName(fullName);
  if (normalized.length == 0) {
    return ENS_ROOT_NODE;
  }

  const labels = normalized.split(".");
  let parentId = ENS_ROOT_NODE;

  for (let i = labels.length - 1; i >= 0; i--) {
    const label = labels[i];
    const currentId = childNode(parentId, labelhash(label));
    const domain = getOrCreateDomain(ctx, currentId, timestamp);
    if (domain.labelName.length == 0) {
      domain.labelName = label;
    }
    if (domain.labelhash.length == 0) {
      domain.labelhash = labelhash(label);
    }
    setParent(ctx, domain, parentId, timestamp);
    getDomains(ctx).set(currentId, domain);
    parentId = currentId;
  }

  return parentId;
}

function setMaxExpiry(domain: DomainState, expiry: string): void {
  if (expiry.length == 0) return;
  if (domain.expiryDate.length == 0 || compareDecimal(expiry, domain.expiryDate) > 0) {
    domain.expiryDate = expiry;
  }
}

function applyResolverRecord(domain: DomainState, event: EnsNormalizedEvent): void {
  if (domain.resolver.length == 0 || domain.resolver != event.resolver) {
    return;
  }

  if (event.eventType == "resolver_addr_changed") {
    domain.resolvedAddress = normalizeEnsAddress(event.value);
    return;
  }

  if (
    event.eventType == "resolver_multicoin_addr_changed" &&
    (event.coinType.length == 0 || event.coinType == "60")
  ) {
    domain.resolvedAddress = event.value;
    return;
  }

  if (event.eventType == "resolver_version_changed") {
    domain.resolvedAddress = "";
  }
}

function applyEvent(ctx: LensContext<NoArgs>, event: EnsNormalizedEvent): void {
  if (event.domainId.length == 0) {
    return;
  }

  if (event.name.length > 0) {
    ensureNamedDomainPath(ctx, event.name, event.timestamp);
  }

  const domain = getOrCreateDomain(ctx, event.domainId, event.timestamp);

  if (event.labelName.length > 0) {
    domain.labelName = normalizeEnsName(event.labelName);
  }

  if (event.labelhash.length > 0) {
    domain.labelhash = event.labelhash;
  } else if (domain.labelhash.length == 0 && domain.labelName.length > 0) {
    domain.labelhash = labelhash(domain.labelName);
  }

  if (event.parentId.length > 0) {
    setParent(ctx, domain, event.parentId, event.timestamp);
  }

  if (event.eventType == "registry_transfer" && event.owner.length > 0) {
    domain.owner = normalizeEnsAddress(event.owner);
  }

  if (event.eventType == "registry_new_owner") {
    if (event.owner.length > 0) {
      domain.owner = normalizeEnsAddress(event.owner);
    }
  }

  if (event.eventType == "registry_new_resolver") {
    domain.resolver = normalizeEnsAddress(event.resolver);
    if (domain.resolver.length == 0) {
      domain.resolvedAddress = "";
    }
  }

  if (event.eventType == "registry_new_ttl") {
    domain.ttl = event.ttl;
  }

  if (
    event.eventType == "registration_created" ||
    event.eventType == "registration_renewed" ||
    event.eventType == "registration_transferred"
  ) {
    if (event.registrant.length > 0) {
      domain.registrant = normalizeEnsAddress(event.registrant);
    }
    setMaxExpiry(domain, event.expiryDate);
    if (domain.parentId.length == 0 && event.name.length > 0) {
      const parentName = event.name.substring(event.name.indexOf(".") + 1);
      if (parentName.length > 0) {
        setParent(ctx, domain, ensureNamedDomainPath(ctx, parentName, event.timestamp), event.timestamp);
      }
    }
  }

  if (event.eventType == "name_wrapped" || event.eventType == "wrapped_transfer") {
    if (event.wrappedOwner.length > 0) {
      domain.wrappedOwner = normalizeEnsAddress(event.wrappedOwner);
    }
    domain.isWrapped = true;
  }

  if (event.eventType == "name_wrapped") {
    setMaxExpiry(domain, event.expiryDate);
  }

  if (event.eventType == "name_unwrapped") {
    domain.wrappedOwner = "";
    domain.isWrapped = false;
  }

  if (event.eventType == "expiry_extended") {
    setMaxExpiry(domain, event.expiryDate);
  }

  if (event.eventType == "fuses_set" && domain.wrappedOwner.length > 0) {
    domain.isWrapped = true;
  }

  applyResolverRecord(domain, event);

  getDomains(ctx).set(domain.id, domain);
}

function resolveDomainName(
  ctx: LensContext<NoArgs>,
  domain: DomainState,
  depth: i32 = 0,
): string {
  if (domain.id == ENS_ROOT_NODE || depth > 32) {
    return "";
  }

  let parentName = "";
  if (domain.parentId.length > 0) {
    const parent = getDomains(ctx).get(domain.parentId);
    if (parent != null) {
      parentName = resolveDomainName(ctx, parent, depth + 1);
    } else if (domain.parentId != ENS_ROOT_NODE) {
      parentName = placeholderLabel(domain.parentId);
    }
  }

  return buildDisplayName(
    domain.labelName.length > 0 ? domain.labelName : null,
    domain.labelhash.length > 0 ? domain.labelhash : domain.id,
    parentName,
  );
}

function finalizeDomains(ctx: LensContext<NoArgs>): LensOutput<JSON.Obj> | null {
  const domains = getDomains(ctx).values();
  const out = new Array<JSON.Obj>();

  for (let i = 0; i < domains.length; i++) {
    const domain = domains[i];
    const rowDoc = json.object();
    rowDoc.set("id", domain.id);
    rowDoc.set("name", resolveDomainName(ctx, domain));
    putString(rowDoc, "labelName", domain.labelName);
    putString(rowDoc, "labelhash", domain.labelhash);
    putString(rowDoc, "parentId", domain.parentId);
    putString(rowDoc, "owner", domain.owner);
    putString(rowDoc, "registrant", domain.registrant);
    putString(rowDoc, "wrappedOwner", domain.wrappedOwner);
    putString(rowDoc, "resolver", domain.resolver);
    putString(rowDoc, "ttl", domain.ttl);
    putString(rowDoc, "resolvedAddress", domain.resolvedAddress);
    putString(rowDoc, "expiryDate", domain.expiryDate);
    putInt(rowDoc, "subdomainCount", domain.subdomainCount);
    putString(rowDoc, "createdAt", domain.createdAt);
    putBool(rowDoc, "isWrapped", domain.isWrapped);
    out.push(rowDoc);
  }

  return out.length > 0 ? rows(out) : skip<JSON.Obj>();
}

const lens = createLens<NoArgs, JSON.Obj>(
  (doc, ctx) => {
    applyEvent(ctx, parseEnsNormalizedEvent(doc));
    return skip<JSON.Obj>();
  },
  null,
  null,
  finalizeDomains,
);

export default lens;
export * from "../../lib/exports";
