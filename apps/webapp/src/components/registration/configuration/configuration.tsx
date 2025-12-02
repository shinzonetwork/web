"use client";

import { useState, useEffect } from "react";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { encodeFunctionData, stringToHex } from "viem";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

import {
  EntityRole,
  MESSAGE_TO_SIGN,
  SHINZO_PRECOMPILE_ADDRESS,
} from "@/lib/constants";
import { convertToHexIfNeeded, sanitizeString } from "@/lib/utils/validate";
import { useAccount } from "wagmi";
import { useProfile } from "@/hooks/useStoredProfile";
import { useRegistrationContext } from "@/hooks/useRegistrationContext";

type FormData = {
  defraPublicKey: string;
  defraSignedMessage: string;
  peerId: string;
  peerSignedMessage: string;
  entity: EntityRole;
};

const formInputs = [
  {
    id: "defraPublicKey",
    label: "Defra Public Key",
  },
  {
    id: "defraSignedMessage",
    label: "Defra signature",
  },
  {
    id: "peerId",
    label: "Peer ID",
  },
  {
    id: "peerSignedMessage",
    label: "Peer signature",
  },
];

const REGISTER_TRANSACTION_ABI = [
  {
    name: "register",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "peerPub", type: "bytes" },
      { name: "peerSig", type: "bytes" },
      { name: "nodePub", type: "bytes" },
      { name: "nodeSig", type: "bytes" },
      { name: "message", type: "bytes" },
      { name: "entity", type: "uint8" },
    ],
    outputs: [],
  },
];

export default function Configuration() {
  const {
    sendTransaction,
    isPending,
    error: sendError,
    data: txHash,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: txHash as `0x${string}`,
    });
  const { address } = useAccount();
  const [formData, setFormData] = useState<FormData>({
    defraPublicKey: "",
    defraSignedMessage: "",
    peerId: "",
    peerSignedMessage: "",
    entity: EntityRole.Indexer,
  });

  const { isRegistered, setRegistered } = useRegistrationContext();
  const { updateRegisteredStatus } = useProfile();



  const handleInputChange = (field: string, value: string | number) => {
    const sanitizedValue =
      typeof value === "string" ? sanitizeString(value) : value;
    setFormData((prev) => ({ ...prev, [field]: sanitizedValue }));
  };

  const handleUserRoleChange = (value: string) => {
    const newEntity = parseInt(value) as EntityRole;
    setFormData((prev) => ({ ...prev, entity: newEntity }));
  };

  // Handle successful transaction confirmation
  useEffect(() => {
    if (isConfirmed && txHash && address && !isRegistered) {
      setRegistered(true);
      // Update registered status in GCS
      updateRegisteredStatus(address, true);
    }
  }, [
    isConfirmed,
    txHash,
    address,
    isRegistered,
    setRegistered,
    updateRegisteredStatus,
  ]);

  const sendRegisterTransaction = async () => {
    // Validate inputs before sending transaction
    if (!formData.peerId.trim()) {
      alert("Peer ID is required");
      return;
    }
    if (!formData.peerSignedMessage.trim()) {
      alert("Peer signature is required");
      return;
    }
    if (!formData.defraPublicKey.trim()) {
      alert("Defra Public Key is required");
      return;
    }
    if (!formData.defraSignedMessage.trim()) {
      alert("Defra signature is required");
      return;
    }

    try {
      const data = encodeFunctionData({
        abi: REGISTER_TRANSACTION_ABI,
        functionName: "register",
        args: [
          convertToHexIfNeeded(formData.peerId.trim()),
          convertToHexIfNeeded(formData.peerSignedMessage.trim()),
          convertToHexIfNeeded(formData.defraPublicKey.trim()),
          convertToHexIfNeeded(formData.defraSignedMessage.trim()),
          stringToHex(MESSAGE_TO_SIGN),
          formData.entity,
        ],
      });

      await sendTransaction({
        to: SHINZO_PRECOMPILE_ADDRESS,
        data,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      // Show user-friendly error message
      alert(`Transaction failed: ${errorMessage}`);
    }
  };

  const isRegistrationDisabled: boolean =
    !formData.defraPublicKey.trim() ||
    !formData.defraSignedMessage.trim() ||
    !formData.peerId.trim() ||
    !formData.peerSignedMessage.trim();

  return (
    <div className="space-y-6 mx-6">
      <div className="space-y-2">
        <h3 className="text-3xl font-bold">Configuration</h3>
        <p className="text-base leading-relaxed text-muted-foreground">
          Subtext on why we need this configuration information.
        </p>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="userRole" className="text-sm font-medium">
            Select a role
          </Label>
          <RadioGroup
            className="flex gap-4"
            value={formData.entity.toString()}
            onValueChange={(value: string) => handleUserRoleChange(value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="indexer" />
              <Label htmlFor="indexer">Indexer</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0" id="host" />
              <Label htmlFor="host">Host</Label>
            </div>
          </RadioGroup>
        </div>
        {formInputs.map((input) => (
          <div key={input.id} className="space-y-2">
            <Label htmlFor={input.id} className="text-sm font-medium">
              {input.label}
            </Label>
            {input.id === "defraSignedMessage" ||
            input.id === "peerSignedMessage" ? (
              <Textarea
                id={input.id}
                placeholder={`Enter ${input.label.toLowerCase()}...`}
                value={formData[input.id as keyof FormData] as string}
                onChange={(e) => handleInputChange(input.id, e.target.value)}
                className="min-h-[100px] font-mono text-sm"
              />
            ) : (
              <Input
                id={input.id}
                type="text"
                value={formData[input.id as keyof FormData] as string}
                onChange={(e) => handleInputChange(input.id, e.target.value)}
                className="font-mono"
              />
            )}
          </div>
        ))}
        <Button
          onClick={sendRegisterTransaction}
          className="w-full"
          disabled={isRegistrationDisabled || isPending || isConfirming}
        >
          {isPending
            ? "Confirming in wallet..."
            : isConfirming
              ? "Processing..."
              : isConfirmed
                ? "Registered!"
                : "Register"}
        </Button>
        {sendError && (
          <div className="text-sm text-destructive mt-2">
            Error: {sendError.message}
          </div>
        )}
      </div>
    </div>
  );
}
