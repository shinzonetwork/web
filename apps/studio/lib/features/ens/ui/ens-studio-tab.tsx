"use client";

import type { ReactNode } from "react";
import { Loader2, Search } from "lucide-react";
import { SearchInput } from "@shinzo/ui/search-input";
import { ENS_CORE_PACK_LENSES } from "@/entities/lens";
import { Button } from "@/shared/ui/button";
import { truncateHex } from "@/shared/utils/format";
import type {
  EnsAddressSearchResult,
  EnsDomainRow,
  EnsEventRow,
  EnsNameSearchResult,
  EnsResolverRecordRow,
} from "../model/query-ens";
import { useEnsStudioState } from "../model/use-ens-studio-state";

const DEPLOY_STATUS_LABELS: Record<string, string> = {
  idle: "Deploy ENS Core Pack",
  checking: "Checking Hub",
  validating: "Validating View",
  deploying: "Registering View",
  confirming: "Confirming",
  done: "Ready",
  error: "Retry Deployment",
};

const formatUnixSeconds = (value?: string): string => {
  if (!value) return "Not set";
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return value;
  return new Date(numeric * 1000).toLocaleString();
};

const describeEvent = (event: EnsEventRow): string => {
  switch (event.eventType) {
    case "registry_transfer":
      return `Owner changed to ${event.owner ?? "unknown"}`;
    case "registry_new_owner":
      return `Subname owner set to ${event.owner ?? "unknown"}`;
    case "registry_new_resolver":
      return `Resolver changed to ${event.resolver ?? "unknown"}`;
    case "registry_new_ttl":
      return `TTL updated to ${event.ttl ?? "unknown"}`;
    case "registration_created":
      return `Registration created for ${event.registrant ?? "unknown"}`;
    case "registration_renewed":
      return `Registration renewed until ${formatUnixSeconds(event.expiryDate)}`;
    case "registration_transferred":
      return `Registration transferred to ${event.registrant ?? "unknown"}`;
    case "name_wrapped":
      return `Wrapped to ${event.owner ?? event.registrant ?? "unknown"}`;
    case "name_unwrapped":
      return `Unwrapped back to ${event.owner ?? "unknown"}`;
    case "wrapped_transfer":
      return `Wrapped owner changed to ${event.owner ?? "unknown"}`;
    case "fuses_set":
      return `Fuses updated to ${event.fuses ?? "unknown"}`;
    case "expiry_extended":
      return `Wrapper expiry extended to ${formatUnixSeconds(event.expiryDate)}`;
    case "resolver_addr_changed":
      return `ETH address record changed to ${event.value ?? "unknown"}`;
    case "resolver_multicoin_addr_changed":
      return `Coin type ${event.coinType ?? "unknown"} address changed`;
    case "resolver_text_changed":
      return `Text record ${event.recordKey ?? "unknown"} changed`;
    case "resolver_name_changed":
      return `Reverse name changed to ${event.value ?? "unknown"}`;
    case "resolver_contenthash_changed":
      return "Contenthash changed";
    case "resolver_abi_changed":
      return "ABI record changed";
    case "resolver_pubkey_changed":
      return "Pubkey changed";
    case "resolver_interface_changed":
      return `Interface ${event.recordKey ?? "unknown"} changed`;
    case "resolver_authorisation_changed":
      return `Authorisation changed for ${event.recordKey ?? "unknown"}`;
    case "resolver_version_changed":
      return `Resolver version changed to ${event.value ?? "unknown"}`;
    default:
      return event.eventType;
  }
};

const ResultCard = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section className="border border-ui-border bg-white p-5">
    <div className="flex flex-col gap-3">
      <h3 className="font-mono text-sm uppercase tracking-[0.14em] text-szo-black/55">
        {title}
      </h3>
      {children}
    </div>
  </section>
);

const KeyValueGrid = ({
  rows,
}: {
  rows: Array<{ label: string; value: string }>;
}) => (
  <dl className="grid gap-3 md:grid-cols-2">
    {rows.map((row) => (
      <div key={row.label} className="flex min-w-0 flex-col gap-1">
        <dt className="font-mono text-xs uppercase tracking-[0.12em] text-szo-black/40">
          {row.label}
        </dt>
        <dd className="break-all text-sm text-szo-black/75">{row.value}</dd>
      </div>
    ))}
  </dl>
);

