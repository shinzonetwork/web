"use client"

import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useFieldContext } from './form-context'

export function TextField({
    label,
    placeholder,
    type = "text",
    autoComplete,
    required
}: {
    label: string | boolean
    placeholder?: string
    type?: string
    autoComplete?: string
    required?: boolean
}) {
    const field = useFieldContext<string>();
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

    return (
        <Field data-invalid={isInvalid}>
            {label && <FieldLabel htmlFor={field.name}>
                {label}
                {required && <span className="text-szo-primary font-mono"> *</span>}
            </FieldLabel>}

            <Input
                id={field.name}
                name={field.name}
                type={type}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={isInvalid}
                placeholder={placeholder}
                autoComplete={autoComplete}
                required={required}
            />

            {isInvalid && (
                <FieldError errors={field.state.meta.errors} />
            )}
            
            {/* <pre> {JSON.stringify(field.state, null, 2)} </pre> */}
        </Field>
    )
}
