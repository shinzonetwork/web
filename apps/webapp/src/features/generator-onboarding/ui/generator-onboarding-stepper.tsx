"use client";

import { useRouter } from "next/navigation";
import { CheckIcon } from "lucide-react";
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/widget";
import {
  GENERATOR_ONBOARDING_STEPS,
  type GeneratorOnboardingStepId,
} from "../constants";

interface GeneratorOnboardingStepperProps {
  currentStep: GeneratorOnboardingStepId;
  assertionComplete?: boolean;
}

const STEP_INDEX: Record<GeneratorOnboardingStepId, number> = {
  assertion: 1,
  registration: 2,
};

export function GeneratorOnboardingStepper({
  currentStep,
  assertionComplete = false,
}: GeneratorOnboardingStepperProps) {
  const router = useRouter();
  const activeStep = STEP_INDEX[currentStep];

  return (
    <div className="ml-10 mb-8 w-full max-w-6xl">
      <Stepper
        value={activeStep}
        indicators={{
          completed: <CheckIcon className="size-3.5" aria-hidden />,
        }}
      >
        <StepperNav aria-label="Generator onboarding progress">
          {GENERATOR_ONBOARDING_STEPS.map((step, index) => {
            const stepNumber = index + 1;
            const isRegistration = step.id === "registration";
            const isCompleted =
              step.id === "assertion" &&
              (assertionComplete || currentStep === "registration");
            const isDisabled = isRegistration && !assertionComplete;

            const stepLabels = (
              <div className="flex flex-col items-start gap-0.5">
                <StepperTitle className="font-mono">{step.label}</StepperTitle>
                <StepperDescription className="font-mono text-xs">
                  {step.description}
                </StepperDescription>
              </div>
            );

            return (
              <StepperItem
                key={step.id}
                step={stepNumber}
                completed={isCompleted}
                disabled={isDisabled}
                className="relative not-last:flex-1"
              >
                {isDisabled ? (
                  <div className="inline-flex cursor-not-allowed items-center gap-2.5 opacity-60">
                    <StepperIndicator className="rounded-none font-mono">
                      {stepNumber}
                    </StepperIndicator>
                    {stepLabels}
                  </div>
                ) : (
                  <StepperTrigger
                    className="rounded-none"
                    onClick={() => router.push(step.href)}
                  >
                    <StepperIndicator className="rounded-none font-mono">
                      {stepNumber}
                    </StepperIndicator>
                    {stepLabels}
                  </StepperTrigger>
                )}

                {index < GENERATOR_ONBOARDING_STEPS.length - 1 && (
                  <StepperSeparator className="mx-4" />
                )}
              </StepperItem>
            );
          })}
        </StepperNav>
      </Stepper>
    </div>
  );
}
