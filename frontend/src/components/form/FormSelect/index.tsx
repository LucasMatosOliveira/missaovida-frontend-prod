import { ReactNode, useEffect } from "react";
import { Controller, useController, useFormContext } from "react-hook-form";

import { Select, SelectProps } from "../Select";
import { FormError } from "../FormError";
import { FormLabel } from "../FormLabel";
import { SelectItens } from "../Select/base";
import { obterValor } from "@/commom/primitives/object";
import { isNullOrEmpty } from "@/commom/primitives/strings";

export const FormSelect = <TModel,>({ label, options, isMulti, name, help, tags, disabled, isSearchable, isClearable, onChange: onChangeProp, onChanging }: FormSelectProps<TModel>) => {
    const context = useFormContext();
    const { control, getValues, setValue } = context;

    useEffect(() => {
        const values = getValues();
        const value = obterValor(values, name as string);

        if (isNullOrEmpty(value))
            return;

        if (Array.isArray(value)) {

            const newValue = value.filter(x => options.some(op => op.value === x.toString()));

            if (value.length !== newValue.length)
                setValue(name as string, newValue.length > 0 ? newValue : undefined);
        }
        else {

            if (!options.some(op => op.value === value.toString())) {
                setValue(name as string, undefined);
            }
        }

    }, [options]);

    return (
        <>
            {label && <FormLabel name={name as string}>{label}</FormLabel>}
            <Controller
                control={control}
                name={name as string}
                render={({ field: { value, onChange } }) => {

                    return <Select
                        options={options}
                        value={isMulti ? value?.map(v => v.toString()) : value?.toString()}
                        onChange={(options) => {
                            const change = onChanging?.(options);
                            if (change === false)
                                return;

                            onChange({ target: { value: Array.isArray(options) ? options.map(x => x.value) : options?.value ?? '' } });
                            onChangeProp?.(options);
                        }}
                        isMulti={isMulti}
                        tags={tags}
                        disabled={disabled}
                        isSearchable={isSearchable}
                        isClearable={isClearable}
                    />
                }
                }
            />
            <FormError name={name as string} />
        </>
    );
}

export interface FormSelectProps<TModel> extends Pick<SelectProps, 'isMulti' | 'options' | 'onChange' | 'isClearable'> {
    label?: string;
    name: keyof TModel;
    help?: ReactNode;
    tags?: boolean
    disabled?: boolean;
    isSearchable?: boolean;
    onChanging?: (options: SelectItens) => boolean;
}