import { useCallback } from "react";
import { FormAsyncSelectProps, FormSelectAsync } from "../../FormSelectAsync";
import jsonData from '../../../../../estados_com_cidades.json'; // Importando o JSON com estados e cidades
import { FetchData, FetchDataArgs } from "../Async";

export function Cidades2Select<TModel>({ estado, ...props }: EstadosSelectProps<TModel>) {
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

export const loadCidades: (estadoId?: string | number) => FetchData = (estadoId) => async ({ searchTerm }: FetchDataArgs) => {
    const estados = jsonData as Estados[];

    const estadoSelecionado = estados.find(x => x.id === Number(estadoId));

    if (estadoSelecionado?.cidades) {
        const cidadesFiltradas = estadoSelecionado.cidades.filter(cidade =>
            cidade.nome.toLowerCase().includes(searchTerm?.toLowerCase() || "")
        );

        return cidadesFiltradas.map(cidade => ({
            value: cidade.id.toString(),
            label: cidade.nome,
        }));
    }

    return [];
};
