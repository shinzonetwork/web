import { isRegistrationV2 } from "@/shared/lib";
import { Header } from "@/widget";
import { Home } from "@/features/home/ui/home";
import { redirect } from "next/navigation";

export function HomePage() {
  if (!isRegistrationV2()) {
    return redirect("/registration");
  }

  return (
    <>
      <Header />
      <Home />
    </>
  );
}
