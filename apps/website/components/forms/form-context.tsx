import { createFormHookContexts, createFormHook } from '@tanstack/react-form'
import { TextField } from './text-field'

// export useFieldContext for use in your custom components
export const { fieldContext, formContext, useFieldContext } =
    createFormHookContexts()

const { useAppForm } = createFormHook({
    fieldContext,
    formContext,
    // We'll learn more about these options later
    fieldComponents: {
        TextField,
    },
    formComponents: {},
})

export { useAppForm };