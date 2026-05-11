import { JSON } from "assemblyscript-json/assembly";
import {
  createLens,
  EntityStore,
  normalizeEnsAddress,
  normalizeEnsName,
  reverseNodeForAddress,
  rows,
  skip,
  LensContext,
  LensOutput,
} from "../../lib/index";
import {
  EnsNormalizedEvent,
  parseEnsNormalizedEvent,
  putInt,
  putString,
} from "../utils/normalized";
import { json } from "../../lib/json";

class NoArgs {}

class PrimaryNameState {
  address: string = "";
  domainId: string = "";
  name: string = "";
  resolver: string = "";
  blockNumber: i64 = 0;
  txHash: string = "";
}

function getPrimaryNames(
  ctx: LensContext<NoArgs>,
): EntityStore<string, PrimaryNameState> {
  return ctx.store.entity<string, PrimaryNameState>("EnsPrimaryNameState");
}

function deleteByDomainId(ctx: LensContext<NoArgs>, domainId: string): void {
  const store = getPrimaryNames(ctx);
  const items = store.values();
  for (let i = 0; i < items.length; i++) {
    if (items[i].domainId == domainId) {
      store.delete(items[i].address);
    }
  }
}

function applyEvent(ctx: LensContext<NoArgs>, event: EnsNormalizedEvent): void {
  if (
    (event.eventType == "registry_new_resolver" ||
      event.eventType == "resolver_version_changed") &&
    event.domainId.length > 0
  ) {
    deleteByDomainId(ctx, event.domainId);
    if (event.eventType != "resolver_version_changed") {
      return;
    }
  }

  if (event.eventType != "resolver_name_changed" || event.domainId.length == 0) {
    return;
  }

  const address = normalizeEnsAddress(event.actor);
  if (address.length == 0 || reverseNodeForAddress(address) != event.domainId) {
    return;
  }

  if (event.value.length == 0) {
    getPrimaryNames(ctx).delete(address);
    return;
  }

  const state = new PrimaryNameState();
  state.address = address;
  state.domainId = event.domainId;
  state.name = normalizeEnsName(event.value);
  state.resolver = event.resolver;
  state.blockNumber = event.blockNumber;
  state.txHash = event.txHash;
  getPrimaryNames(ctx).set(address, state);
}

function finalizeRows(ctx: LensContext<NoArgs>): LensOutput<JSON.Obj> | null {
  const primaryNames = getPrimaryNames(ctx).values();
  const out = new Array<JSON.Obj>();

  for (let i = 0; i < primaryNames.length; i++) {
    const primary = primaryNames[i];
    const rowDoc = json.object();
    rowDoc.set("address", primary.address);
    rowDoc.set("domainId", primary.domainId);
    rowDoc.set("name", primary.name);
    putString(rowDoc, "resolver", primary.resolver);
    putInt(rowDoc, "blockNumber", primary.blockNumber);
    putString(rowDoc, "txHash", primary.txHash);
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
