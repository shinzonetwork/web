'use client';

import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/shared/utils/utils';

export interface CopyButtonProps {
  text: string;
  className?: string;
}

export const CopyButton = ({ text, className }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={copy}
      className={cn(
        'size-6 flex items-center justify-center text-text-accent cursor-pointer rounded-full hover:bg-background-accent-hover',
        className,
      )}
    >
      {copied ? (
        <Check className="size-3"/>
      ) : (
        <Copy className="size-3"/>
      )}
    </button>
  );
};
