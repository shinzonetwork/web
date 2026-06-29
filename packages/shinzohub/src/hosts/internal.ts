import type { RegisteredHost } from "./types";

export interface HostWire {
  address?: string;
  did?: string;
  connection_string?: string;
  endpoint_address?: string;
}

export interface GetHostWireResponse {
  host?: HostWire;
}

export function toHost(wire: HostWire): RegisteredHost {
  if (!wire.address) {
    throw new Error("Host response is missing address.");
  }
  if (!wire.did) {
    throw new Error("Host response is missing did.");
  }
  if (!wire.connection_string) {
    throw new Error("Host response is missing connection_string.");
  }

  return {
    address: wire.address,
    did: wire.did,
    connectionString: wire.connection_string,
    endpointAddress: wire.endpoint_address,
  };
}