const DomainList = ({
  title,
  domains,
}: {
  title: string;
  domains: EnsDomainRow[];
}) => (
  <ResultCard title={title}>
    {domains.length === 0 ? (
      <p className="text-sm text-szo-black/55">No names found.</p>
    ) : (
      <div className="flex flex-col gap-3">
        {domains.map((domain) => (
          <div
            key={domain.id}
            className="border border-ui-border bg-szo-bg/50 px-4 py-3"
          >
            <p className="font-medium text-szo-black">
              {domain.name || truncateHex(domain.id)}
            </p>
            <p className="font-mono text-xs text-szo-black/45">{domain.id}</p>
            <p className="mt-1 text-sm text-szo-black/65">
              {domain.expiryDate
                ? `Expiry: ${formatUnixSeconds(domain.expiryDate)}`
                : "No expiry indexed"}
            </p>
          </div>
        ))}
      </div>
    )}
  </ResultCard>
);

const ResolverRecords = ({ records }: { records: EnsResolverRecordRow[] }) => (
  <ResultCard title="Records">
    {records.length === 0 ? (
      <p className="text-sm text-szo-black/55">No resolver records indexed yet.</p>
    ) : (
      <div className="flex flex-col gap-3">
        {records.map((record) => (
          <div
            key={record.id}
            className="border border-ui-border bg-szo-bg/50 px-4 py-3"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-szo-black">
                {record.recordType || "record"}
              </span>
              {record.recordKey && (
                <span className="font-mono text-xs text-szo-black/45">
                  {record.recordKey}
                </span>
              )}
              {record.coinType && (
                <span className="font-mono text-xs text-szo-black/45">
                  coin {record.coinType}
                </span>
              )}
            </div>
            <p className="mt-2 break-all text-sm text-szo-black/75">
              {record.value || "Value not reconstructed from events"}
            </p>
          </div>
        ))}
      </div>
    )}
  </ResultCard>
);

const HistoryList = ({ history }: { history: EnsEventRow[] }) => (
  <ResultCard title="History">
    {history.length === 0 ? (
      <p className="text-sm text-szo-black/55">No ENS events found.</p>
    ) : (
      <div className="flex flex-col gap-3">
        {history.map((event) => (
          <div
            key={event.id}
            className="border border-ui-border bg-szo-bg/50 px-4 py-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium text-szo-black">{describeEvent(event)}</p>
              <span className="font-mono text-xs text-szo-black/45">
                #{event.blockNumber ?? "?"}
              </span>
            </div>
            <p className="mt-1 text-sm text-szo-black/55">
              {event.timestamp
                ? formatUnixSeconds(event.timestamp)
                : event.txHash || event.id}
            </p>
          </div>
        ))}
      </div>
    )}
  </ResultCard>
);

const NameResult = ({ result }: { result: EnsNameSearchResult }) => (
  <div className="flex flex-col gap-4">
    <ResultCard title="Overview">
      <KeyValueGrid
        rows={[
          { label: "Input", value: result.input },
          { label: "Node", value: result.node },
          {
            label: "Domain",
            value: result.domain?.name || result.registration?.name || "Unknown",
          },
          { label: "Owner", value: result.domain?.owner || "Not indexed" },
          {
            label: "Registrant",
            value: result.domain?.registrant || "Not indexed",
          },
          {
            label: "Wrapped Owner",
            value: result.domain?.wrappedOwner || "Not wrapped",
          },
          { label: "Resolver", value: result.domain?.resolver || "Not set" },
          {
            label: "Resolved Address",
            value: result.domain?.resolvedAddress || "Not set",
          },
          {
            label: "Expiry",
            value: result.domain?.expiryDate
              ? formatUnixSeconds(result.domain.expiryDate)
              : "Not indexed",
          },
          { label: "TTL", value: result.domain?.ttl || "Not set" },
        ]}
      />
    </ResultCard>

    <ResultCard title="Registration">
      <KeyValueGrid
        rows={[
          { label: "Registration Id", value: result.registration?.id || "N/A" },
          {
            label: "Registered At",
            value: formatUnixSeconds(result.registration?.registrationDate),
          },
          {
            label: "Expires",
            value: formatUnixSeconds(result.registration?.expiryDate),
          },
          { label: "Cost", value: result.registration?.cost || "Not indexed" },
        ]}
      />
    </ResultCard>

    <ResultCard title="Wrapper">
      <KeyValueGrid
        rows={[
          { label: "Owner", value: result.wrappedDomain?.owner || "Not wrapped" },
          { label: "Fuses", value: result.wrappedDomain?.fuses || "N/A" },
          {
            label: "Expiry",
            value: formatUnixSeconds(result.wrappedDomain?.expiryDate),
          },
        ]}
      />
    </ResultCard>

    <ResolverRecords records={result.records} />
    <HistoryList history={result.history} />
  </div>
);

const dedupeDomains = (domains: EnsDomainRow[]): EnsDomainRow[] =>
  Array.from(new Map(domains.map((domain) => [domain.id, domain])).values());

