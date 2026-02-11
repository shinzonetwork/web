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
import type { Suggestion } from "@/payload/payload-types"
import { useStore } from "@tanstack/react-form"
import { Info } from "lucide-react"
import { useState } from "react"
import { z } from "zod"
import { useAppForm } from "./forms/form-context"

/** don't allow the same browser to suggest networks twice with the help of LS */
const STORAGE_KEY = "shinzo_suggested_networks";
const getSubmittedNetworks = (): string[] => {
    if (typeof window === "undefined") return [];
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

const addSubmittedNetwork = (network: string): void => {
    if (typeof window === "undefined") return;
    try {
        const networks = getSubmittedNetworks();
        const normalized = network.toLowerCase().trim();
        if (!networks.includes(normalized)) {
            networks.push(normalized);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(networks));
        }
    } catch {
        // ignore localStorage errors
    }
};

const hasAlreadySubmitted = (network: string): boolean => {
    const networks = getSubmittedNetworks();
    return networks.includes(network.toLowerCase().trim());
};

const schema = z.object({
    network: z.string().min(1, "Network name is required"),
})

const defaultFormValues: z.input<typeof schema> = {
    network: "",
}

export function DialogSuggest() {
    const form = useAppForm({
        defaultValues: defaultFormValues,
        onSubmit: async ({ value }) => {
            try {
                setFormError(null);
                const networkName = value.network.toLowerCase().trim();

                // Check localStorage first
                if (hasAlreadySubmitted(networkName)) {
                    throw new Error("You have already suggested this network.");
                }

                const body = {
                    name: networkName,
                } satisfies Omit<Suggestion, 'id' | 'count' | 'updatedAt' | 'createdAt'>;

                const response = await fetch(`/api/suggestions`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                });

                if (!response.ok) {
                    const data: { errors: { message: string }[] } = await response.json();
                    const errorMessage = data?.errors?.[0]?.message;

                    // this error is specific to payload CMS implementation, meaning success not error
                    if (errorMessage === "SUGGESTION_INCREMENTED") {
                        addSubmittedNetwork(networkName);
                        return;
                    }

                    throw new Error(errorMessage);
                }

                // New suggestion created successfully
                addSubmittedNetwork(networkName);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setFormError(error.message || "Something went wrong. Please try again.");
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

    const onOpenChange = (open: boolean) => {
        if (!open) form.reset();
    }

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.handleSubmit();
    }

    return (
        <Dialog onOpenChange={onOpenChange}>

            <DialogTrigger asChild>
                <Button>Suggest a Network</Button>
            </DialogTrigger>

            <DialogContent className="max-w-[900px] w-dvw lg:px-30 lg:py-20">

                {!isSubmitSuccessful && (
                  <DialogHeader>
                      <DialogTitle>/ Suggest a Network</DialogTitle>
                      <DialogDescription>
                          Let us know if you want to see a network added to Shinzō.
                      </DialogDescription>
                  </DialogHeader>
                )}

                {isSubmitSuccessful ? (
                    <div className="pt-15 ">
                        <div className="richtext mb-10">
                            <h2 className="text-h4">Thanks for suggesting!</h2>
                            <p>We&apos;ll review it and get back to you soon.</p>
                        </div>

                        <DialogClose asChild>
                            <Button type="button" variant="outline">Close</Button>
                        </DialogClose>
                    </div>
                ) : (
                    <form onSubmit={onFormSubmit} noValidate>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-3">
                                <form.AppField name="network" >
                                    {({ TextField }) => <TextField label="Network" placeholder="Suggest a network" required />}
                                </form.AppField>
                            </div>

                            <div className="grid gap-3">
                                {formError && <div className="text-szo-primary font-mono text-sm font-normal mt-2 flex items-center gap-2">
                                    <Info className="size-4" />
                                    {formError}</div>}

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
