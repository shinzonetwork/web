import { Section } from "../components/Section";
import { SectionBody } from "../components/SectionBody";
import { SectionHeader, SubsectionTitle } from "../components/SectionHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@shinzo/ui/tabs";
import { SearchInput } from "@shinzo/ui/search-input";
import { CopyButton } from "@shinzo/ui/copy-button";
import { Skeleton } from "@shinzo/ui/skeleton";
import { TableLayout, TableCell } from "@shinzo/ui/table";

const INDEXER_ROWS = [
  { chain: "Ethereum",  status: "Active",   blocks: "21,400,000", tps: "120 tx/s" },
  { chain: "Base",      status: "Syncing",  blocks: "27,100,000", tps: "84 tx/s"  },
  { chain: "Arbitrum",  status: "Active",   blocks: "318,000,000", tps: "210 tx/s" },
  { chain: "Optimism",  status: "Inactive", blocks: "130,500,000", tps: "—"       },
];

const STATUS_COLORS: Record<string, string> = {
  Active:   "bg-[rgba(34,197,94,0.1)] text-[#16a34a]",
  Syncing:  "bg-[rgba(234,179,8,0.1)] text-[#ca8a04]",
  Inactive: "bg-[#f5f5f5] text-[#a3a3a3]",
  Error:    "bg-[rgba(208,31,39,0.08)] text-[#d01f27]",
};

export function ComponentsSection() {
  return (
    <Section id="components">
      <SectionHeader
        title="Components"
        jp="コンポーネント"
        description="Production UI components from @shinzo/ui — used across all Shinzo products."
      />

      <SectionBody>
      <SubsectionTitle>Tabs</SubsectionTitle>
      <div className="mb-10">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="mt-4 p-5 border border-gray-200 rounded-lg text-px-13 text-gray-500 leading-relaxed">
              Indexing block <span className="font-mono text-szo-text">21,400,142</span> —
              processing 120 transactions/s across 12 active views.
            </div>
          </TabsContent>
          <TabsContent value="events">
            <div className="mt-4 p-5 border border-gray-200 rounded-lg text-px-13 text-gray-500 font-mono">
              2024-01-15 14:23:01 — Transfer(0xabc…, 0xdef…, 1000)<br />
              2024-01-15 14:23:01 — Approval(0xabc…, 0xspender…, max)
            </div>
          </TabsContent>
          <TabsContent value="logs">
            <div className="mt-4 p-5 border border-gray-200 rounded-lg text-px-13 text-gray-600 font-mono">
              [INFO] Caught up to head block<br />
              [INFO] Processing reorg at 21,399,850
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <SubsectionTitle>Search</SubsectionTitle>
      <div className="mb-10 max-w-xl">
        <SearchInput enableSlashKey={false} />
      </div>

      <SubsectionTitle>Table</SubsectionTitle>
      <div className="mb-10">
        <TableLayout
          headings={["Chain", "Status", "Latest Block", "Throughput"]}
          iterable={INDEXER_ROWS}
          hideLeftSpacer
          hideRightSpacer
          rowRenderer={(row) => (
            <>
              <TableCell>
                <span className="font-medium text-px-13 text-szo-text">{row.chain}</span>
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-[10px] py-[3px] rounded-full text-xs font-medium ${STATUS_COLORS[row.status]}`}>
                  {row.status}
                </span>
              </TableCell>
              <TableCell numeric>
                <span className="text-px-13">{row.blocks}</span>
              </TableCell>
              <TableCell>
                <span className="text-px-13 text-gray-600">{row.tps}</span>
              </TableCell>
            </>
          )}
        />
      </div>

      <SubsectionTitle>Copy Button</SubsectionTitle>
      <div className="mb-10 flex flex-col gap-3">
        {[
          "pnpm add @shinzo/ui",
          `import { Tabs } from "@shinzo/ui/tabs";`,
          `import { SearchInput } from "@shinzo/ui/search-input";`,
        ].map((snippet) => (
          <div key={snippet} className="flex items-center justify-between gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
            <code className="font-mono text-px-13 text-szo-text">{snippet}</code>
            <CopyButton text={snippet} className="shrink-0" />
          </div>
        ))}
      </div>

      <SubsectionTitle>Skeleton</SubsectionTitle>
      <div className="mb-10 flex flex-col gap-3 max-w-sm">
        <div className="flex items-center gap-3">
          <div className="size-9 shrink-0"><Skeleton circular /></div>
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="h-4"><Skeleton /></div>
            <div className="h-3 w-2/3"><Skeleton /></div>
          </div>
        </div>
        <div className="h-4"><Skeleton /></div>
        <div className="h-4 w-4/5"><Skeleton /></div>
        <div className="h-4 w-3/5"><Skeleton /></div>
      </div>
      </SectionBody>
    </Section>
  );
}
