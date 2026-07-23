import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  CircleDashed,
  Clock3,
  LoaderCircle,
  RadioTower,
} from "lucide-react";
import type { ViewAvailability } from "../model/view-availability";
import { pluralize } from "../model/view-pool-utils";

export interface ViewAvailabilityContent {
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
}

export const getViewAvailabilityContent = (
  availability: ViewAvailability
): ViewAvailabilityContent => {
  switch (availability.status) {
    case "loading":
      return {
        title: "Checking pools",
        description: "You can inspect the view while Studio checks its pools.",
        icon: LoaderCircle,
        iconClassName: "border-gray-200 bg-gray-50 text-ui-text-muted",
      };
    case "available":
      return {
        title:
          availability.activePoolCount === 1
            ? "Pool active"
            : `${availability.activePoolCount} pools active`,
        description: `${availability.hostCount} ${pluralize(availability.hostCount, "host")} currently serve this view. Pool membership can change over time.`,
        icon: RadioTower,
        iconClassName: "border-emerald-200 bg-emerald-50 text-emerald-700",
      };
    case "waiting":
      return {
        title: `Pool waiting for hosts — ${availability.hostCount} of ${availability.requiredHostCount} joined`,
        description: `The pool becomes active when ${availability.requiredHostCount} hosts have joined.`,
        icon: Clock3,
        iconClassName: "border-amber-200 bg-amber-50 text-amber-700",
      };
    case "no-pools":
      return {
        title: "No pool yet",
        description:
          "No demand has been registered for this view. The first demand creates a pool for hosts to join.",
        icon: CircleDashed,
        iconClassName: "border-gray-300 bg-gray-50 text-ui-text-muted",
      };
    case "unavailable":
      return {
        title: "Pool status could not be checked",
        description:
          "Studio could not load this view's pools. The view definition and query preview remain available.",
        icon: AlertCircle,
        iconClassName:
          "border-szo-primary/30 bg-ui-bg-accent text-ui-text-accent",
      };
  }
};
