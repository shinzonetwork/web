"use client";

import { useEffect, useState } from "react";
import type { Hex } from "viem";
import { EntityRole } from "@/shared/lib";

export interface PrefillData {
  role: EntityRole | undefined;
  signedMessage: Hex | undefined;
  defraPublicKey: Hex | undefined;
  defraPublicKeySignedMessage: Hex | undefined;
  peerId: Hex | undefined;
  peerSignedMessage: Hex | undefined;
}

interface RegistrationResponse {
  status: string;
  registration?: {
    enabled: boolean;
    message: string;
    defra_pk_registration: {
      public_key: string;
      signed_pk_message: string;
    };
    peer_id_registration: {
      peer_id: string;
      signed_peer_message: string;
    };
  };
}

/**
 * Converts a string to Hex if it's a valid hex string, otherwise returns undefined.
 */
function toHexOrUndefined(value: string | undefined): Hex | undefined {
  if (!value || value === "") {
    return undefined;
  }
  return value as Hex;
}

function getUrlParams(): { role: EntityRole | undefined; url: string | undefined } {
  if (typeof window === "undefined") {
    return { role: undefined, url: undefined };
  }

  const searchParams = new URLSearchParams(window.location.search);

  const hostUrl = searchParams.get("host");
  if (hostUrl) {
    return { role: EntityRole.Host, url: hostUrl };
  }

  const indexerUrl = searchParams.get("indexer");
  if (indexerUrl) {
    return { role: EntityRole.Indexer, url: indexerUrl };
  }

  return { role: undefined, url: undefined };
}

/**
 * Hook that returns the prefill data fetched from the server URL in search params.
 * The URL should be passed as `?host={url}` or `?indexer={url}`.
 */
export function usePrefillData(): PrefillData & { isLoading: boolean } {
  const [data, setData] = useState<PrefillData>({
    role: undefined,
    signedMessage: undefined,
    defraPublicKey: undefined,
    defraPublicKeySignedMessage: undefined,
    peerId: undefined,
    peerSignedMessage: undefined,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { role, url } = getUrlParams();

    if (!role || !url) {
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
        });
        if (!response.ok) {
          console.error(`Failed to fetch registration data: ${response.status}`);
          return;
        }

        const json: RegistrationResponse = await response.json();

        if (!json.registration?.enabled) {
          console.error("Registration is not enabled on this server");
          return;
        }

        setData({
          role,
          signedMessage: toHexOrUndefined(json.registration.message),
          defraPublicKey: toHexOrUndefined(json.registration.defra_pk_registration.public_key),
          defraPublicKeySignedMessage: toHexOrUndefined(json.registration.defra_pk_registration.signed_pk_message),
          peerId: toHexOrUndefined(json.registration.peer_id_registration.peer_id),
          peerSignedMessage: toHexOrUndefined(json.registration.peer_id_registration.signed_peer_message),
        });
      } catch (err) {
        console.error("Failed to fetch registration data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { ...data, isLoading };
}
