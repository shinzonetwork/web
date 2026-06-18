export type HealthStatus = "healthy" | "unhealthy" | "unknown";

export type HealthEntryKeyParams = {
  address: string;
  ip: string;
};

export type LiveData = {
    status?: HealthStatus;
  };
  
  export type LiveDataWithKey = LiveData & {key: string};
