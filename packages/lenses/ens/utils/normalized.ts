import { JSON } from "assemblyscript-json/assembly";
import { json } from "../../lib/json";

export class EnsNormalizedEvent {
  eventId: string = "";
  eventType: string = "";
  domainId: string = "";
  registrationId: string = "";
  name: string = "";
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
  cost: string = "";
  fuses: string = "";
  recordType: string = "";
  recordKey: string = "";
  coinType: string = "";
  value: string = "";
  actor: string = "";
  txHash: string = "";
  blockNumber: i64 = 0;
  logIndex: i64 = 0;
  timestamp: string = "";
}

export function parseEnsNormalizedEvent(doc: JSON.Obj): EnsNormalizedEvent {
  const event = new EnsNormalizedEvent();
  event.eventId = json.getString(doc, "eventId");
  event.eventType = json.getString(doc, "eventType");
  event.domainId = json.getString(doc, "domainId");
  event.registrationId = json.getString(doc, "registrationId");
  event.name = json.getString(doc, "name");
  event.labelName = json.getString(doc, "labelName");
  event.labelhash = json.getString(doc, "labelhash");
  event.parentId = json.getString(doc, "parentId");
  event.owner = json.getString(doc, "owner");
  event.registrant = json.getString(doc, "registrant");
  event.wrappedOwner = json.getString(doc, "wrappedOwner");
  event.resolver = json.getString(doc, "resolver");
  event.ttl = json.getString(doc, "ttl");
  event.resolvedAddress = json.getString(doc, "resolvedAddress");
  event.expiryDate = json.getString(doc, "expiryDate");
  event.cost = json.getString(doc, "cost");
  event.fuses = json.getString(doc, "fuses");
  event.recordType = json.getString(doc, "recordType");
  event.recordKey = json.getString(doc, "recordKey");
  event.coinType = json.getString(doc, "coinType");
  event.value = json.getString(doc, "value");
  event.actor = json.getString(doc, "actor");
  event.txHash = json.getString(doc, "txHash");
  event.blockNumber = json.getInteger(doc, "blockNumber");
  event.logIndex = json.getInteger(doc, "logIndex");
  event.timestamp = json.getString(doc, "timestamp");
  return event;
}

export function putString(doc: JSON.Obj, key: string, value: string): void {
  if (value.length > 0) {
    doc.set(key, value);
  }
}

export function putBool(doc: JSON.Obj, key: string, value: bool): void {
  doc.set(key, value);
}

export function putInt(doc: JSON.Obj, key: string, value: i64): void {
  doc.set(key, value);
}
