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
import { useStore } from "@tanstack/react-form"
import { Info, XIcon } from "lucide-react"
import { useState } from "react"
import { z } from "zod"
import { useAppForm } from "./forms/form-context"
import { Label } from "./ui/label"

const schema = z.object({
    network: z.string(),
})

const defaultFormValues: z.input<typeof schema> = {
    network: "",
}

export function DialogSuggest() {

    const formId = 'suggestRequest';

    const form = useAppForm({
        defaultValues: defaultFormValues,
        onSubmit: async ({ value }) => {
            try {
                setFormError(null);

                const body = JSON.stringify({
                    id: formId,
                    body: {
                        network: value.network,
                    },
                })

                const response = await fetch(`/api/submit`, { method: "POST", body, });

                if (!response.ok) throw new Error();
            } catch (error: unknown) {
                setFormError('Something went wrong. Please try again.');
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

                <DialogHeader>
                    <DialogTitle>/ Suggest a Network</DialogTitle>
                    <DialogDescription>
                        Let us know if you want to see a network added to Shinzō.
                    </DialogDescription>
                </DialogHeader>

                {isSubmitSuccessful ? (
                    <div className="pt-15 ">
                        <div className="richtext mb-10">
                            <h2 className="text-h4">Thanks for suggesting!</h2>
                            <p>Thanks for suggesting. We&apos;ll review it and get back to you soon.</p>
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
