"use client";

import { RegistrationContext } from "./registration-context";
import { useContext } from "react";

/**
 * The hook to use the registration context.
 */
export const useRegistrationContext = () => {
  return useContext(RegistrationContext);
};
