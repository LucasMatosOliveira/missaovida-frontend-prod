import { useForm, FieldValues, UseFormProps, KeepStateOptions, useFormContext, DefaultValues, FieldPath, useFieldArray, UseFieldArrayProps, UseFieldArrayReturn, FieldArrayPath } from "react-hook-form";

export function useAppForm<TSchema extends FieldValues, TContext = any>(props?: UseFormProps<TSchema, TContext>) {
    const { reset, setValue, ...formMethods } = useForm<TSchema>(props);
    return {
        ...formMethods,
        reset: (values: DefaultValues<TSchema> | TSchema | ResetAction<TSchema> | undefined, options?: Omit<KeepStateOptions, 'keepDefaultValues'>) => reset(values, { ...options, keepDefaultValues: true,  }),
        clearValue: <TFieldName extends FieldPath<TSchema> = FieldPath<TSchema>>(name: TFieldName) => setValue(name, '' as any),
        setValue
    };
}

export function useAppFormContext<TSchema extends FieldValues>() {
    const { reset, ...formMethods } = useFormContext<TSchema>();
    return {
        ...formMethods,
        reset: (values: TSchema, options?: Omit<KeepStateOptions, 'keepDefaultValues'>) => reset(values, { ...options, keepDefaultValues: true })
    };
}

export function useAppFieldArray<TFieldValues extends FieldValues = FieldValues, TFieldArrayName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>, TKeyName extends string = 'id'>(props: UseFieldArrayProps<TFieldValues, TFieldArrayName, TKeyName>): UseFieldArrayReturn<TFieldValues, TFieldArrayName, TKeyName>{
    return useFieldArray<TFieldValues, TFieldArrayName, TKeyName>(props);
}

type ResetAction<TFieldValues> = (formValues: TFieldValues) => TFieldValues;