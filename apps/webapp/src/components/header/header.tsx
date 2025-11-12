'use client'

import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import useShinzoStore from "@/store/store";

const Header = () => { 
    const {isConnected} = useAccount();
    const { registered, profileCompleted }   = useShinzoStore();
    return (
        <div className="flex p-4">
                {(!isConnected || !(registered && profileCompleted)) && <Image 
                    src="/images/logo.svg" 
                    alt="Shinzo" 
                    width={123} 
                    height={23} 
                    priority
                    unoptimized
                    className="h-auto w-auto"
                />}
        <div className="grow flex justify-end">
            <ConnectButton accountStatus={"address"} showBalance={false} chainStatus="none"/>
        </div>
        </div>
    )
}

export default Header