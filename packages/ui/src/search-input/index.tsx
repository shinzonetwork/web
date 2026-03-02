'use client';
import { cn } from "../cn";
import highlightUrl from './tab-highlight.png';
import { Search } from 'lucide-react';
import { ComponentProps, CSSProperties, KeyboardEventHandler, useCallback, useEffect, useRef } from 'react';

type SearchInputProps = ComponentProps<"input"> & {
  showHint?: boolean;
  enableSlashKey?: boolean;
};

export const SearchInput = ({ showHint = true, enableSlashKey = true, ...props }: SearchInputProps) => {
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
    if (!enableSlashKey) return;
    window.addEventListener('keydown', registerSlashKeyListener);
    return () => {
      window.removeEventListener('keydown', registerSlashKeyListener);
    };
  }, [registerSlashKeyListener, enableSlashKey]);

  return (
    <div
      style={{ '--bg-highlight': `url(${highlightUrl.src})` } as CSSProperties}
      className={cn(
        "relative w-full",
        "before:bg-(image:--bg-highlight) before:content-[''] before:absolute before:left-5 before:top-[calc(100%-16px)] before:h-6 before:w-3/5 before:rounded-xl before:bg-no-repeat before:bg-cover before:pointer-events-none",
      )}
    >
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ui-text z-10" />

      <input
        ref={inputRef}
        type="search"
        data-slot="input"
        placeholder="Search by Address / Txn Hash / Block"
        onKeyDown={onEscapeKeyListener}
        className={cn(
          'relative h-14 border-2 border-ui-accent rounded-xl bg-white w-full min-w-0 py-4 px-10',
          'font-mono text-base',
          "placeholder:text-ui-text-muted selection:bg-ui-accent selection:text-ui-bg transition-[color,box-shadow] outline-none",
          "focus-visible:border-ui-accent focus-visible:ring-ui-accent/50 focus-visible:ring-[3px]",
          showHint && 'pr-14',
        )}
        {...props}
      />

      {showHint && (
        <span className="absolute flex items-center justify-center right-4 top-1/2 -translate-y-1/2 w-6 h-6 border border-ui-accent text-ui-accent bg-ui-bg-accent-hover rounded font-mono font-semibold text-xs">
          /
        </span>
      )}
    </div>
  );
};
