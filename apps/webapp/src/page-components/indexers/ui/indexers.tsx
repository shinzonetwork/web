import { IndexerList } from "@/features/indexer-list";
import { isRegistrationV2 } from "@/shared/lib/constants";
import { Header } from "@/widget";

export function Indexers() {
  return (
    <>
      {!isRegistrationV2() ? (
        <>
          <Header />
          <div className="mx-12 my-12">
            <IndexerList />
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center h-screen">
          <p className="font-mono text-md text-muted-foreground">
            The requested path is not available for this version of the
            application.
          </p>
        </div>
      )}
    </>
  );
}
