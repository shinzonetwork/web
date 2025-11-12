'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

import useShinzoStore from "@/store/store";


export default function LandingPage() {
  const { isConnected } = useAccount();
  const { registered, profileCompleted } = useShinzoStore();
  const router = useRouter();

  useEffect(() => {
    if(isConnected){
      if(!registered && !profileCompleted){
        router.replace('/registration/configuration');
      } else if(registered && !profileCompleted){
        router.replace('/registration/profile');
      } else if(registered && profileCompleted){
        router.replace('/dashboard');
      }
    } else {
      router.replace('/');
    }
  },[isConnected, registered, profileCompleted, router])

  return (
    <div>
      <p>The Shinzo webapp allows a user to interact with different parts of the Shinzo ecosystem.</p>
    </div>
  );
}
