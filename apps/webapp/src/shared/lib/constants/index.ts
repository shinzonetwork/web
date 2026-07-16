export const MESSAGE_TO_SIGN = "Shinzo Registration Verification";
export const SHINZO_PREFIX = "shinzo";

export enum EntityRole {
  Host = 1,
  Generator = 2,
}

export const UI_FORM_HEADER_CONTENT = {
  "host-registration": {
    title: "/ Register on the Shinzo Network",
    description: "Register your Host to participate in the Shinzo Network.",
  },
  "generator-assertion": {
    title: "/ Generator registration",
    description:
      "Step 1 of 2 — assert your generator, then continue to on-chain registration.",
  },
  "generator-registration": {
    title: "/ Generator registration",
    description:
      "Step 2 of 2 — register your generator on-chain after completing assertion.",
  },
} as const;

export const UI_HOME_HEADER_CONTENT = {
  home: {
    title: "TECHNICAL REGISTRY",
    description:
      "Verifiable data infrastructure for the decentralized web. A low-level coordination layer for decentralized indexing and host services.",
  },
  registered_generators: "REGISTERED GENERATORS",
  registered_hosts: "REGISTERED HOSTS",
} as const;
