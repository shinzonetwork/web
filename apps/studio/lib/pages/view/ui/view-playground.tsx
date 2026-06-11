"use client";

import "./setup-graphiql-workers";
import { GraphiQL, type GraphiQLProps } from "graphiql";
import type { ExecutionResult } from "graphql";
import { ChevronDown } from "lucide-react";
import "graphiql/style.css";
import "./view-playground.css";
import { HOST_GRAPHQL_REQUEST_URL } from "@/shared/consts/envs";
import type { ViewPageRecord } from "../model/types";

type GraphiQLFetcher = NonNullable<GraphiQLProps["fetcher"]>;
type GraphiQLResult = ExecutionResult<
  Record<string, unknown>,
  Record<string, unknown>
>;

const parseJsonObject = (text: string): Record<string, unknown> | null => {
  if (!text.trim()) {
    return null;
  }

  const parsed: unknown = JSON.parse(text);
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return null;
  }

  return parsed as Record<string, unknown>;
};

const graphiqlFetcher: GraphiQLFetcher = async (params) => {
  const response = await fetch(HOST_GRAPHQL_REQUEST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      operationName: params.operationName,
      query: params.query,
      variables: params.variables,
    }),
  });
  const responseText = await response.text();
  const payload = parseJsonObject(responseText);

  if (!payload) {
    throw new Error(
      responseText.trim()
        ? `Host returned a non-JSON response: ${responseText.trim()}`
        : "Host returned an empty response."
    );
  }

  return payload as GraphiQLResult;
};

export const ViewPlayground = ({ view }: { view: ViewPageRecord }) => (
  <section className="flex min-w-0 flex-col gap-3">
    <div className="flex flex-col gap-1">
      <h2 className="font-mono text-xl font-normal text-szo-black">
        GraphQL playground
      </h2>
      <p className="text-sm text-ui-text-muted">
        Query this view through the configured host GraphQL endpoint.
      </p>
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

      <div className="shinzo-graphiql-shell h-[680px] min-h-[560px] overflow-hidden border border-ui-border bg-white lg:h-[640px]">
        <GraphiQL
          key={view.id}
          fetcher={graphiqlFetcher}
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
