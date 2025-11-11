'use client'

import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {    
    return (
        <div className="flex justify-between items-center p-4">
        <Image 
            src="/images/logo.svg" 
            alt="Shinzo" 
            width={123} 
            height={23} 
            priority
            unoptimized
            className="h-auto w-auto"
            style={{ display: 'block' }}
        />
        <div className="flex p-4">
            <ConnectButton accountStatus={"address"} showBalance={false} chainStatus="none"/>
        </div>
        </div>
    )
}

export default Header