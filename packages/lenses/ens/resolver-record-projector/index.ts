import { JSON } from "assemblyscript-json/assembly";
import {
  createLens,
  EntityStore,
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

class ResolverRecordState {
  id: string = "";
  domainId: string = "";
  name: string = "";
  resolver: string = "";
  recordType: string = "";
  recordKey: string = "";
  coinType: string = "";
  value: string = "";
  blockNumber: i64 = 0;
  txHash: string = "";
}

function getRecords(
  ctx: LensContext<NoArgs>,
): EntityStore<string, ResolverRecordState> {
  return ctx.store.entity<string, ResolverRecordState>("EnsResolverRecordState");
}

function recordId(event: EnsNormalizedEvent): string {
  const key = event.recordKey.length > 0 ? event.recordKey : "-";
  const coinType = event.coinType.length > 0 ? event.coinType : "-";
  return event.domainId + "|" + event.recordType + "|" + key + "|" + coinType;
}

function deleteDomainRecords(ctx: LensContext<NoArgs>, domainId: string): void {
  const store = getRecords(ctx);
  const records = store.values();
  for (let i = 0; i < records.length; i++) {
    if (records[i].domainId == domainId) {
      store.delete(records[i].id);
    }
  }
}

function applyResolverEvent(ctx: LensContext<NoArgs>, event: EnsNormalizedEvent): void {
  if (event.domainId.length == 0 || event.recordType.length == 0) {
    return;
  }

  const store = getRecords(ctx);
  const id = recordId(event);
  let record = store.get(id);
  if (record == null) {
    const state = new ResolverRecordState();
    state.id = id;
    state.domainId = event.domainId;
    store.set(id, state);
    record = state;
  }

  record.domainId = event.domainId;
  record.name = event.name;
  record.resolver = event.resolver;
  record.recordType = event.recordType;
  record.recordKey = event.recordKey;
  record.coinType =
    event.coinType.length > 0
      ? event.coinType
      : event.recordType == "addr"
        ? "60"
        : "";
  record.value = event.value;
  record.blockNumber = event.blockNumber;
  record.txHash = event.txHash;
  store.set(record.id, record);
}

function applyEvent(ctx: LensContext<NoArgs>, event: EnsNormalizedEvent): void {
  if (event.eventType == "registry_new_resolver" && event.domainId.length > 0) {
    deleteDomainRecords(ctx, event.domainId);
    return;
  }

  if (event.eventType == "resolver_version_changed" && event.domainId.length > 0) {
    deleteDomainRecords(ctx, event.domainId);
    applyResolverEvent(ctx, event);
    return;
  }

  if (!event.eventType.startsWith("resolver_")) {
    return;
  }

  applyResolverEvent(ctx, event);
}

function finalizeRows(ctx: LensContext<NoArgs>): LensOutput<JSON.Obj> | null {
  const records = getRecords(ctx).values();
  const out = new Array<JSON.Obj>();

  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    const rowDoc = json.object();
    rowDoc.set("id", record.id);
    rowDoc.set("domainId", record.domainId);
    putString(rowDoc, "name", record.name);
    putString(rowDoc, "resolver", record.resolver);
    rowDoc.set("recordType", record.recordType);
    putString(rowDoc, "recordKey", record.recordKey);
    putString(rowDoc, "coinType", record.coinType);
    putString(rowDoc, "value", record.value);
    putInt(rowDoc, "blockNumber", record.blockNumber);
    putString(rowDoc, "txHash", record.txHash);
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
