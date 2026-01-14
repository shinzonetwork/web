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
import { XIcon } from "lucide-react"
import { z } from "zod"
import { useAppForm } from "./forms/form-context"

interface DialogIndexerProps {
    networkName: string
}

interface SocialMediaEntry {
    platform?: string
    link?: string
}

const formSchema = z.object({
    validatorAddress: z.string().min(1, "Validator Public Key is required"),
    email: z.email(),
    domain: z.string(),
    socialMedia: z.array(z.object({
        platform: z.string(),
        link: z.string()
    }))
})

const defaultFormValues: {
    validatorAddress: string
    email?: string
    domain?: string
    socialMedia?: Array<SocialMediaEntry>
} = {
    validatorAddress: "",
    email: "",
    domain: "",
    socialMedia: [{ platform: "", link: "" }],
}

export function DialogIndexer({ networkName }: DialogIndexerProps) {

    const form = useAppForm({
        defaultValues: defaultFormValues,
        onSubmit: async ({ value }) => {
            console.log(value);
        },
        validators: {
            onSubmit: formSchema,
        }
    })

    const isSubmitting = useStore(form.store, (state) => state.isSubmitting);
    const isSubmitSuccessful = useStore(form.store, (state) => state.isSubmitSuccessful);

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
                <Button>Become an Indexer</Button>
            </DialogTrigger>

            <DialogContent className="max-w-[900px] w-dvw lg:px-30 lg:py-20">

                <DialogHeader>
                    <DialogTitle>/ Become an Indexer</DialogTitle>
                    <DialogDescription>
                        Verify you're an active validator of {networkName} to become an indexer of this network.
                    </DialogDescription>
                </DialogHeader>

                {isSubmitSuccessful ? (
                    <div className="pt-15 ">
                        <div className="richtext mb-10">
                            <h2 className="text-h4">We got it!</h2>
                            <p>Thanks for registering. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id venenatis metus. Proin sagittis vehicula volutpat.</p>
                        </div>

                        <pre className="text-px-12"> {JSON.stringify(form.state.values, null, 2)} </pre>

                        <DialogClose asChild>
                            <Button type="button" variant="outline">Close</Button>
                        </DialogClose>
                    </div>
                ) : (
                    <form onSubmit={onFormSubmit} noValidate>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-3">
                                <form.AppField name="validatorAddress" children={({ TextField }) =>
                                    <TextField label="Ethereum Validator Public Key" placeholder="0x..." required />
                                } />
                            </div>
                            <div className="grid gap-3">
                                <form.AppField name="email" children={({ TextField }) =>
                                    <TextField label="Email Address" placeholder="Email Address" required />
                                } />
                            </div>
                            <div className="grid gap-3">
                                <form.AppField name="domain" children={({ TextField }) =>
                                    <TextField label="Domain" placeholder="Website" />
                                } />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="email">Social Media</Label>
                                <form.AppField name="socialMedia" mode="array" children={(field) => {
                                    return (
                                        <div className="grid gap-3">
                                            {field.state.value?.map((entry, index, items) => {
                                                const numItems = items.length;
                                                return (
                                                    <div key={index} className="flex items-center gap-3">
                                                        <form.AppField name={`socialMedia[${index}].platform`} children={({ TextField }) => <TextField label={false} placeholder="Platform (eg. X, Telegram)" />} />
                                                        <form.AppField name={`socialMedia[${index}].link`} children={({ TextField }) => <TextField label={false} placeholder="Link or handle" />} />

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
                                }} />
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