const AddressResult = ({ result }: { result: EnsAddressSearchResult }) => (
  <div className="flex flex-col gap-4">
    <ResultCard title="Overview">
      <KeyValueGrid
        rows={[
          { label: "Input", value: result.input },
          { label: "Address", value: result.address },
          { label: "Reverse Node", value: result.reverseNode },
          {
            label: "Primary Name",
            value:
              result.primaryName?.name ||
              result.reverseNameRecord?.value ||
              "Not set",
          },
        ]}
      />
    </ResultCard>

    <DomainList title="Owned Names" domains={dedupeDomains(result.ownedDomains)} />
    <DomainList
      title="Registered Names"
      domains={dedupeDomains(result.registeredDomains)}
    />
    <ResultCard title="Wrapped Names">
      {result.wrappedDomains.length === 0 ? (
        <p className="text-sm text-szo-black/55">No wrapped names found.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {result.wrappedDomains.map((domain) => (
            <div
              key={domain.id}
              className="border border-ui-border bg-szo-bg/50 px-4 py-3"
            >
              <p className="font-medium text-szo-black">
                {domain.name || truncateHex(domain.domainId)}
              </p>
              <p className="mt-1 text-sm text-szo-black/65">
                Fuses: {domain.fuses || "N/A"} · Expiry:{" "}
                {formatUnixSeconds(domain.expiryDate)}
              </p>
            </div>
          ))}
        </div>
      )}
    </ResultCard>
    <DomainList
      title="Names Resolving Here"
      domains={dedupeDomains(result.resolvingDomains)}
    />
  </div>
);

export const EnsStudioTab = () => {
  const {
    searchInput,
    setSearchInput,
    result,
    searchError,
    isSearching,
    isPackReady,
    packViews,
    deployPack,
    search,
    deployStatus,
    deployError,
    deployValidationIssues,
    activeDeployTitle,
  } = useEnsStudioState();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-szo-black">ENS Core Mirror</h2>
        <p className="text-sm leading-relaxed text-szo-black/60">
          Deploy a fixed Shinzo ENS index pack once, then query it from one
          input using either an ENS name or an Ethereum mainnet address.
        </p>
      </div>

      <ResultCard title="Pack Status">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              onClick={() => void deployPack()}
              disabled={
                deployStatus === "checking" ||
                deployStatus === "validating" ||
                deployStatus === "deploying" ||
                deployStatus === "confirming"
              }
              className="gap-2"
            >
              {(deployStatus === "checking" ||
                deployStatus === "validating" ||
                deployStatus === "deploying" ||
                deployStatus === "confirming") && (
                <Loader2 className="size-4 animate-spin" />
              )}
              {DEPLOY_STATUS_LABELS[deployStatus]}
            </Button>
            <p className="text-sm text-szo-black/60">
              {isPackReady
                ? `Pack ready with ${packViews.length}/${ENS_CORE_PACK_LENSES.length} views.`
                : `Pack not ready yet: ${packViews.length}/${ENS_CORE_PACK_LENSES.length} views available.`}
            </p>
          </div>

          {(deployError || activeDeployTitle) && (
            <p className="text-sm text-szo-black/60">
              {activeDeployTitle
                ? `${activeDeployTitle}: ${deployError || deployStatus}`
                : deployError}
            </p>
          )}

          {deployValidationIssues.length > 0 && (
            <div className="border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
              {deployValidationIssues.map((issue) => issue.message).join(" ")}
            </div>
          )}

          <div className="grid gap-2 md:grid-cols-2">
            {ENS_CORE_PACK_LENSES.map((lens) => {
              const ready = packViews.some((view) => view.lensKey === lens.lensKey);
              return (
                <div
                  key={lens.lensKey}
                  className="flex items-center justify-between border border-ui-border px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-szo-black">{lens.title}</p>
                    <p className="font-mono text-xs text-szo-black/45">
                      {lens.resolveView({}).entityName}
                    </p>
                  </div>
                  <span
                    className={
                      ready
                        ? "text-sm font-medium text-emerald-600"
                        : "text-sm font-medium text-szo-black/45"
                    }
                  >
                    {ready ? "Ready" : "Pending"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </ResultCard>

      <div className="flex flex-col gap-3">
        <SearchInput
          placeholder="Enter vitalik.eth or 0x..."
          showHint={false}
          enableSlashKey={false}
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") void search();
          }}
        />
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            onClick={() => void search()}
            disabled={!isPackReady || !searchInput.trim() || isSearching}
            className="gap-2"
          >
            {isSearching ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Search className="size-4" />
            )}
            Search ENS
          </Button>
        </div>
        {searchError && (
          <p className="text-sm text-red-600">{searchError}</p>
        )}
      </div>

      {result?.kind === "name" && <NameResult result={result} />}
      {result?.kind === "address" && <AddressResult result={result} />}
    </div>
  );
};
