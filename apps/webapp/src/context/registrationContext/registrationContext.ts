import { createContext } from "react";
import { Hex } from "viem";

export type RegistrationContext = {
  defraPublicKey: string;
  peerId: string;
  signature: Hex | undefined;
  handleDefraPublicKey: (key: string) => void;
  handlePeerId: (peerId: string) => void;
  handleSignature: (sign: Hex) => void;
};

export const RegistrationContext = createContext<RegistrationContext>({
  defraPublicKey: "",
  peerId: "",
  signature: undefined,
  handleDefraPublicKey: () => {},
  handlePeerId: () => {},
  handleSignature: () => {},
});
