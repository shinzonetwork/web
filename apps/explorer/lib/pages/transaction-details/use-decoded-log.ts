'use client';

import { useQuery } from '@tanstack/react-query';
import { decodeEventLog, getAddress, type AbiEvent } from 'viem';
import { KNOWN_EVENTS } from './known-events';

export interface DecodedArg {
  name: string;
  type: string;
  value: string;
  indexed: boolean;
}

export interface DecodedLog {
  eventName: string;
  args: DecodedArg[];
}

type Hex = `0x${string}`;
type Topics = [Hex, ...Hex[]];

/** Coerces a decoded value into a display-friendly string. */
const formatArgValue = (value: unknown, type: string): string => {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'bigint') return value.toString();

  if (typeof value === 'string') {
    if (type === 'address') {
      try { return getAddress(value); } catch { return value; }
    }
    return value;
  }

  if (typeof value === 'boolean') return value ? 'true' : 'false';

  if (Array.isArray(value)) {
    return `[${value.map((v) => formatArgValue(v, type.replace('[]', ''))).join(', ')}]`;
  }

  return String(value);
};

/** Decodes an event log using a known ABI definition. */
const decodeWithAbi = (
  abiEvent: AbiEvent,
  topics: string[],
  data: string,
): DecodedLog | null => {
  try {
    const decoded = decodeEventLog({
      abi: [abiEvent],
      topics: topics as Topics,
      data: data as Hex,
      strict: true,
    });

    const args: DecodedArg[] = abiEvent.inputs.map((input) => ({
      name: input.name ?? '',
      type: input.type,
      value: formatArgValue((decoded.args as Record<string, unknown>)[input.name ?? ''], input.type),
      indexed: input.indexed ?? false,
    }));

    return { eventName: abiEvent.name, args };
  } catch {
    return null;
  }
};

interface FourByteResponse {
  results: { text_signature: string }[];
}

/** Fetches candidate event signatures from 4byte.directory for unknown events. */
const fetchEventSignatures = async (topic0: string): Promise<string[]> => {
  try {
    const res = await fetch(
      `https://www.4byte.directory/api/v1/event-signatures/?hex_signature=${topic0}`,
    );
    if (!res.ok) return [];
    const data = (await res.json()) as FourByteResponse;
    return data.results.map((r) => r.text_signature);
  } catch {
    return [];
  }
};

/** Reconstructs an ABI from a 4byte text signature and decodes the log. */
const decodeWith4byte = (
  textSignature: string,
  topics: string[],
  data: string,
): DecodedLog | null => {
  try {
    const match = textSignature.match(/^(\w+)\((.*)?\)$/);
    if (!match) return null;
    const [, name, paramsStr] = match;
    if (!name) return null;

    const paramTypes = paramsStr ? paramsStr.split(',').map((t) => t.trim()) : [];
    const indexedCount = topics.length - 1;

    const abiEvent: AbiEvent = {
      type: 'event',
      name,
      inputs: paramTypes.map((type, i) => ({
        type: type as `${string}`,
        name: `arg${i}`,
        indexed: i < indexedCount,
      })),
    };

    return decodeWithAbi(abiEvent, topics, data);
  } catch {
    return null;
  }
};

/** Decodes a log entry, trying known ABIs first then falling back to 4byte.directory. */
export const useDecodedLog = (
  topics: string[] | null | undefined,
  data: string | null | undefined,
) => {
  const topic0 = topics?.[0];

  return useQuery({
    queryKey: ['decoded-log', topics, data],
    queryFn: async (): Promise<DecodedLog | null> => {
      if (!topic0 || !topics) return null;

      const rawData: Hex = `0x${data ?? ''}`;

      const candidates = KNOWN_EVENTS[topic0];
      if (candidates) {
        const match = candidates.find(
          (e) => e.inputs.filter((i) => i.indexed).length === topics.length - 1,
        ) ?? candidates[0];

        const decoded = match ? decodeWithAbi(match, topics, rawData) : null;
        if (decoded) return decoded;
      }

      const signatures = await fetchEventSignatures(topic0);
      for (const sig of signatures) {
        const decoded = decodeWith4byte(sig, topics, rawData);
        if (decoded) return decoded;
      }

      return null;
    },
    enabled: !!topic0,
    staleTime: Infinity,
  });
};
