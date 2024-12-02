import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { GroupBase, InputActionMeta, MultiValue, SelectInstance, SingleValue } from "react-select";
import { AsyncPaginate } from 'react-select-async-paginate';
import { getSelectStyles, getSelectStyles2, getSelectTheme } from "../style";

import { ChevronDown, Dropdown, SelectButton } from "./utils";

export function isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
}

export class ResultadoPaginado<T = any> {
    page: number = undefined!;
    per_page: number = undefined!;
    total: number = undefined!;
    data: T[] = undefined!;

    public static isType(obj: any): obj is ResultadoPaginado {

        return obj.totalRegistros !== undefined;
    }
}


export const PRIMEIRA_PAGINA = 1;
const PAGE_LIMIT = 50;
const MIN_CHARS = 2;

export function SelectAsyncPaginate({ value, isMulti, className, isSearchable, disabled, tags, isStatic, isClearable, onFetchData, onChange, fetchData
}: SelectAsyncPaginateProps) {
    const [selectedOption, setSelectedOption] = useState<SelectItem | SelectItem[]>();
    const [options, setOptions] = useState<SelectItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [pagina, setPagina] = useState(PRIMEIRA_PAGINA);
    const instanceId = useId();
    const selectRef = useRef<SelectInstance<SelectItem, boolean, GroupBase<SelectItem>> | undefined>();

    const selectedOptionList = selectedOption ? (Array.isArray(selectedOption) ? selectedOption : [selectedOption]) : [];

    isClearable ??= true;
    isStatic ??= false;
    tags ??= false;
    className = (className ?? '') + (tags ? ' flag-has-tags' : '') + (isMulti ? ' flag-is-multi' : '') + ' flag-is-paginate';

    const styles = useMemo(() => getSelectStyles2(), []);

    const handleChange = (option: MultiValue<SelectItem> | SingleValue<SelectItem>) => {

        onChange(option as SelectItem[] ?? undefined);

    };

    const mergeWithCurrentOptions = (newOptions: SelectItem[]) => {
        const allOptions = [...options];
        for (const option of newOptions) {
            if (!allOptions.some(x => x.value === option.value))
                allOptions.push(option);
        }

        return allOptions;
    }

    const handleInputChange = (value: string, action: InputActionMeta) => {
        if (action.action === "input-change" || action.action === "menu-close") {
            setSearchTerm(value);
            setPagina(PRIMEIRA_PAGINA);
            if (selectedOption) {
                setOptions(selectedOptionList);
            }
        }

        if (action.action === "set-value") {
            return searchTerm;
        }

        return value;
    };

    const handleLoadData = async (inputValue: string) => {
        setSearchTerm(inputValue);
        if (inputValue.length < MIN_CHARS) {
            return { options: [] };
        }
        setIsLoading(true);
        onFetchData?.(true);
        try {
            const response = await fetchData({ searchTerm: inputValue.toUpperCase(), pagina: pagina, limite: PAGE_LIMIT });
            setPagina(pagina + 1);
            setOptions(mergeWithCurrentOptions(response.data));
            return {
                options: response.data,
                hasMore: response.total > ((response.page + 1) * response.per_page),
                additional: {
                    page: undefined!
                }
            };
        } finally {
            setIsLoading(false);
            onFetchData?.(false);
        }
    };

    useEffect(() => {
        if (!isStatic)
            return;

        (async () => {
            const result = await fetchData({ pagina: PRIMEIRA_PAGINA, limite: PAGE_LIMIT });
            setOptions(result.data);
        })();

    }, [isStatic]);

    useEffect(() => {
        if (isMulti) {
            setSelectedOption(options.filter(option => value?.includes(option.value)));
        } else {
            setSelectedOption(options.find(option => value === option.value));
        }
    }, [value, options]);

    useEffect(() => {
        if (!value) return;

        const values = Array.isArray(value) ? value : [value];

        const missingValues = values.filter(x => !options.some(y => y.value === x));
        console.log({ values, missingValues })
        if (!missingValues.length) return;

        (async () => {
            const result = await fetchData({
                pagina: PRIMEIRA_PAGINA,
                limite: missingValues.length,
                ids: missingValues
            });
            console.log({ result })
            setOptions(mergeWithCurrentOptions(result.data));
        })();

    }, [value]);

    return (
        <AsyncPaginate
            selectRef={selectRef as any}
            isClearable={isClearable}
            defaultOptions
            loadOptions={handleLoadData}
            className={className}
            value={selectedOption}
            isDisabled={disabled}
            closeMenuOnSelect={!isMulti}
            placeholder="Selecione..."
            hideSelectedOptions={false}
            controlShouldRenderValue={true}
            isSearchable={isSearchable}
            //components={{ ...components, IndicatorSeparator: null }}
            isLoading={isLoading}
            onChange={handleChange}
            //theme={getSelectTheme}
            styles={styles}
            instanceId={instanceId}
            isMulti={isMulti}
            menuPortalTarget={globalThis.document?.body}
            debounceTimeout={300}
            noOptionsMessage={() => null}
            onInputChange={handleInputChange}
            blurInputOnSelect={false}
            tabSelectsValue={false}
            openMenuOnClick={true}
            inputValue={searchTerm}
            additional={{
                page: PRIMEIRA_PAGINA
            }}
            backspaceRemovesValue={false}
        />

    )
}


export interface SelectAsyncPaginateProps {
    value?: string | string[];
    isMulti?: boolean;
    className?: string;
    isSearchable?: boolean;
    tags?: boolean;
    disabled?: boolean;
    isStatic?: boolean;
    isClearable?: boolean;
    onChange: (value: SelectItem | SelectItem[] | undefined) => void;
    fetchData: FetchDataPaginate;
    onFetchData?: (isLoading: boolean) => void;
}

export interface FetchDataPaginateArgs {
    pagina?: number;
    limite?: number;
    searchTerm?: string;
    ids?: string[]
}

export interface FetchDataPaginate {
    (args: FetchDataPaginateArgs): Promise<ResultadoPaginado<SelectItem>>;
}


export interface SelectItem {
    value: string;
    label: string;
}

export type SelectItens = SelectItem | SelectItem[] | undefined;

export type SelectItemOptional = SelectItem | undefined;

export function CheckOptionType(option: MultiValue<SelectItem> | SingleValue<SelectItem>): option is SingleValue<SelectItem> {
    return (option as SingleValue<SelectItem>)?.value != undefined;
}