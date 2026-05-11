import { JSON } from "assemblyscript-json/assembly";
import {
  buildDisplayName,
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

class RegistrationState {
  id: string = "";
  domainId: string = "";
  name: string = "";
  labelName: string = "";
  labelhash: string = "";
  registrant: string = "";
  registrationDate: string = "";
  expiryDate: string = "";
  cost: string = "";
}

function getRegistrations(
  ctx: LensContext<NoArgs>,
): EntityStore<string, RegistrationState> {
  return ctx.store.entity<string, RegistrationState>("EnsRegistrationState");
}

function compareDecimal(left: string, right: string): i32 {
  if (left.length != right.length) {
    return left.length > right.length ? 1 : -1;
  }
  if (left == right) return 0;
  return left > right ? 1 : -1;
}

function applyEvent(ctx: LensContext<NoArgs>, event: EnsNormalizedEvent): void {
  if (
    event.eventType != "registration_created" &&
    event.eventType != "registration_renewed" &&
    event.eventType != "registration_transferred"
  ) {
    return;
  }

  const id =
    event.registrationId.length > 0 ? event.registrationId : event.labelhash;
  if (id.length == 0) {
    return;
  }

  const store = getRegistrations(ctx);
  let registration = store.get(id);
  if (registration == null) {
    const state = new RegistrationState();
    state.id = id;
    store.set(id, state);
    registration = state;
  }

  if (event.domainId.length > 0) {
    registration.domainId = event.domainId;
  }

  if (event.labelhash.length > 0) {
    registration.labelhash = event.labelhash;
  }

  if (event.labelName.length > 0) {
    registration.labelName = normalizeEnsName(event.labelName);
  }

  if (event.name.length > 0) {
    registration.name = normalizeEnsName(event.name);
  }

  if (event.registrant.length > 0) {
    registration.registrant = normalizeEnsAddress(event.registrant);
  }

  if (event.eventType == "registration_created" && event.timestamp.length > 0) {
    registration.registrationDate = event.timestamp;
  }

  if (event.expiryDate.length > 0) {
    if (
      registration.expiryDate.length == 0 ||
      compareDecimal(event.expiryDate, registration.expiryDate) >= 0
    ) {
      registration.expiryDate = event.expiryDate;
    }
  }

  if (event.cost.length > 0) {
    registration.cost = event.cost;
  }

  store.set(id, registration);
}

function finalizeRows(ctx: LensContext<NoArgs>): LensOutput<JSON.Obj> | null {
  const registrations = getRegistrations(ctx).values();
  const out = new Array<JSON.Obj>();

  for (let i = 0; i < registrations.length; i++) {
    const registration = registrations[i];
    const rowDoc = json.object();
    rowDoc.set("id", registration.id);
    putString(rowDoc, "domainId", registration.domainId);
    rowDoc.set(
      "name",
      registration.name.length > 0
        ? registration.name
        : buildDisplayName(
            registration.labelName.length > 0 ? registration.labelName : null,
            registration.labelhash.length > 0 ? registration.labelhash : registration.id,
            "eth",
          ),
    );
    putString(rowDoc, "labelName", registration.labelName);
    putString(rowDoc, "registrant", registration.registrant);
    putString(rowDoc, "registrationDate", registration.registrationDate);
    putString(rowDoc, "expiryDate", registration.expiryDate);
    putString(rowDoc, "cost", registration.cost);
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
