import { useCallback } from "react";
import { FormAsyncPaginateSelectProps, FormSelectAsyncPaginate } from "../../FormSelectAsyncPaginate";
import { FetchDataPaginate, SelectItem } from "../AsyncPaginate";

export function CidadesSelect<TModel,>({ estado, ...props }: ParticipantesSelectProps<TModel>) {

    const getCidades = useCallback((args: any) => loadCidades({ estado })(args), [estado]);
    return (
        <FormSelectAsyncPaginate {...props} fetchData={getCidades} />
    );
}

export interface ParticipantesSelectProps<TModel> extends Omit<FormAsyncPaginateSelectProps<TModel>, "fetchData"> {
    estado?: string;
}

export const loadCidades: (args: LoadCidades) => FetchDataPaginate = ({ estado }) => async ({ limite, pagina, searchTerm }) => {

    if (!estado || estado?.length === 1) {
        return {
            page: 1,
            per_page: 10,
            total: 0,
            data: [] as SelectItem[]
        };
    }
    try {

        let body = {
            estado,
            page: pagina,
            per_page: limite,
            searchInput: ''
        };

        if (searchTerm)
            body = {
                ...body,
                searchInput: searchTerm
            }

        const response = await fetch('https://paginateestadosibge.fly.dev/cidades', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(body),
        });


        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const data = await response.json();


        return {
            page: data.page,
            per_page: data.per_page,
            total: data.total,
            data: data.data.map((item: { id: number, nome: string }) => ({
                value: item.id,
                label: item.nome
            }))
        };
    } catch (error) {

        console.error("Erro ao consumir a API:", error);
        return {
            page: 1,
            per_page: 10,
            total: 0,
            data: [] as SelectItem[]
        };
    }
}

export interface LoadCidades {
    estado?: string;
}

export interface Cidades {
    id: string;
    nome: string;
}