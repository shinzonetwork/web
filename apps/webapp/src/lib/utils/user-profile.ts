import { isValidEmail } from "@/lib/utils/validate";
import type { ContactProfile } from "@/components/registration/user-profile/types";

/**
 * Validate email in contact profile
 */
export function validateEmail(contactProfile: ContactProfile): boolean {
  // Form is valid if email is empty or valid
  return !contactProfile.email || isValidEmail(contactProfile.email);
}
