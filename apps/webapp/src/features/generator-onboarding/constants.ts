export const GENERATOR_ONBOARDING_STEPS = [
  {
    id: "assertion",
    label: "Assertion",
    description: "Verify generator identity",
    href: "/generator-assertion",
  },
  {
    id: "registration",
    label: "Registration",
    description: "Register on-chain",
    href: "/generator-registration",
  },
] as const;

export type GeneratorOnboardingStepId =
  (typeof GENERATOR_ONBOARDING_STEPS)[number]["id"];
