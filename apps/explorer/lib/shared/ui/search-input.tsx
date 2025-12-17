'use client';
import { cn } from "@/shared/utils/utils";
import highlightUrl from './tabs/tab-highlight.png';
import { Search } from 'lucide-react';
import { ComponentProps, CSSProperties, KeyboardEventHandler, useCallback, useEffect, useRef } from 'react';
import { Typography } from '@/shared/ui/typography';

export const SearchInput = ({ ...props }: ComponentProps<"input">) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const registerSlashKeyListener = useCallback((event: KeyboardEvent) => {
    if (event.key === '/' && (event.target instanceof HTMLElement) && event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA' && !event.target.isContentEditable) {
      event.preventDefault();
      inputRef.current?.focus();
    }
  }, []);

  const onEscapeKeyListener: KeyboardEventHandler<HTMLInputElement> = useCallback((event) => {
    if (event.key === 'Escape') {
      inputRef.current?.blur();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', registerSlashKeyListener);
    return () => {
      window.removeEventListener('keydown', registerSlashKeyListener);
    };
  }, [registerSlashKeyListener])

  return (
    <div
      style={{ /* set bg image URL used in ::before element */ '--bg-highlight': `url(${highlightUrl.src})` } as CSSProperties}
      className={cn(
        "relative w-full",
        "before:bg-(image:--bg-highlight) before:content-[''] before:absolute before:left-5 before:top-[calc(100%-16px)] before:h-6 before:w-3/5 before:rounded-xl before:bg-no-repeat before:bg-cover before:pointer-events-none",
      )}
    >
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-primary z-10" />

      <input
        ref={inputRef}
        type="search"
        data-slot="input"
        placeholder="Search by Address / Txn Hash / Block"
        onKeyDown={onEscapeKeyListener}
        className={cn(
          'relative h-14 border-2 border-accent rounded-xl bg-white w-full min-w-0 py-4 px-10',
          'font-mono text-base',
          "placeholder:text-text-secondary selection:bg-accent selection:text-background transition-[color,box-shadow] outline-none",
          "focus-visible:border-accent focus-visible:ring-accent/50 focus-visible:ring-[3px]",
        )}
        {...props}
      />

      <Typography
        font='mono'
        weight='semibold'
        className='absolute flex items-center justify-center right-4 top-1/2 -translate-y-1/2 w-6 h-6 border border-accent text-accent bg-background-accent-hover rounded'
      >
        /
      </Typography>
    </div>
  );
};
