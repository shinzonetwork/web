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

interface DialogGeneratorInterestProps {
    networkName: string
    chainId: number
    label?: string
}

const schema = z.object({
    network: z.number(),
    name: z.string().min(1, "Name is required"),
    email: z.email(),
    domain: z.string(),
    otherChains: z.string(),
    socialMedia: z.array(z.object({
        platform: z.string(),
        link: z.string()
    }))
})

const defaultFormValues: z.input<typeof schema> = {
    network: 0,
    name: "",
    email: "",
    domain: "",
    otherChains: "",
    socialMedia: [{ platform: "", link: "" }],
}

export function DialogGeneratorInterest({ networkName, chainId, label = 'Become a Generator' }: DialogGeneratorInterestProps) {
    const form = useAppForm({
        defaultValues: {
            ...defaultFormValues,
            network: chainId,
        },
        onSubmit: async ({ value }) => {
            try {
                setFormError(null);

                const body = {
                    network: value.network,
                    name: value.name,
                    email: value.email,
                    domain: value.domain,
                    otherChains: value.otherChains,
                    socialMedia: value.socialMedia?.filter(entry => entry.platform || entry.link),
                };

                const response = await fetch(`/api/register-interest`, {
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

                const data: { emailSent: boolean } = await response.json();
                setEmailSent(data.emailSent);

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
    const [formError, setFormError] = useState<string | null>(null);
    const [emailSent, setEmailSent] = useState(false);

    const onOpenChange = (open: boolean) => {
        if (!open) {
            form.reset();
        }
    }

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.handleSubmit();
    }

    return (
        <Dialog onOpenChange={onOpenChange}>

            <DialogTrigger asChild>
                <Button>{label}</Button>
            </DialogTrigger>

            <DialogContent className="max-w-[900px] w-dvw lg:px-30 lg:py-20">

                {!isSubmitSuccessful && (
                  <DialogHeader>
                      <DialogTitle>/ Become a Generator of <span className="text-szo-primary">{`[`}</span>{networkName}<span className="text-szo-primary">{`]`}</span></DialogTitle>
                      <DialogDescription>
                          Register your interest in becoming a Generator for {networkName}. <br />We&apos;ll notify you as soon as support is added.
                      </DialogDescription>
                      <p className="text-left text-xs text-text-secondary font-mono pt-4">You&apos;ll receive a confirmation email to verify your address.</p>
                  </DialogHeader>
                )}

                {isSubmitSuccessful ? (
                    <div className="pt-15 ">
                        <div className="richtext mb-10">
                            <h2 className="text-h4">Thank you, we&apos;ve received your interest.</h2>
                            {emailSent ? (
                                <p>We&apos;ve sent a confirmation email. Please check your inbox to complete your sign up.</p>
                            ) : (
                                <p>Thanks for registering your interest. We&apos;ll be in touch when support is added.</p>
                            )}
                        </div>

                        <DialogClose asChild>
                            <Button type="button" variant="outline">Close</Button>
                        </DialogClose>
                    </div>
                ) : (
                    <form onSubmit={onFormSubmit} noValidate>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-3">
                                <form.AppField name="name">
                                    {({ TextField }) => <TextField label="Name" placeholder="Your name" required />}
                                </form.AppField>
                            </div>
                            <div className="grid gap-3">
                                <form.AppField name="email" >
                                    {({ TextField }) => <TextField label="Email Address" placeholder="Email Address" required />}
                                </form.AppField>
                            </div>
                            <div className="grid gap-3">
                                <form.AppField name="domain" >
                                    {({ TextField }) => <TextField label="Organisation / Domain" placeholder="Your organisation or website" />}
                                </form.AppField>
                            </div>
                            <div className="grid gap-3">
                                <form.AppField name="otherChains">
                                    {({ TextField }) => <TextField label="Other chains you secure?" placeholder="e.g. Ethereum, Solana, Avalanche" />}
                                </form.AppField>
                            </div>

                            <div className="grid gap-3">
                                <Label>Social Media</Label>
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
