export const MESSAGE_TO_SIGN = "Shinzo Registration Verification";
export const SHINZO_PREFIX = "shinzo";

export enum EntityRole {
  Host = 1,
  Indexer = 2,
}

export const SHINZO_PRECOMPILE_ADDRESS =
  "0x0000000000000000000000000000000000000211";

export const UI_FORM_HEADER_CONTENT = {
  "host-registration": {
    title: "/ Register on the Shinzo Network",
    description:
      "Register your Host to participate in the Shinzo Network.",
  },
  "indexer-registration": {
    title: "/ Register your Indexer to participate within the Shinzo Network",
    description:
      "Register your Indexer to participate in the Shinzo Network.",
  },
  "indexer-assertion": {
    title: "/ Assert Indexer on the Shinzo Network",
    description:
      "Assert your Indexer to participate in the Shinzo Network.",
  },
  registration: {
    title: "/ Register on the Shinzo Network",
    description:
      "Register your Host or Indexer to participate in the Shinzo Network.",
  },
} as const;

export const isRegistrationV2 = () => {
  return process.env.NEXT_PUBLIC_SHINZOHUB_V2_REGISTRATION_FLAG === "true";
};

export const UI_HOME_HEADER_CONTENT = {
  home: {
    title: "TECHNICAL REGISTRY",
    description:
      "Verifiable data infrastructure for the decentralized web. A low-level coordination layer for decentralized indexing and host services.",
  },
  registered_indexers: "REGISTERED INDEXERS",
  registered_hosts: "REGISTERED HOSTS",
} as const;
