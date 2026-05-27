"use client";

import "./setup-graphiql-workers";
import { GraphiQL, type GraphiQLProps } from "graphiql";
import type { ExecutionResult } from "graphql";
import "graphiql/style.css";
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
  <section className="flex flex-col gap-4">
    <div className="flex flex-col gap-1">
      <h2 className="font-mono text-xl font-light text-szo-black">
        GraphQL playground
      </h2>
      <p className="text-sm text-szo-black/55">
        Query this view through the configured host GraphQL endpoint.
      </p>
    </div>

    <div className="flex flex-col gap-4">
      <div className="min-h-[520px] overflow-hidden border border-ui-border bg-white xl:h-[680px]">
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

      <aside className="flex min-h-0 flex-col border border-ui-border bg-white">
        <div className="border-b border-ui-border p-4">
          <h3 className="font-mono text-sm font-light text-szo-black">
            Resolved schema
          </h3>
          {view.schemaError ? (
            <p className="mt-2 text-xs text-red-700">{view.schemaError}</p>
          ) : (
            <p className="mt-2 text-xs text-szo-black/50">
              Local SDL plus a generated Query root for field discovery.
            </p>
          )}
        </div>
        <pre className="max-h-[360px] overflow-auto p-4 text-xs leading-5 text-szo-black/70">
          <code>{view.schemaSdl}</code>
        </pre>
      </aside>
    </div>
  </section>
);
