import { RegistrationForm } from "./registration-form";
import { RegistrationFormV2 } from "./registration-form-v2";
import { isRegistrationV2 } from "@/shared/lib";
import { AddressCopy } from "@/widget";

export default function Registration() {
  return (
    <>
      <AddressCopy />
      {isRegistrationV2() ? <RegistrationFormV2 /> : <RegistrationForm />}
    </>
  );
}
