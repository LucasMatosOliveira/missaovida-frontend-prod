import { HTMLInputTypeAttribute, useState } from "react";
import { Controller } from "react-hook-form";
import { CurrencyInput } from 'react-currency-mask';
import { useAppFormContext } from "../hook";
import { obterValor } from "@/commom/primitives/object";
import { FormInfo } from "../FormInfo";

export const FormInputCurrency = <TModel,>({ label, name, disabled, help, step = "any", type }: FormInputProps<TModel>) => {
    const context = useAppFormContext();
    const { control, formState: { errors } } = context;
    const erro = obterValor(errors, name as string);
    const erroMessage = erro ? (Array.isArray(erro) ? erro[0].message : erro.message) : null;

    return (
        <>
            <label className={disabled ? 'text-gray-400' : erroMessage ? 'text-danger' : ''}>{label}</label>
            {help && <FormInfo content={help} />}
            <Controller
                name={name as string}
                control={control}
                render={({ field: { value = "", onChange } }) => (
                    <div className="relative">
                        <CurrencyInput
                            value={value}
                            onChangeValue={(_, value) => {
                                onChange(value);
                            }}
                            InputElement={<input className={`input-field ${erroMessage ? 'input-field-error' : ''}`} />}
                        />
                    </div>
                )}
            />
            {erroMessage && <div className="error-message">{erroMessage}</div>}
        </>
    );
};

export interface FormInputProps<TModel> {
    label?: string;
    name: keyof TModel;
    type?: HTMLInputTypeAttribute;
    transform?: "uppercase" | "lowercase" | "none";
    help?: string;
    disabled?: boolean;
    step?: string;
}
