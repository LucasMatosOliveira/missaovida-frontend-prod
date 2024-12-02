import { useMemo } from "react";
import { FormSelect, FormSelectProps } from "@/components/form/FormSelect";
import { criarListaDeEnumDisplayReact } from "@/commom/primitives/enum";
import { EstadoUF, EstadoUFDisplay } from "@/components/domains/formulario/entidades"

export function EstadosSelect<TModel>({ filtro, ...props }: EstadosSelectProps<TModel>) {
    const estadosOptions = useMemo(() => {
        const estados = criarListaDeEnumDisplayReact(EstadoUFDisplay);
        return filtro ? estados.filter(item => filtro(Number(item.value))) : estados;
    }, [filtro]);

    return (
        <FormSelect {...props} options={estadosOptions} />
    );
}

export interface EstadosSelectProps<TModel> extends Omit<FormSelectProps<TModel>, 'options'> {
    filtro?: (uf: EstadoUF) => boolean;
}