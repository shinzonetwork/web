"use client";

import Configuration from "@/components/registration/configuration/configuration";
import Profile from "@/components/registration/profile/profile";
import UserGuide from "@/components/registration/user-guide/user-guide";
import { useRegistrationContext } from "@/hooks/useRegistrationContext";

export default function Registration() {
  const { isRegistered, isProfileCompleted } = useRegistrationContext();
  return (
    <>
      {!isRegistered && !isProfileCompleted && <Configuration />}
      {isRegistered && !isProfileCompleted && <Profile />}
      {isRegistered && isProfileCompleted && <UserGuide />}
    </>
  );
}
