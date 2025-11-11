'use client'

import { useAccount, useVerifyMessage } from 'wagmi'
import { useSignInContext } from '@/hooks/useSignInContext'
import { useEffect } from 'react';

export function SignatureVerificationHandler() {
  const { address }  = useAccount();
  const { signature, defraPublicKey, handleSignedWithWallet} = useSignInContext();

  const { data } = useVerifyMessage({address, message: defraPublicKey, signature: signature})
  
  useEffect(() => {
    handleSignedWithWallet(data);
  }, [data])

  return null;
}

