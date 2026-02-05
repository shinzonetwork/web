'use client';

import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../cn';

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
        'size-6 flex items-center justify-center text-ui-text-accent cursor-pointer rounded-full hover:bg-ui-bg-accent-hover',
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
