import { MESSAGE_TO_SIGN } from "../constants";

export function buildIndexerSubmissionMessage(input: {
  validatorAddress: string;
  ip: string;
}): string {
  const validatorAddress = input.validatorAddress.trim().toLowerCase();
  const ip = input.ip.trim();

  return `${MESSAGE_TO_SIGN} Indexer submission authorization: validatorAddress:${validatorAddress} ip:${ip}`;
}
