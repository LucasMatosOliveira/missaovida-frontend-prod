import { obterValor } from "@/commom/primitives/object";
import { useFormContext } from "react-hook-form";
import { useAppFormContext } from "../hook";

export function FormError({name}: FormErrorProps) {
    const context = useAppFormContext();
    const {formState: {errors}} = context;
    const error = obterValor(errors, name);
    const errorMessage = error? Array.isArray(error) ? error[0] : error.message : null;

    return <div className="form-control-feedback error-message">{errorMessage}</div>
}

export interface FormErrorProps {
    name: string;
}