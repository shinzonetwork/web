import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <div className="flex p-4">
      <Image
        src="/images/shinzo-logo.svg"
        alt="Shinzo"
        width={123}
        height={23}
        priority
        unoptimized
        className="h-auto w-auto"
      />
      <div className="grow flex justify-end">
        <ConnectButton
          accountStatus={"address"}
          showBalance={false}
          chainStatus="none"
        />
      </div>
    </div>
  );
};

export default Header;
