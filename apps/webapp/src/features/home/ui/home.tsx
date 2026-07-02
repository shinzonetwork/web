import { HostsHome } from "./hosts-home";
import { GeneratorsHome } from "./generators-home";
import { StatsHome } from "./stats-home";
import { TitleHome } from "./title-home";

export function Home() {
  return (
    <div className="my-4 w-full min-w-0 max-w-full">
      <TitleHome />
      <StatsHome />
      <GeneratorsHome />
      <HostsHome />
    </div>
  );
}
