import { IndexerList } from "@/features/indexer-list";
import { Header } from "@/widget";

export function Indexers() {
  return (
    <>
    <Header />
    <div className="mx-12 my-12">
        <IndexerList />
    </div>
    </>
  );
}