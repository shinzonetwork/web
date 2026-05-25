import { useState } from "react";

// Syntax-highlights raw markdown for display inside <pre>.
// Uses inline styles so no CSS classes are needed.
function highlightMd(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/^(# .+)$/gm,   '<span style="color:#111827;font-weight:700">$1</span>')
    .replace(/^(## .+)$/gm,  '<span style="color:#2563eb;font-weight:600">$1</span>')
    .replace(/^(### .+)$/gm, '<span style="color:#4f46e5;font-weight:600">$1</span>')
    .replace(/\*\*([^*]+)\*\*/g, '<span style="color:#111827;font-weight:600">**$1**</span>')
    .replace(/`([^`]+)`/g,   '<span style="color:#d01f27;background:rgba(208,31,39,0.08);padding:1px 4px;border-radius:3px">`$1`</span>')
    .replace(/^(---)$/gm,    '<span style="color:#d1d5db">---</span>')
    .replace(/\|/g,          '<span style="color:#d1d5db">|</span>');
}

const STEPS = [
  <>Copy it into any LLM context for accurate, on-brand output</>,
  <>Reference <code className="text-szo-primary text-xs font-mono">--color-szo-primary</code> and typography tokens directly</>,
  <>Use the Agent Prompt Guide in Section 9 for component generation</>,
];

interface DesignMdViewProps {
  content: string;
}

export function DesignMdView({ content }: DesignMdViewProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="mt-[var(--spacing-nav)] min-h-[calc(100vh-var(--spacing-nav))] bg-gray-50 px-4 py-6 sm:px-16 sm:py-12">
      {/* Intro */}
      <div className="max-w-[860px] mb-10">
        <h1 className="font-display text-3xl font-normal tracking-tight text-gray-900 mb-3">
          DESIGN.md
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-[560px]">
          The Shinzo brand specification — a structured, machine-readable reference for designers,
          developers, and AI agents building on the Shinzo design system.
        </p>
        <div className="flex flex-col gap-3">
          {STEPS.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-szo-primary text-white text-px-10 font-bold flex items-center justify-center mt-px">
                {i + 1}
              </span>
              <span className="text-sm text-gray-700 leading-relaxed">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Code block */}
      <div className="max-w-[860px] bg-white border border-gray-200 rounded-xl px-5 py-5 sm:px-10 sm:py-8 overflow-x-auto">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <span className="font-mono text-sm font-semibold text-szo-primary">DESIGN.md</span>
          <button
            onClick={handleCopy}
            className="bg-gray-100 text-gray-600 border border-gray-200 text-xs font-medium px-3.5 py-1.5 rounded-md cursor-pointer transition-all duration-150 hover:bg-gray-200 hover:text-gray-900 font-body"
          >
            {copied ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>
        <pre
          className="font-mono text-px-13 leading-[1.65] text-gray-600 whitespace-pre-wrap break-words m-0"
          dangerouslySetInnerHTML={{ __html: highlightMd(content) }}
        />
      </div>
    </div>
  );
}
