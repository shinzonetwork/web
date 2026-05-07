import { HostsHome } from "./hosts-home";
import { IndexersHome } from "./indexers-home";
import { StatsHome } from "./stats-home";
import { TitleHome } from "./title-home";

export function Home() {
  return (
    <div className="mx-4 my-4 w-full min-w-0 max-w-full">
      <TitleHome />
      <StatsHome />
      <IndexersHome />
      <HostsHome />
    </div>
  );
}
