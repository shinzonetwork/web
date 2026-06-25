import type { HealthLiveData } from "@shinzo/shinzohub/health";

export type { HealthLiveData as LiveData, HealthStatus } from "@shinzo/shinzohub/health";

export type HealthEntryKeyParams = {
  address: string;
  ip: string;
};

export type LiveDataWithKey = { key: string; data: HealthLiveData };
