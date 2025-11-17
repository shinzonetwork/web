"use client";

import { useState, useEffect } from "react";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { encodeFunctionData, stringToHex } from "viem";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

import useShinzoStore from "@/store/store";
import {
  EntityRole,
  MESSAGE_TO_SIGN,
  SHINZO_PRECOMPILE_ADDRESS,
} from "@/lib/constants";
import { convertToHexIfNeeded } from "@/lib/utils";

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
  const { setUserRole, isRegistered } = useShinzoStore();

  const [formData, setFormData] = useState<FormData>({
    defraPublicKey: "",
    defraSignedMessage: "",
    peerId: "",
    peerSignedMessage: "",
    entity: EntityRole.Indexer,
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUserRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, entity: parseInt(value) }));
    setUserRole(formData.entity === EntityRole.Indexer ? "indexer" : "host");
  };

  // Handle successful transaction confirmation
  useEffect(() => {
    if (isConfirmed && txHash) {
      console.log("Transaction confirmed:", txHash);
      isRegistered(true);
    }
  }, [isConfirmed, txHash, isRegistered]);

  const sendRegisterTransaction = async () => {
    try {
      const data = encodeFunctionData({
        abi: REGISTER_TRANSACTION_ABI,
        functionName: "register",
        args: [
          convertToHexIfNeeded(formData.peerId),
          convertToHexIfNeeded(formData.peerSignedMessage),
          convertToHexIfNeeded(formData.defraPublicKey),
          convertToHexIfNeeded(formData.defraSignedMessage),
          stringToHex(MESSAGE_TO_SIGN),
          formData.entity,
        ],
      });

      await sendTransaction({
        to: SHINZO_PRECOMPILE_ADDRESS,
        data,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Transaction failed:", error.message);
      } else {
        console.error("Transaction failed:", error);
      }
      console.error("Transaction failed:", sendError);
    }
  };

  const isRegistrationDisabled: boolean = Boolean(
    !formData.defraPublicKey.trim() &&
      !formData.defraSignedMessage.trim() &&
      !formData.peerId.trim() &&
      !formData.peerSignedMessage.trim(),
  );

  return (
    <>
      <div className="min-h-screen bg-background flex items-start justify-center pt-20 p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl font-bold">Configuration</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Subtext on why we need this configuration information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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
                    onChange={(e) =>
                      handleInputChange(input.id, e.target.value)
                    }
                    className="min-h-[100px] font-mono text-sm"
                  />
                ) : (
                  <Input
                    id={input.id}
                    type="text"
                    value={formData[input.id as keyof FormData] as string}
                    onChange={(e) =>
                      handleInputChange(input.id, e.target.value)
                    }
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
          </CardContent>
        </Card>
      </div>
    </>
  );
}
