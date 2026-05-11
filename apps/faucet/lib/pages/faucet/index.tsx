import { useMemo, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { SearchInput } from '@shinzo/ui/search-input';
import { Button } from '@/shared/button';
import { requestFaucetDrop } from './api/request-airdrop';
import ShinzoLogo from './shinzo-logo.svg';
import { RecaptchaWidget, type RecaptchaRef } from './recaptcha-widget';
import { ShinzoFrame } from './shinzo-frame';
import { SHINZOHUB_EXPLORER_URL } from '@/shared/envs';

type Status = 'idle' | 'loading' | 'success' | 'error';

const RATE_LIMIT_KEY = 'faucet_requested';
const RATE_LIMIT_MS  = 24 * 60 * 60 * 1000;
const RECAPTCHA_TIMEOUT_MS = 10_000;

const explorerPath = (path: string) => {
  const baseUrl = SHINZOHUB_EXPLORER_URL.endsWith('/')
    ? SHINZOHUB_EXPLORER_URL
    : `${SHINZOHUB_EXPLORER_URL}/`;

  return new URL(path.replace(/^\/+/, ''), baseUrl).toString();
};

const formatExplorerTxHash = (txHash: string) =>
  txHash.startsWith('0x') ? txHash : `0x${txHash}`;

const getRecaptchaToken = async (recaptcha: RecaptchaRef | null) => {
  if (!recaptcha) return '';

  let timeoutId: ReturnType<typeof setTimeout>;

  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(
      () => reject(new Error('reCAPTCHA timed out. Please refresh and try again.')),
      RECAPTCHA_TIMEOUT_MS,
    );
  });

  try {
    const token = await Promise.race([recaptcha.executeAsync(), timeout]);

    if (!token) {
      throw new Error('reCAPTCHA verification failed. Please try again.');
    }

    return token;
  } finally {
    clearTimeout(timeoutId!);
    recaptcha.reset();
  }
};

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

    return explorerPath(`/address/${shinzoAddress}`);
  }, [shinzoAddress]);

  const txLink = useMemo(() => {
    return explorerPath(`/tx/${formatExplorerTxHash(message)}`);
  }, [message]);

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
      const token = await getRecaptchaToken(recaptchaRef.current);
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
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error ? error.message : 'Unexpected error. Please try again.',
      );
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

            <p className="font-mono text-xs text-szo-black/40 break-all">
              Tx hash{' '}
              <a
                href={txLink}
                className="underline cursor-pointer"
                target="_blank"
              >
                {message}
              </a>
            </p>

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
                  'Get 0.001 $SHN'
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
