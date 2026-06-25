import type { HealthLiveData } from "@shinzo/shinzohub";

export type {
  GetHealthParameters,
  HealthLiveData,
  HealthP2P,
  HealthPeer,
  HealthStatus,
} from "@shinzo/shinzohub";

export type HealthEntryKeyParams = {
  address: string;
  ip: string;
};

export type LiveDataWithKey = { key: string; data: HealthLiveData };
