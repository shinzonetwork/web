import type { Hex } from "viem";
import { buildDeployTransaction } from "./deploy-view";
import { queryLensView, pollForView } from "./query-view";
import {
  createStoredDeployedView,
  type StoredDeployedView,
} from "./deployed-views-storage";
import {
  getLensDefinition,
  type AnyLensDefinition,
  type LensArgs,
  type LensDefinition,
} from "./lens-catalog";

type SwitchChainFn = (args: { chainId: number }) => Promise<unknown>;
type SendTransactionFn = (args: {
  to: Hex;
  data: Hex;
  chainId: number;
}) => Promise<unknown>;
type DeployProgressStatus = "deploying" | "propagating" | "querying";

export async function deployAndQueryLens<TArgs extends LensArgs>(params: {
  senderAddress: string;
  lens: LensDefinition<TArgs>;
  args: TArgs;
  chainId: number;
  hostUrl: string;
  switchChainAsync: SwitchChainFn;
  sendTransactionAsync: SendTransactionFn;
  onStatusChange?: (status: DeployProgressStatus) => void;
}): Promise<{
  deployedView: StoredDeployedView;
  payload: unknown;
}> {
  const {
    senderAddress,
    lens,
    args,
    chainId,
    hostUrl,
    switchChainAsync,
    sendTransactionAsync,
    onStatusChange,
  } = params;

  const tx = await buildDeployTransaction(senderAddress, lens, args);

  onStatusChange?.("deploying");
  await switchChainAsync({ chainId });
  await sendTransactionAsync({
    to: tx.to,
    data: tx.data,
    chainId,
  });

  const deployedView = createStoredDeployedView(lens, {
    viewHash: tx.viewHash,
    viewName: tx.viewName,
    args,
  });

  onStatusChange?.("propagating");
  await pollForView(tx.viewName, hostUrl);

  onStatusChange?.("querying");
  const payload = await queryLensView(lens, tx.viewName, args, hostUrl);

  return {
    deployedView,
    payload,
  };
}

export async function requeryLens<TArgs extends LensArgs>(params: {
  lens: LensDefinition<TArgs>;
  viewName: string;
  args: TArgs;
  hostUrl: string;
}): Promise<unknown> {
  const { lens, viewName, args, hostUrl } = params;
  return queryLensView(lens, viewName, args, hostUrl);
}

export async function callStoredLensView(params: {
  view: StoredDeployedView;
  hostUrl: string;
}): Promise<{
  lens: AnyLensDefinition;
  payload: unknown;
}> {
  const { view, hostUrl } = params;
  const lens = getLensDefinition(view.lensKey);

  if (!lens?.uiSupported) {
    throw new Error(`Lens "${view.lensKey}" is not supported in Studio right now.`);
  }

  const payload = await queryLensView(
    lens,
    view.viewName,
    lens.parseStoredArgs(view.args),
    hostUrl
  );

  return { lens, payload };
}
