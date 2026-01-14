"use client";

import { useAccount } from "wagmi";

import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import ShinzoFilledIcon from "@/shared/ui/icons/shinzo-filled.svg";
import {
  cn,
  isIndexerWhitelisted as isIndexerWhitelistedFunction,
} from "@/shared/lib";

interface RegistrationRadioButtonProps {
  selectedEntityValue: string;
  prefilledEntityValue: boolean;
  onChange: (value: string) => void;
}

/**
 * Radio button component for selecting user role (Host or Indexer).
 * Displays as button-style toggles with icons for better UX.
 *
 * @param selectedEntityValue - Currently selected entity value ("1" for Host, "2" for Indexer). Defaults to "1"
 * @param prefilledEntityValue - Whether the entity field is prefilled/disabled. Defaults to false
 * @param onChange - Callback when selection changes
 */
export function RegistrationRadioButton({
  selectedEntityValue = "1",
  prefilledEntityValue = false,
  onChange,
}: RegistrationRadioButtonProps) {
  const { address } = useAccount();
  const isIndexerWhitelisted = isIndexerWhitelistedFunction(
    address ? address : undefined
  );
  return (
    <RadioGroup
      className={`flex gap-4 ${prefilledEntityValue ? "opacity-50 cursor-not-allowed" : ""}`}
      value={selectedEntityValue}
      onValueChange={onChange}
      disabled={prefilledEntityValue}
    >
      <label
        htmlFor="host"
        className={cn(
          "flex flex-1 items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer",
          "border shadow-xs outline-none",
          selectedEntityValue === "1"
            ? "bg-primary/60 border-accent text-white"
            : "bg-background hover:bg-accent hover:text-accent-foreground"
        )}
      >
        <span className="flex items-center justify-center size-7 border border-border rounded-sm">
          <ShinzoFilledIcon
            className={cn(
              "size-4",
              selectedEntityValue === "1" ? "text-white" : "text-primary/60"
            )}
          />
        </span>
        <RadioGroupItem
          value="1"
          id="host"
          disabled={prefilledEntityValue}
          className="sr-only"
        />
        <span>Host</span>
      </label>
      <label
        htmlFor="indexer"
        className={cn(
          "flex flex-1 items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer",
          "border shadow-xs outline-none disabled:pointer-events-none disabled:opacity-50",
          selectedEntityValue === "2"
            ? "bg-primary/60 border-accent text-white"
            : "bg-background hover:bg-accent hover:text-accent-foreground",
          !isIndexerWhitelisted ? "opacity-50 cursor-not-allowed" : ""
        )}
      >
        <span className="flex items-center justify-center size-7 border border-border rounded-sm">
          <ShinzoFilledIcon
            className={cn(
              "size-4",
              selectedEntityValue === "2" ? "text-white" : "text-primary/60"
            )}
          />
        </span>
        <RadioGroupItem
          value="2"
          id="indexer"
          disabled={!isIndexerWhitelisted || prefilledEntityValue}
          className="sr-only"
        />
        <span>Indexer</span>
      </label>
    </RadioGroup>
  );
}
