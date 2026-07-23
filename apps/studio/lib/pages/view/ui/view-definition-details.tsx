import { ViewAddressChip } from "@/entities/view";
import type { ViewPageRecord } from "../model/types";
import { TechnicalCell } from "./technical-cell";

export const ViewDefinitionDetails = ({ view }: { view: ViewPageRecord }) => (
  <div className="grid min-w-0 gap-px border-b border-ui-border bg-gray-200 md:grid-cols-2 xl:grid-cols-4">
    <TechnicalCell label="View address">
      <ViewAddressChip link={view.viewAddressLink} />
    </TechnicalCell>
    <TechnicalCell label="Author">
      <ViewAddressChip link={view.creator} />
    </TechnicalCell>
    <TechnicalCell label="Registration height">
      <span className="font-mono text-sm text-szo-black">#{view.height}</span>
    </TechnicalCell>
    <TechnicalCell label="Root type">
      <span className="break-words font-mono text-sm text-szo-black [overflow-wrap:anywhere]">
        {view.rootType}
      </span>
    </TechnicalCell>
    <div className="min-w-0 bg-white p-5 md:col-span-2 xl:col-span-4">
      <p className="text-xs uppercase tracking-wide text-ui-text-muted">
        Lens definition
      </p>
      {view.lens.status === "verified" ? (
        <div className="mt-2">
          <p className="font-mono text-sm text-szo-black">{view.lens.title}</p>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-ui-text-muted">
            {view.lens.description}
          </p>
          <p className="mt-2 break-words font-mono text-xs text-ui-text-muted">
            {view.lens.hash}
          </p>
        </div>
      ) : view.lens.status === "not-verified" ? (
        <ul className="mt-2 space-y-2">
          {view.lens.hashes.map((hash) => (
            <li
              key={hash}
              className="break-words font-mono text-xs text-ui-text-muted"
            >
              {hash}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-ui-text-muted">
          No verifiable lens metadata is available.
        </p>
      )}
    </div>
  </div>
);
