import { RegistrationForm } from "./registration-form";
import { DisconnectWallet } from "@/widget/disconnect-wallet";

export default function Registration() {
  return (
    <>
      <div className="flex flex-row items-center justify-end">
        <DisconnectWallet />
      </div>
      <RegistrationForm />
    </>
  );
}
