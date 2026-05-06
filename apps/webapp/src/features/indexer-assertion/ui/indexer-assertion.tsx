import { IndexerAssertionForm } from "./indexer-assertion-form";
import { isRegistrationV2 } from "@/shared/lib";
import { AddressCopy } from "@/widget";

export default function IndexerAssertion() {
  return (
    <>
      <AddressCopy />
      {isRegistrationV2() && <IndexerAssertionForm />}
    </>
  );
}
