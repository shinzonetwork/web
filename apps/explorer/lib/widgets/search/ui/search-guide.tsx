import { ExternalLink, Sparkles } from "lucide-react";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@shinzo/ui/dropdown-menu";
import {
  SEARCH_DOCUMENTATION_LINKS,
  SEARCH_EXAMPLES,
  SUPPORTED_SEARCH_ENTITIES,
} from "../model/search-guidance";

function DocsLink({
  children,
  href,
}: {
  children: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-search-focusable
      className="inline-flex items-center gap-1 text-ui-text-accent underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-accent/60"
    >
      {children}
      <ExternalLink aria-hidden className="size-3" />
    </a>
  );
}

function SearchEntityChips() {
  return (
    <div className="px-3 pb-3">
      <div className="flex flex-wrap gap-1.5">
        {SUPPORTED_SEARCH_ENTITIES.map((entity) => {
          const chipClassName = [
            "rounded-full border border-ui-accent/40",
            "bg-ui-bg-accent-hover px-2 py-1",
            "text-xs font-medium text-ui-text",
          ].join(" ");

          if (!("docsHref" in entity)) {
            return (
              <span
                key={entity.id}
                className={chipClassName}
                title={entity.description}
              >
                {entity.label}
              </span>
            );
          }

          return (
            <a
              key={entity.id}
              href={entity.docsHref}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
              className={[
                chipClassName,
                "underline-offset-4 hover:underline",
                "focus-visible:outline-none",
                "focus-visible:ring-2 focus-visible:ring-ui-accent/60",
              ].join(" ")}
              title={`${entity.description} Open docs.`}
            >
              {entity.label}
            </a>
          );
        })}
      </div>
      <p className="mt-2 text-xs leading-5 text-ui-text-muted">
        <DocsLink href={SEARCH_DOCUMENTATION_LINKS.views}>Views</DocsLink>
        {", "}
        <DocsLink href={SEARCH_DOCUMENTATION_LINKS.hosts}>Hosts</DocsLink>
        {", and "}
        <DocsLink href={SEARCH_DOCUMENTATION_LINKS.generators}>
          Generators
        </DocsLink>{" "}
        are exact address matches.
      </p>
    </div>
  );
}

function SearchExampleRows({
  onExampleSelect,
}: {
  onExampleSelect: (query: string) => void;
}) {
  return (
    <div>
      <DropdownMenuLabel>Examples</DropdownMenuLabel>
      {SEARCH_EXAMPLES.map((example) => {
        const content = (
          <>
            <span className="w-32 shrink-0 text-xs font-semibold leading-5 text-ui-text-muted">
              {example.label}
            </span>
            <span className="min-w-0 flex-1">
              <code className="block truncate text-xs text-ui-text">
                {example.value}
              </code>
              <span className="block truncate text-xs text-ui-text-muted">
                {example.description}
              </span>
            </span>
          </>
        );

        if (!("query" in example)) {
          return (
            <div
              key={example.id}
              className="relative flex min-h-12 select-text items-start gap-3 rounded-lg px-3 py-2 font-mono text-sm"
            >
              {content}
            </div>
          );
        }

        return (
          <DropdownMenuItem
            key={example.id}
            data-search-focusable
            className="items-start"
            onSelect={(event) => {
              event.preventDefault();
              onExampleSelect(example.query);
            }}
          >
            {content}
          </DropdownMenuItem>
        );
      })}
    </div>
  );
}

export function SearchGuide({
  onExampleSelect,
}: {
  onExampleSelect: (query: string) => void;
}) {
  return (
    <div className="font-mono">
      <DropdownMenuLabel className="flex items-center gap-2">
        <Sparkles aria-hidden className="size-3.5" />
        Supported searches
      </DropdownMenuLabel>
      <SearchEntityChips />
      <SearchExampleRows onExampleSelect={onExampleSelect} />
    </div>
  );
}
