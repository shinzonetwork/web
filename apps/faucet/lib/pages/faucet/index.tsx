'use client';
import { useMemo, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { SearchInput } from '@shinzo/ui/search-input';
import { Button } from '@/shared/button';
import { requestFaucetDrop } from './api/request-airdrop';
import ShinzoLogo from './shinzo-logo.svg';
import { RecaptchaWidget, type RecaptchaRef } from './recaptcha-widget';
import { ShinzoFrame } from './shinzo-frame';
import { SHINZO_RPC } from '@/shared/envs';

type Status = 'idle' | 'loading' | 'success' | 'error';

const RATE_LIMIT_KEY = 'faucet_requested';
const RATE_LIMIT_MS  = 24 * 60 * 60 * 1000;

function getRateLimitTs(): number | null {
  try {
    const v = localStorage.getItem(RATE_LIMIT_KEY);
    if (v) return parseInt(v, 10);
  } catch {}
  const m = document.cookie.match(/(?:^|;\s*)faucet_requested=(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

function isRateLimited(): boolean {
  const ts = getRateLimitTs();
  return ts !== null && Date.now() - ts < RATE_LIMIT_MS;
}

function markRequested() {
  const now = Date.now().toString();
  try { localStorage.setItem(RATE_LIMIT_KEY, now); } catch {}
  document.cookie = `faucet_requested=${now}; max-age=86400; SameSite=Strict; path=/`;
}

export function FaucetPage() {
  const recaptchaRef = useRef<RecaptchaRef>(null);
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [shinzoAddress, setShinzoAddress] = useState<string>();

  const successLink = useMemo(() => {
    if (!shinzoAddress) return null;

    const rpcHost = SHINZO_RPC.replace(/:[0-9]+$/, ':1317');
    return `${rpcHost}/cosmos/bank/v1beta1/balances/${shinzoAddress}`;
  }, [shinzoAddress]);

  const handleSubmit = async () => {
    if (!address.trim() || status === 'loading') return;
    if (isRateLimited()) {
      setStatus('error');
      setMessage('You already received tokens today. Try again in 24 hours.');
      return;
    }
    setShinzoAddress(undefined);
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
        markRequested();
        setShinzoAddress(result.address);
        setMessage(result.txHash);
      }
    } catch {
      setStatus('error');
      setMessage('Unexpected error. Please try again.');
    }
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
            <p className="font-mono text-xs text-szo-black/40 break-all">Tx hash {message}</p>
            {successLink && (
              <a
                href={successLink}
                className="font-mono text-xs text-szo-black/40 break-all underline cursor-pointer"
                target="_blank"
              >
                Check my balance
              </a>
            )}
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
