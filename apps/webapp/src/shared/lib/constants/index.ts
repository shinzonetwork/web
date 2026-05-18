export const MESSAGE_TO_SIGN = "Shinzo Registration Verification";

export enum EntityRole {
  Host = 1,
  Indexer = 2,
}

export const SHINZO_PRECOMPILE_ADDRESS =
  "0x0000000000000000000000000000000000000211";

export const UI_TEXT_CONTENT = {
  registration: {
    title: "Register on the Shinzo Network",
    description:
      "Register your host to participate in the Shinzo Network.",
  },
} as const;
