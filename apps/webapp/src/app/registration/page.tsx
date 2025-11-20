"use client";

import Configuration from "@/components/registration/configuration/configuration";
import Profile from "@/components/registration/profile/profile";
import UserGuide from "@/components/registration/user-guide/user-guide";
import useShinzoStore from "@/store/store";

export default function Registration() {
  const { registered, profileCompleted } = useShinzoStore();

  return (
    <>
      {!registered && <Configuration />}
      {registered && !profileCompleted && <Profile />}
      {registered && profileCompleted && <UserGuide />}
    </>
  );
}
