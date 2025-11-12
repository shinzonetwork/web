import { createContext } from 'react';
import { Hex } from 'viem';

export type RegistrationContext = {
    defraPublicKey: string,
    peerId: string,
    signature: Hex | undefined,
    handleDefraPublicKey: (_key: string) => void,
    handlePeerId: (_peerId: string) => void,
    handleSignature: (_sign: Hex) => void,
}

export const RegistrationContext = createContext<RegistrationContext>({
    defraPublicKey: '',
    peerId: '',
    signature: undefined,
    handleDefraPublicKey: (_key: string) => {},
    handlePeerId: (_peerId: string) => {},
    handleSignature:(_sign: Hex) => {},
});
