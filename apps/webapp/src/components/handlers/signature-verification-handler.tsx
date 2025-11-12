'use client'

import { useAccount, useVerifyMessage } from 'wagmi'
import { useRegistrationContext } from '@/hooks/useRegistrationContext'
import { useEffect } from 'react';
import useShinzoStore from '@/store/store';

export function SignatureVerificationHandler() {
  const { address }  = useAccount();
  const { signature, defraPublicKey} = useRegistrationContext();
  const { isRegistered } = useShinzoStore();

  const { data } = useVerifyMessage({address, message: defraPublicKey, signature: signature})
  
  useEffect(() => {
    isRegistered(Boolean(data))
  }, [data])

  return null;
}

