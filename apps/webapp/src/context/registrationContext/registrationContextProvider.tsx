'use client';

import { useState, ReactNode } from 'react';
import { RegistrationContext } from './registrationContext';
import type { RegistrationContext as RegistrationContextType } from './registrationContext';
import { Hex } from 'viem';

export const RegistrationContextProvider = ({ children }: { children: ReactNode }) => {
    const [ defraPublicKey, setDefraPublicKey ] = useState<string>('');
    const [ peerId, setPeerId ] = useState<string>('');
    const [ signature, setSignature ] = useState<Hex | undefined>(undefined);

    const context: RegistrationContextType = {
        defraPublicKey,
        peerId,
        signature,
        handleDefraPublicKey: (publicKey: string) => setDefraPublicKey(publicKey),
        handlePeerId: (peerId: string) => setPeerId(peerId),
        handleSignature: (sign: Hex) => setSignature(sign),
    };

    return (
        <RegistrationContext.Provider value={context}>{children}</RegistrationContext.Provider>
    )
}
