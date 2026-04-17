import type { Address, Hex, TransactionReceipt } from "viem";
import {
  validateView,
  type ViewValidationResult,
} from "@shinzo/lenses/validate";
import {
  buildDeployTransaction,
  downloadWasm,
  extractDeployedViewContractAddress,
} from "./deploy-view";
import {
  findHubViewByEntityName,
  getHubViewByContractAddress,
} from "./hub-views";
import { queryLensView } from "./query-view";
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
  account: Address;
  to: Hex;
  data: Hex;
  chainId: number;
  gas?: bigint;
  gasPrice?: bigint;
}) => Promise<Hex>;
type WaitForTransactionReceiptFn = (args: {
  hash: Hex;
}) => Promise<TransactionReceipt>;
type EstimateGasFn = (args: {
  account: Address;
  to: Hex;
  data: Hex;
  chainId: number;
}) => Promise<bigint>;
type GetGasPriceFn = (args: { chainId: number }) => Promise<bigint>;
type DeployProgressStatus =
  | "checking"
  | "validating"
  | "deploying"
  | "confirming";

export class ViewValidationError extends Error {
  result: ViewValidationResult;

  constructor(result: ViewValidationResult) {
    const errorCount = result.issues.filter(
      (issue) => issue.severity === "error"
    ).length;
    super(`View validation failed with ${errorCount} error(s)`);
    this.name = "ViewValidationError";
    this.result = result;
  }
}

export async function deployLens<TArgs extends LensArgs>(params: {
  lens: LensDefinition<TArgs>;
  args: TArgs;
  account: Address;
  chainId: number;
  hubUrl: string;
  switchChainAsync: SwitchChainFn;
  sendTransactionAsync: SendTransactionFn;
  estimateGas?: EstimateGasFn;
  getGasPrice?: GetGasPriceFn;
  waitForTransactionReceipt?: WaitForTransactionReceiptFn;
  onStatusChange?: (status: DeployProgressStatus) => void;
}): Promise<{
  deployedView: StoredDeployedView;
  validationWarnings: ViewValidationResult["issues"];
}> {
  const {
    lens,
    args,
    account,
    chainId,
    hubUrl,
    switchChainAsync,
    sendTransactionAsync,
    estimateGas,
    getGasPrice,
    waitForTransactionReceipt,
    onStatusChange,
  } = params;
  const resolvedView = lens.resolveView(args);

  onStatusChange?.("checking");
  const existingHubView = await findHubViewByEntityName(
    hubUrl,
    resolvedView.entityName
  );

  if (existingHubView) {
    const deployedView = createStoredDeployedView(resolvedView, {
      source: "hub-existing",
      contractAddress: existingHubView.contractAddress,
    });

    return {
      deployedView,
      validationWarnings: [],
    };
  }

  onStatusChange?.("validating");
  const wasmBytes = await downloadWasm(resolvedView.wasmUrl);
  const validation = await validateView({
    query: resolvedView.query,
    sdl: resolvedView.sdl,
    lenses: [{ wasmBytes, args: resolvedView.deployArgs }],
  });

  if (!validation.ok) {
    throw new ViewValidationError(validation);
  }

  const tx = await buildDeployTransaction(resolvedView, wasmBytes);

  if (!waitForTransactionReceipt) {
    throw new Error(
      "Shinzo public client is unavailable. Check NEXT_PUBLIC_SHINZOHUB_EVM_RPC."
    );
  }

  if (!estimateGas) {
    throw new Error(
      "Gas estimation is unavailable. Check NEXT_PUBLIC_SHINZOHUB_EVM_RPC."
    );
  }

  const estimatedGas = await estimateGas({
    account,
    to: tx.to,
    data: tx.data,
    chainId,
  });
  const gas = estimatedGas + estimatedGas / BigInt(5);
  const gasPrice = getGasPrice ? await getGasPrice({ chainId }) : undefined;

  onStatusChange?.("deploying");
  await switchChainAsync({ chainId });
  const txHash = await sendTransactionAsync({
    account,
    to: tx.to,
    data: tx.data,
    chainId,
    gas,
    gasPrice: gasPrice && gasPrice > BigInt(0) ? gasPrice : undefined,
  });

  onStatusChange?.("confirming");
  const receipt = await waitForTransactionReceipt({ hash: txHash });
  if (receipt.status !== "success") {
    throw new Error("Deployment transaction reverted on-chain.");
  }

  const contractAddress = extractDeployedViewContractAddress(receipt);
  const registeredHubView = await getHubViewByContractAddress(
    hubUrl,
    contractAddress
  );

  if (!registeredHubView) {
    throw new Error(
      `Deployment transaction succeeded, but ShinzoHub LCD did not return a registered view for contract ${contractAddress}.`
    );
  }

  if (registeredHubView.name !== resolvedView.entityName) {
    throw new Error(
      `ShinzoHub registered "${registeredHubView.name}", but Studio expected "${resolvedView.entityName}".`
    );
  }

  const deployedView = createStoredDeployedView(resolvedView, {
    source: "deployed",
    contractAddress: registeredHubView.contractAddress,
    txHash,
  });

  return {
    deployedView,
    validationWarnings: validation.issues.filter(
      (issue) => issue.severity === "warning"
    ),
  };
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
    lens.resolveView(lens.parseStoredArgs(view.args)),
    hostUrl,
    view.entityName
  );

  return { lens, payload };
}
