import { createContext } from 'react';
import { Hex } from 'viem';

export type SignInContext = {
    defraPublicKey: string,
    signature: Hex | undefined,
    signedWithWallet: boolean | undefined,
    handleDefraPublicKey: (_key: string) => void,
    handleSignature: (_sign: Hex) => void,
    handleSignedWithWallet: (_isSigned: boolean | undefined) => void
}

export const SignInContext = createContext<SignInContext>({
    defraPublicKey: '',
    signature: undefined,
    signedWithWallet: false,
    handleDefraPublicKey: (_key: string) => {},
    handleSignature:(_sign: Hex) => {},
    handleSignedWithWallet: (_isSigned: boolean | undefined) => {}
});
