'use client';
import { useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { SearchInput } from '@shinzo/ui/search-input';
import { Button } from '@/shared/button';
import { requestFaucetDrop } from './api/request-airdrop';
import ShinzoLogo from './shinzo-logo.svg';
import { RecaptchaWidget, type RecaptchaRef } from './recaptcha-widget';
import { ShinzoFrame } from './shinzo-frame';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function FaucetPage() {
  const recaptchaRef = useRef<RecaptchaRef>(null);
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!address.trim() || status === 'loading') return;
    setStatus('loading');
    try {
      const token = await recaptchaRef.current?.executeAsync() ?? '';
      recaptchaRef.current?.reset();
      const result = await requestFaucetDrop(address.trim(), token);
      if ('error' in result) {
        setStatus('error');
        setMessage(result.error);
      } else {
        setStatus('success');
        setMessage(result.txHash);
      }
    } catch {
      setStatus('error');
      setMessage('Unexpected error. Please try again.');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setMessage('');
    setAddress('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <ShinzoFrame />

      <div className="flex flex-col items-center gap-10 w-full max-w-3xl px-6 lg:px-24">
        <ShinzoLogo className="h-8 w-auto" />

        <h1 className="text-2xl lg:text-4xl font-semibold text-szo-black text-center">Get devnet $SHN tokens</h1>

        {status === 'success' ? (
          <div className="flex flex-col items-center gap-6 w-full text-center">
            <p className="text-sm text-szo-black/60">Tokens sent successfully!</p>
            <p className="font-mono text-xs text-szo-black/40 break-all">{message}</p>
            <Button variant="secondary" onClick={handleReset}>Send to another address</Button>
          </div>
        ) : (
          <>
            <SearchInput
              placeholder="Enter wallet address"
              showHint={false}
              enableSlashKey={false}
              autoFocus
              value={address}
              onChange={e => setAddress(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
            />

            {status === 'error' && (
              <p className="text-sm text-red-500 -mt-6 self-start">{message}</p>
            )}

            <RecaptchaWidget ref={recaptchaRef} />

            <div className="flex flex-col-reverse lg:flex-row flex-wrap justify-center gap-4">
              <Button variant="secondary" asChild>
                <a href="https://shinzo.network" target="_blank" rel="noopener noreferrer">
                  Learn about Shinzo
                </a>
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={status === 'loading' || !address.trim()}
              >
                {status === 'loading' ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Get 0.01 $SHN'
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
