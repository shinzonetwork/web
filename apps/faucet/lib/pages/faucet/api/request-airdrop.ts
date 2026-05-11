export type FaucetDropResult =
  | { txHash: string; address: string }
  | { error: string };

export const requestFaucetDrop = async (
  address: string,
  captchaToken: string,
): Promise<FaucetDropResult> => {
  const response = await fetch('/api/faucet/request-airdrop', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address, captchaToken }),
  });

  let payload: unknown;

  try {
    payload = await response.json();
  } catch {
    return { error: 'Unexpected faucet response. Please try again.' };
  }

  if (isFaucetDropResult(payload)) return payload;

  return {
    error: response.ok
      ? 'Unexpected faucet response. Please try again.'
      : `Faucet request failed with status ${response.status}.`,
  };
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isFaucetDropResult = (value: unknown): value is FaucetDropResult => {
  if (!isRecord(value)) return false;

  if (typeof value.error === 'string') {
    return true;
  }

  return typeof value.txHash === 'string' && typeof value.address === 'string';
};
