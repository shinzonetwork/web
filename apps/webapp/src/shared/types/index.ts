import type { Hex } from "viem";
import { EntityRole } from "../lib";

// Shinzohub v2

export type RegistrationFormDataV2 = {
  entity: EntityRole;
  message: Hex | string;
  defraPublicKey: Hex | string;
  defraSignedMessage: Hex | string;
};

export type IndexerRegistrationFormData = RegistrationFormDataV2 & {
  connectionString: string;
};

export type HostRegistrationFormData = RegistrationFormDataV2 & {
  connectionString: string;
  endpointAddress: string;
};

export type RegistrationFormDataByEntity<T extends EntityRole> =
  T extends EntityRole.Generator
    ? IndexerRegistrationFormData
    : HostRegistrationFormData;
