"use client";

import "./setup-graphiql-workers";
import { GraphiQL, type GraphiQLProps } from "graphiql";
import { GraphQLError, type ExecutionResult } from "graphql";
import { ChevronDown, LockKeyhole, WalletCards } from "lucide-react";
import type { KeyboardEvent } from "react";
import "graphiql/style.css";
import "./view-playground.css";
import { Button } from "@/shared/ui/button";
import type { ViewPageRecord } from "../model/types";
import type { ViewAvailability } from "../model/view-availability";

type GraphiQLFetcher = NonNullable<GraphiQLProps["fetcher"]>;
type GraphiQLResult = ExecutionResult<Record<string, unknown>>;

const previewFetcher: GraphiQLFetcher = (): Promise<GraphiQLResult> =>
  Promise.resolve({
    errors: [
      new GraphQLError(
        "Paid query execution is disabled in this Studio preview. No network request was sent."
      ),
    ],
  });

const preventQueryExecution = (event: KeyboardEvent<HTMLDivElement>) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    event.preventDefault();
    event.stopPropagation();
  }
};

export const ViewPlayground = ({
  view,
  availability,
}: {
  view: ViewPageRecord;
  availability: ViewAvailability;
}) => (
  <section
    className="flex min-w-0 flex-col gap-5"
    aria-labelledby="query-view-title"
  >
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-ui-text-accent">
          Query
        </p>
        <h2
          id="query-view-title"
          className="mt-2 font-mono text-2xl font-normal text-szo-black"
        >
          Query this view
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-ui-text-muted">
          Draft and inspect a GraphQL query now. Paid execution will require an
          active pool, prepaid query funds, and approval from the connected
          wallet.
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row lg:shrink-0">
        <Button type="button" variant="secondary" disabled className="gap-2">
          <WalletCards className="size-4" aria-hidden="true" />
          Add query funds
          <span className="font-normal opacity-70">· Coming soon</span>
        </Button>
        <Button type="button" disabled className="gap-2">
          <LockKeyhole className="size-4" aria-hidden="true" />
          Run paid query
          <span className="font-normal opacity-70">· Coming soon</span>
        </Button>
      </div>
    </div>

    <div className="border border-ui-border bg-ui-bg-muted px-4 py-3 text-xs leading-5 text-ui-text-muted">
      <span className="font-medium text-szo-black">Preview only.</span>{" "}
      {queryAvailabilityCopy(availability)} Editing and schema exploration stay
      local; execution controls and the Ctrl/⌘ + Enter shortcut are disabled.
    </div>

    <div className="flex min-w-0 flex-col gap-0">
      <details className="group min-w-0 border border-ui-border border-b-0 bg-white">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-3 py-2.5 marker:hidden [&::-webkit-details-marker]:hidden">
          <h3
            title={view.name}
            className="min-w-0 truncate font-mono text-sm font-normal text-szo-black"
          >
            / {view.name}
          </h3>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-sm border border-ui-border bg-white px-2.5 py-1 font-sans text-xs font-medium text-ui-text transition-colors group-open:border-szo-primary/30 group-open:bg-ui-bg-accent group-open:text-ui-text-accent">
            Resolved schema
            <ChevronDown
              className="size-3.5 transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </span>
        </summary>
        <div className="border-t border-ui-border px-3 pb-3">
          {view.schemaError ? (
            <p className="py-2 text-xs text-red-700">{view.schemaError}</p>
          ) : (
            <p className="py-2 text-xs text-ui-text-muted">
              Local SDL plus a generated Query root for field discovery.
            </p>
          )}
          <pre className="max-h-[260px] overflow-auto border border-ui-border bg-ui-bg-muted p-3 font-mono text-xs leading-5 text-ui-text">
            <code>{view.schemaSdl}</code>
          </pre>
        </div>
      </details>

      <div
        className="shinzo-graphiql-shell shinzo-graphiql-preview h-[680px] min-h-[560px] overflow-hidden border border-ui-border bg-white lg:h-[640px]"
        onKeyDownCapture={preventQueryExecution}
      >
        <GraphiQL
          key={view.id}
          fetcher={previewFetcher}
          initialQuery={view.defaultQuery}
          defaultQuery={view.defaultQuery}
          schema={view.schema}
          dangerouslyAssumeSchemaIsValid={Boolean(view.schema)}
          defaultEditorToolsVisibility={false}
          isHeadersEditorEnabled={false}
          forcedTheme="light"
        >
          <GraphiQL.Logo>View GraphQL</GraphiQL.Logo>
        </GraphiQL>
      </div>
    </div>
  </section>
);

const queryAvailabilityCopy = (availability: ViewAvailability): string => {
  switch (availability.status) {
    case "loading":
      return "Studio is checking this view's pools.";
    case "available":
      return "This view has an active pool for queries.";
    case "waiting":
      return "The pool still needs three joined hosts before queries can run.";
    case "no-pools":
      return "This view does not have a pool yet.";
    case "unavailable":
      return "Studio could not check pools, but your query draft is still available.";
  }
};
