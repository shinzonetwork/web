"use client";

import { RegistrationContext } from "@/context/registrationContext/registrationContext";
import { useContext } from "react";

export const useRegistrationContext = () => {
  return useContext(RegistrationContext);
};
