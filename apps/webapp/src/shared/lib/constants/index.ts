export const MESSAGE_TO_SIGN = "Shinzo Registration Verification";
export const SHINZO_PREFIX = "shinzo";

export enum EntityRole {
  Host = 1,
  Indexer = 2,
}

export const SHINZO_PRECOMPILE_ADDRESS =
  "0x0000000000000000000000000000000000000211";

export const UI_TEXT_CONTENT = {
  "host-registration": {
    title: "/ Register your host to participate within the Shinzo Network",
    description:
      "Sign up your host to be recognized by the Shinzo Network and contribute to the ecosystem.",
  },
  "indexer-registration": {
    title: "/ Register your indexer to participate within the Shinzo Network",
    description:
      "Sign up your indexer to be recognized by the Shinzo Network and contribute to the ecosystem.",
  },
  "indexer-assertion": {
    title: "/ Assert Indexer on the Shinzo Network",
    description:
      "Assert your indexer to be recognized by the Shinzo Network and contribute to the ecosystem.",
  },
  registration: {
    title: "/ Register on the Shinzo Network",
    description:
      "Sign up your host or indexer to be recognized by the Shinzo Network and contribute to the ecosystem.",
  },
} as const;

export const isRegistrationV2 = () => {
  return process.env.NEXT_PUBLIC_SHINZOHUB_V2_REGISTRATION_FLAG === "true";
};
