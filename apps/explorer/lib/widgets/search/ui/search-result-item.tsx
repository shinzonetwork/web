import {
  Blocks,
  Database,
  ExternalLink,
  HardDrive,
  ReceiptText,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import { DropdownMenuItem } from "@shinzo/ui/dropdown-menu";
import { formatHash } from "@/shared/utils/format-hash";
import { getPageLink } from "@/shared/utils/links";
import type { ExplorerSearchResult } from "../model/search-query";
import { getExplorerSearchResultKey } from "../model/search-result";

type InternalSearchResult = Exclude<ExplorerSearchResult, { kind: "view" }>;

interface ResultPresentation {
  description: string;
  Icon: LucideIcon;
  title: string;
}

interface SearchResultItemProps {
  active?: boolean;
  id: string;
  onHighlight?: () => void;
  onPick?: (result: ExplorerSearchResult) => void;
  onSelect: (result: ExplorerSearchResult) => void;
  result: ExplorerSearchResult;
}

function getResultPresentation(
  result: ExplorerSearchResult,
): ResultPresentation {
  switch (result.kind) {
    case "address":
      return {
        Icon: WalletCards,
        title: "Address",
        description: result.shinzoAddress,
      };
    case "view":
      return {
        Icon: Database,
        title: `View · ${result.name}`,
        description: result.address,
      };
    case "host":
      return {
        Icon: HardDrive,
        title: "Host",
        description: `${result.address} · ${formatHash(result.did, 14, 6)}`,
      };
    case "indexer":
      return {
        Icon: Database,
        title: "Indexer",
        description: `${result.address} · ${
          result.sourceChain || "Unknown chain"
        }`,
      };
    case "transaction": {
      const hash = result.evmHash ?? result.cosmosHash;
      const network = result.transactionKind === "evm" ? "EVM" : "Cosmos";

      return {
        Icon: ReceiptText,
        title: `${network} transaction`,
        description: `${formatHash(hash, 16, 10)} · Block ${result.height}`,
      };
    }
    case "block":
      return {
        Icon: Blocks,
        title: `Block ${result.height}`,
        description: formatHash(result.hash, 16, 10),
      };
  }
}

export function getInternalResultHref(result: InternalSearchResult): string {
  const chain = "shinzohub";

  switch (result.kind) {
    case "host":
      return getPageLink("host", { address: result.address, chain });
    case "indexer":
      return getPageLink("indexer", { address: result.address, chain });
    case "transaction":
      return getPageLink("tx", { param: result.cosmosHash, chain });
    case "block":
      return getPageLink("block", { param: result.height, chain });
    case "address":
      return getPageLink("address", {
        param: result.shinzoAddress,
        chain,
      });
  }
}

function SearchResultContent({ result }: { result: ExplorerSearchResult }) {
  const { description, Icon, title } = getResultPresentation(result);

  return (
    <>
      <Icon aria-hidden className="size-4" />
      <span className="min-w-0 flex-1">
        <strong className="block truncate font-medium">{title}</strong>
        <span className="block truncate text-xs text-ui-text-muted">
          {description}
        </span>
      </span>
      {result.kind === "view" && (
        <ExternalLink aria-hidden className="size-3.5" />
      )}
    </>
  );
}

export function SearchResultItem({
  active = false,
  id,
  onHighlight,
  onPick,
  onSelect,
  result,
}: SearchResultItemProps) {
  const commonProps = {
    "data-active": active,
    "data-search-focusable": true,
    id,
    onFocus: onHighlight,
    onPointerMove: onHighlight,
  };

  if (result.kind === "view") {
    return (
      <DropdownMenuItem asChild {...commonProps}>
        <a
          href={result.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onPick?.(result)}
        >
          <SearchResultContent result={result} />
        </a>
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuItem
      {...commonProps}
      onSelect={() => onSelect(result)}
    >
      <SearchResultContent result={result} />
    </DropdownMenuItem>
  );
}

export { getExplorerSearchResultKey };
