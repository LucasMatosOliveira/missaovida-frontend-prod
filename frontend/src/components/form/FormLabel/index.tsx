import { obterValor } from "@/commom/primitives/object";
import { LabelHTMLAttributes, PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";
import { cloneAndAddClass } from "..";
import { useAppFormContext } from "../hook";

export function FormLabel({name, children, className, ...props}: FormLabelProps) {
    const context = useAppFormContext();
    const {formState: {errors}} = context;
    const error = obterValor(errors, name);
    const errorMessage = error? Array.isArray(error) ? error[0] : error.message : null;

    return <label {...props} className={cloneAndAddClass(className,` ${error ? 'text-danger' : ''}`)}>{children}</label>
}

export interface FormLabelProps extends PropsWithChildren, LabelHTMLAttributes<HTMLLabelElement> {
    name: string;
}