'use client';
import { SearchInput } from '@shinzo/ui/search-input';
import { Button } from '@/shared/button';
import ShinzoLogo from './shinzo-logo-full.svg';
import { RecaptchaWidget } from './recaptcha-widget';

export function FaucetPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-4 lg:top-16 left-0 right-0 h-px bg-szo-border" />
        <div className="absolute bottom-4 lg:bottom-16 left-0 right-0 h-px bg-szo-border" />
        <div className="absolute left-4 lg:left-16 top-0 bottom-0 w-px bg-szo-border" />
        <div className="absolute right-4 lg:right-16 top-0 bottom-0 w-px bg-szo-border" />
      </div>

      <div className="flex flex-col items-center gap-10 w-full max-w-3xl px-6 lg:px-24">
        <ShinzoLogo className="h-8 w-auto" />

        <h1 className="text-2xl lg:text-4xl font-semibold text-szo-black text-center">Get devnet $SHN tokens</h1>

        <SearchInput
          placeholder="Enter wallet address"
          showHint={false}
          enableSlashKey={false}
          autoFocus
        />

        <RecaptchaWidget />

        <div className="flex flex-col-reverse lg:flex-row flex-wrap justify-center gap-4">
          <Button variant="secondary" asChild>
            <a href="https://shinzo.network" target="_blank" rel="noopener noreferrer">
              Learn about Shinzo
            </a>
          </Button>
          <Button variant="primary">
            Get 0.01 $SZO
          </Button>
        </div>
      </div>
    </div>
  );
}
