'use client';

import { useState, ReactNode, useEffect } from 'react';
import { SignInContext } from './signInContext';
import type { SignInContext as SignInContextType } from './signInContext';
import { Hex } from 'viem';

export const SignInContextProvider = ({ children }: { children: ReactNode }) => {
    const [ defraPublicKey, setDefraPublicKey ] = useState<string>('');
    const [ signature, setSignature ] = useState<Hex | undefined>(undefined);
    const [ signedWithWallet, setSignedWithWallet ] = useState<boolean | undefined>(undefined);

    const context: SignInContextType = {
        defraPublicKey,
        signature,
        signedWithWallet,
        handleDefraPublicKey: (publicKey: string) => setDefraPublicKey(publicKey),
        handleSignature: (sign: Hex) => setSignature(sign),
        handleSignedWithWallet: (isSigned: boolean | undefined) => setSignedWithWallet(isSigned),
    };

    return (
        <SignInContext.Provider value={context}>{children}</SignInContext.Provider>
    )
}
