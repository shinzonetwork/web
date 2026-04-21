import { JSON } from "assemblyscript-json/assembly";
import {
  createLens,
  EntityStore,
  normalizeEnsAddress,
  normalizeEnsName,
  rows,
  skip,
  LensContext,
  LensOutput,
} from "../../lib/index";
import {
  EnsNormalizedEvent,
  parseEnsNormalizedEvent,
  putString,
} from "../utils/normalized";
import { json } from "../../lib/json";

class NoArgs {}

class WrappedDomainState {
  id: string = "";
  domainId: string = "";
  name: string = "";
  owner: string = "";
  fuses: string = "";
  expiryDate: string = "";
}

function getWrappedDomains(
  ctx: LensContext<NoArgs>,
): EntityStore<string, WrappedDomainState> {
  return ctx.store.entity<string, WrappedDomainState>("EnsWrappedDomainState");
}

function compareDecimal(left: string, right: string): i32 {
  if (left.length != right.length) {
    return left.length > right.length ? 1 : -1;
  }
  if (left == right) return 0;
  return left > right ? 1 : -1;
}

function applyEvent(ctx: LensContext<NoArgs>, event: EnsNormalizedEvent): void {
  const store = getWrappedDomains(ctx);

  if (event.eventType == "name_unwrapped") {
    if (event.domainId.length > 0) {
      store.delete(event.domainId);
    }
    return;
  }

  if (
    event.eventType != "name_wrapped" &&
    event.eventType != "wrapped_transfer" &&
    event.eventType != "fuses_set" &&
    event.eventType != "expiry_extended"
  ) {
    return;
  }

  if (event.domainId.length == 0) {
    return;
  }

  let wrapped = store.get(event.domainId);
  if (wrapped == null) {
    const state = new WrappedDomainState();
    state.id = event.domainId;
    state.domainId = event.domainId;
    store.set(event.domainId, state);
    wrapped = state;
  }

  if (event.name.length > 0) {
    wrapped.name = normalizeEnsName(event.name);
  }

  if (event.wrappedOwner.length > 0) {
    wrapped.owner = normalizeEnsAddress(event.wrappedOwner);
  }

  if (event.fuses.length > 0) {
    wrapped.fuses = event.fuses;
  }

  if (event.expiryDate.length > 0) {
    if (
      wrapped.expiryDate.length == 0 ||
      compareDecimal(event.expiryDate, wrapped.expiryDate) >= 0
    ) {
      wrapped.expiryDate = event.expiryDate;
    }
  }

  store.set(wrapped.id, wrapped);
}

function finalizeRows(ctx: LensContext<NoArgs>): LensOutput<JSON.Obj> | null {
  const wrappedDomains = getWrappedDomains(ctx).values();
  const out = new Array<JSON.Obj>();

  for (let i = 0; i < wrappedDomains.length; i++) {
    const wrapped = wrappedDomains[i];
    const rowDoc = json.object();
    rowDoc.set("id", wrapped.id);
    rowDoc.set("domainId", wrapped.domainId);
    putString(rowDoc, "name", wrapped.name);
    putString(rowDoc, "owner", wrapped.owner);
    putString(rowDoc, "fuses", wrapped.fuses);
    putString(rowDoc, "expiryDate", wrapped.expiryDate);
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
  finalizeRows,
);

export default lens;
export * from "../../lib/exports";
