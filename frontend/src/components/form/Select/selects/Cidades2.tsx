import { useCallback } from "react";
import { FormAsyncSelectProps, FormSelectAsync } from "../../FormSelectAsync";
import jsonData from '../../../../../estados_com_cidades.json';
import { FetchData, FetchDataArgs } from "../Async";
import { EstadoUFDisplay } from "@/components/domains/formulario/entidades";

export function Cidades2Select<TModel>({ estado, ...props }: EstadosSelectProps<TModel>) {
    console.log({ cidades2: estado })
    const loadCidadesSelect = useCallback((args: any) => loadCidades(estado)(args), [estado]);

    return <FormSelectAsync {...props} fetchData={loadCidadesSelect} />;
}

export interface EstadosSelectProps<TModel> extends Omit<FormAsyncSelectProps<TModel>, "fetchData"> {
    estado?: string | number;
}

export interface Estados {
    id: number;
    sigla: string;
    cidades: {
        id: number;
        nome: string;
    }[];
}

export interface Cidades {
    id: number;
    nome: string;
}

export const loadCidades: (estadoId?: string | number) => FetchData = (estadoId) => async ({ searchTerm }: FetchDataArgs) => {

    if (!estadoId)
        return []

    const url = `/select_cidades_estado/${EstadoUFDisplay[estadoId]}.json`;
    const response = await fetch(url);
    const estadoSelecionado = await response.json() as Cidades[];
    //console.log({ response: response, estadoSelecionado })

    if (estadoSelecionado) {
        const cidadesFiltradas = estadoSelecionado.filter(cidade =>
            cidade.nome.toLowerCase().includes(searchTerm?.toLowerCase() || "")
        );

        //console.log({ cidadesFiltradas })

        return cidadesFiltradas.map(cidade => ({
            value: cidade.id.toString(),
            label: cidade.nome,
        }));
    }

    return [];
};
