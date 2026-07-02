export const INDEXER_ONBOARDING_STEPS = [
  {
    id: "assertion",
    label: "Assertion",
    description: "Verify indexer identity",
    href: "/indexer-assertion",
  },
  {
    id: "registration",
    label: "Registration",
    description: "Register on-chain",
    href: "/indexer-registration",
  },
] as const;

export type IndexerOnboardingStepId =
  (typeof INDEXER_ONBOARDING_STEPS)[number]["id"];

export const INDEXER_ASSERTION_PENDING_KEY = "indexer-assertion-pending";
