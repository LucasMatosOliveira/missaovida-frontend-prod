import React, { Ref, useRef } from "react";
import { ReactNode, TextareaHTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormInfo } from "../FormInfo";
import { obterValor } from "@/commom/primitives/object";


export const FormTextArea = <TModel,>({ label, name, help, textAreaRef, ...props }: FormTextAreaProps<TModel>) => {

    const context = useFormContext();
    const { control, formState: { errors } } = context;
    const erro = obterValor(errors, name as string);
    const erroMessage = erro ? Array.isArray(erro) ? erro[0].message : erro.message : null;

    const labelComp = typeof label === 'function'
        ? label({ className: erroMessage ? 'text-danger' : '' }) :
        <label className={erroMessage ? 'text-danger' : ''}>{label}</label>;

    return (
        <>
            {labelComp}
            {help && <FormInfo content={help} />}
            <Controller
                name={name as string}
                control={control}
                render={({ field: { value, onChange } }) => (
                    <textarea
                        {...props}
                        ref={textAreaRef}
                        value={value}
                        onChange={(event) => onChange(event.target.value)}
                        className={`form-control form-control-sm noupper ${erroMessage ? 'form-control-error' : ''}`}
                    />
                )}
            />
            {erroMessage && <div className="form-control-feedback error-message">{erroMessage}</div>}
        </>
    )
}

export interface FormTextAreaProps<TModel> extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> {
    label: string | ((props: TextareaHTMLAttributes<HTMLLabelElement>) => ReactNode);
    name: keyof TModel;
    help?: ReactNode;
    textAreaRef?: Ref<HTMLTextAreaElement>;
}
