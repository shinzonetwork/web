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
    email: z.email(),
    socialMedia: z.array(z.object({
        platform: z.string(),
        link: z.string()
    }))
})

const defaultFormValues: z.input<typeof schema> = {
    network: "",
    email: "",
    socialMedia: [{ platform: "", link: "" }],
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
                        email: value.email,
                        socials: value.socialMedia?.map(entry => `${entry.platform}: ${entry.link}`).join(", "),
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
                                <form.AppField name="email" >
                                    {({ TextField }) => <TextField label="Email Address" placeholder="Email Address" required />}
                                </form.AppField>
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="email">Social Media</Label>
                                <form.AppField name="socialMedia" mode="array" >
                                    {(field) => {
                                        return (
                                            <div className="grid gap-3">
                                                {field.state.value?.map((entry, index, items) => {
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
