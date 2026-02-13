"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useStore } from "@tanstack/react-form"
import { Info, XIcon } from "lucide-react"
import { useState } from "react"
import { z } from "zod"
import { useAppForm } from "../forms/form-context"
import { ConnectButton } from "./connect-button"
import { useAccount } from 'wagmi';
import type { Claim } from '@/payload/payload-types';

interface DialogIndexerProps {
    networkName: string
    chainId: number
    supported: boolean
    label?: string
}

const schema = z.object({
    network: z.number(),
    validatorAddress: z.string().min(1, "Validator Address is required"),
    signature: z.string().min(1, "Signature is required"),
    email: z.email(),
    domain: z.string(),
    socialMedia: z.array(z.object({
        platform: z.string(),
        link: z.string()
    }))
})

const defaultFormValues: z.input<typeof schema> = {
    network: 0,
    validatorAddress: "",
    signature: "",
    email: "",
    domain: "",
    socialMedia: [{ platform: "", link: "" }],
}

export function DialogIndexer({ networkName, chainId, supported, label = 'Become an Indexer' }: DialogIndexerProps) {
    const { address } = useAccount();

    const form = useAppForm({
        defaultValues: {
            ...defaultFormValues,
            network: chainId,
            validatorAddress: address as string,
        },
        onSubmit: async ({ value }) => {
            try {
                setFormError(null);

                const body = {
                    network: value.network,
                    validatorAddress: value.validatorAddress,
                    signature: value.signature,
                    email: value.email,
                    domain: value.domain,
                    socialMedia: value.socialMedia?.filter(entry => entry.platform || entry.link),
                } satisfies Omit<Claim, 'id' | 'updatedAt' | 'createdAt'>;

                const response = await fetch(`/api/claims`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                });

                if (!response.ok) {
                    const data: { errors: { message: string }[] } = await response.json();
                    const message = data?.errors?.[0]?.message;
                    throw new Error(message);
                }

            } catch (error: unknown) {
                if (error instanceof Error) {
                    setFormError(error.message || 'Something went wrong. Please try again.');
                }
                throw error;
            }
        },
        validators: {
            onSubmit: schema,
        }
    })

    const isSubmitting = useStore(form.store, (state) => state.isSubmitting);
    const isSubmitSuccessful = useStore(form.store, (state) => state.isSubmitSuccessful);
    const signature = useStore(form.store, (state) => state.values.signature);
    const [formError, setFormError] = useState<string | null>(null);

    const onOpenChange = (open: boolean) => {
        if (!open) {
            form.reset();
        }
    }

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!signature) {
            setFormError("Please sign the message.");
            return;
        }

        form.handleSubmit();
    }

    const handleWalletSuccess = (address: string, signature: string) => {
        form.setFieldValue("validatorAddress", address);
        form.setFieldValue("signature", signature);
    }

    const handleWalletDisconnect = () => {
        form.setFieldValue("validatorAddress", "");
        form.setFieldValue("signature", "");
    }

    return (
        <Dialog onOpenChange={onOpenChange}>

            <DialogTrigger asChild>
                <Button>{label}</Button>
            </DialogTrigger>

            <DialogContent
                className="max-w-[900px] w-dvw lg:px-30 lg:py-20"
                onPointerDownOutside={(e) => {
                    // Prevent closing when clicking on WalletConnect modal or other portaled elements
                    const target = e.target as HTMLElement;
                    if (target.closest('[data-radix-portal]') || target.closest('wcm-modal') || target.closest('w3m-modal')) {
                        e.preventDefault();
                    }
                }}
                onInteractOutside={(e) => {
                    // Also prevent on interact outside for WalletConnect modals
                    const target = e.target as HTMLElement;
                    if (target.closest('[data-radix-portal]') || target.closest('wcm-modal') || target.closest('w3m-modal')) {
                        e.preventDefault();
                    }
                }}
            >

                {!isSubmitSuccessful && (
                  <DialogHeader>
                      <DialogTitle>/ Become an Indexer of <span className="text-szo-primary">{`[`}</span>{networkName}<span className="text-szo-primary">{`]`}</span></DialogTitle>
                      <DialogDescription>
                          {supported ? (
                            <>Verify you&apos;re an active validator of {networkName} to become an indexer of this network. Connect the wallet tied to your validator pubkey&apos;s withdrawal address.</>
                          ) : (
                            <>Claim your spot as a validator of {networkName}. Connect the wallet tied to your validator pubkey&apos;s withdrawal address.</>
                          )}
                      </DialogDescription>
                  </DialogHeader>
                )}

                {isSubmitSuccessful ? (
                    <div className="pt-15 ">
                        <div className="richtext mb-10">
                            <h2 className="text-h4">We got it!</h2>
                            <p>Thanks for registering! Our team will review your claim and get back to you shortly.</p>
                        </div>

                        <DialogClose asChild>
                            <Button type="button" variant="outline">Close</Button>
                        </DialogClose>
                    </div>
                ) : (
                    <form onSubmit={onFormSubmit} noValidate>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-3">
                                <form.AppField name="signature">
                                    {() => null}
                                </form.AppField>

                                <form.AppField
                                    name="validatorAddress"
                                    validators={{
                                        onChange: (data) => {
                                            return data.value.split('Error: ')?.[1];
                                        },
                                    }}
                                >
                                    {({ TextField, handleChange }) => (
                                      <TextField
                                        label="Validator Address"
                                        placeholder="Connect wallet to fill"
                                        required
                                        disabled
                                        readonly
                                        endAdornment={(
                                              <ConnectButton
                                                signature={signature}
                                                onSuccess={handleWalletSuccess}
                                                onDisconnect={handleWalletDisconnect}
                                                onError={(err) => {
                                                    if (!err) return;
                                                    handleChange(`Error: ${err}`);
                                                }}
                                              />
                                        )}
                                      />
                                    )}
                                </form.AppField>
                            </div>
                            <div className="grid gap-3">
                                <form.AppField name="email" >
                                    {({ TextField }) => <TextField label="Email Address" placeholder="Email Address" required />}
                                </form.AppField>
                            </div>
                            <div className="grid gap-3">
                                <form.AppField name="domain" >
                                    {({ TextField }) => <TextField label="Domain" placeholder="Website" />}
                                </form.AppField>
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="email">Social Media</Label>
                                <form.AppField name="socialMedia" mode="array" >
                                    {(field) => {
                                        return (
                                            <div className="grid gap-3">
                                                {field.state.value?.map((_, index, items) => {
                                                    const numItems = items.length;
                                                    return (
                                                        <div key={index} className="flex items-center gap-3">
                                                            <form.AppField name={`socialMedia[${index}].platform`}>
                                                                {({ TextField }) => <TextField label={false} placeholder="Platform (eg. X, Telegram)" />}
                                                            </form.AppField>
                                                            <form.AppField name={`socialMedia[${index}].link`}>
                                                                {({ TextField }) => <TextField label={false} placeholder="Link or handle" />}
                                                            </form.AppField>

                                                            {numItems > 1 && (
                                                                <div className="shrink-0">
                                                                    <Button type="button" size="sm" variant="ghost" className="text-szo-primary" onClick={() => field.removeValue(index)} >
                                                                        <XIcon className="size-4" aria-label="Remove" />
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                })}

                                                <div className="flex justify-end mt-2 mb-5 relative isolate">
                                                    <div className="border-b border-szo-border-light absolute top-1/2 z-0 w-full" />
                                                    <Button type="button" size="sm" variant="outline" className="border-szo-black rounded-full text-xs font-mono z-1 relative mr-10" onClick={() => field.pushValue({ platform: "", link: "" })}>+ Add Social</Button>
                                                </div>
                                            </div>
                                        )
                                    }}
                                </form.AppField>

                                {formError && (
                                    <div className="text-szo-primary font-mono text-sm font-normal mt-2 flex items-center gap-2">
                                        <Info className="size-4" />
                                        {formError}
                                    </div>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit"}</Button>
                        </DialogFooter>
                    </form>
                )}

            </DialogContent>
        </Dialog >
    )
}
