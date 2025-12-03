"use client";

import Configuration from "@/components/registration/configuration/configuration";
import UserProfile from "@/components/registration/user-profile/user-profile";
import UserGuide from "@/components/registration/user-guide/user-guide";
import { useRegistrationContext } from "@/hooks/useRegistrationContext";

export default function Registration() {
  const { isRegistered, isProfileCompleted } = useRegistrationContext();
  return (
    <>
      {!isRegistered && !isProfileCompleted && <Configuration />}
      {isRegistered && !isProfileCompleted && <UserProfile />}
      {isRegistered && isProfileCompleted && <UserGuide />}
    </>
  );
}
