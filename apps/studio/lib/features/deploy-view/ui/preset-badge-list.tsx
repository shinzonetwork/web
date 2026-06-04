"use client";

import type { ReactNode } from "react";

export interface PresetBadgeItem {
  key: string;
  label: string;
  title: string;
  value: string;
  icon?: ReactNode;
}

interface PresetBadgeListProps {
  items: readonly PresetBadgeItem[];
  onSelect: (value: string) => void;
}

export const PresetBadgeList = ({
  items,
  onSelect,
}: PresetBadgeListProps) => (
  <div className="flex flex-wrap gap-2">
    {items.map((item) => (
      <button
        key={item.key}
        type="button"
        onClick={() => onSelect(item.value)}
        title={item.title}
        className="inline-flex items-center gap-2 rounded-full border border-szo-border px-3 py-1.5 text-xs font-medium text-szo-black transition-colors hover:border-szo-black"
      >
        {item.icon}
        <span className="font-medium text-szo-black">{item.label}</span>
      </button>
    ))}
  </div>
);
