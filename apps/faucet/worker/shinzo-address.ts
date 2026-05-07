import { keccak256, Secp256k1 } from '@cosmjs/crypto';
import { fromBech32, fromHex, toBech32 } from '@cosmjs/encoding';
import { getRequiredEnv } from './env';
import { SHINZO_PREFIX } from './faucet-constants';

const HEX_ADDRESS_RE = /^(?:0x)?[0-9a-fA-F]{40}$/;

export class AddressValidationError extends Error {
  constructor() {
    super('Invalid Shinzo address.');
    this.name = 'AddressValidationError';
  }
}

export interface FaucetSigner {
  address: string;
  compressedPubkey: Uint8Array;
  privateKey: Uint8Array;
}

export const isAddressValidationError = (
  error: unknown,
): error is AddressValidationError => error instanceof AddressValidationError;

export const normalizeShinzoAddress = (value: string): string => {
  const input = value.trim();

  if (!input) {
    throw new AddressValidationError();
  }

  if (HEX_ADDRESS_RE.test(input)) {
    return toBech32(SHINZO_PREFIX, fromHex(input.replace(/^0x/i, '')));
  }

  try {
    const { prefix, data } = fromBech32(input);

    if (prefix !== SHINZO_PREFIX || data.length !== 20) {
      throw new AddressValidationError();
    }

    return toBech32(SHINZO_PREFIX, data);
  } catch (error) {
    if (isAddressValidationError(error)) {
      throw error;
    }

    throw new AddressValidationError();
  }
};

export const createFaucetSigner = async (): Promise<FaucetSigner> => {
  const privateKey = fromHex(
    getRequiredEnv('FAUCET_PRIVATE_KEY').replace(/^0x/i, ''),
  );
  const keypair = await Secp256k1.makeKeypair(privateKey);

  return {
    address: toBech32(SHINZO_PREFIX, keccak256(keypair.pubkey.slice(1)).slice(-20)),
    compressedPubkey: Secp256k1.compressPubkey(keypair.pubkey),
    privateKey,
  };
};
