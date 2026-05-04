import { isRegistrationV2 } from "@/shared/lib";
import { Header } from "@/widget";
import { redirect } from "next/navigation";

export default function HomePage() {
  if (!isRegistrationV2()) {
    return redirect("/registration");
  }
  return <Header />;
}
