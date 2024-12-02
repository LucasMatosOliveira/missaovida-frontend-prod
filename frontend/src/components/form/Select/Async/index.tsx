import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import ReactSelect, { GroupBase, InputActionMeta, MultiValue, SelectInstance, SingleValue } from "react-select";
import AsyncSelect from "react-select/async";
import { getSelectStyles } from "../style";
import { SelectItem } from "../base";
import { getSelectStyles2 } from "../style";

export function SelectAsync({ value, isMulti, className, isSearchable, disabled, tags, isStatic, isClearable, onFetchData, onChange, fetchData }: SelectAsyncProps) {
    const [selectedOption, setSelectedOption] = useState<SelectItem | SelectItem[]>();
    const [options, setOptions] = useState<SelectItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [key, setKey] = useState('InitialKey')
    const instanceId = useId();
    const selectRef = useRef<SelectInstance<SelectItem, boolean, GroupBase<SelectItem>> | undefined>();

    isClearable ??= true;
    isStatic ??= true;
    tags ??= false;
    className = (className ?? '') + (tags ? ' flag-has-tags' : '') + (isMulti ? ' flag-is-multi' : '');

    const styles = useMemo(() => getSelectStyles2(), [tags]);


    const handleChange = (option: MultiValue<SelectItem> | SingleValue<SelectItem>) => {
        onChange(option as SelectItem[] ?? undefined);
        setInputValue('');
    }

    const handleLoadData = async (searchTerm: string) => {
        let result: SelectItem[] = [];
        setIsLoading(true);
        onFetchData?.(true);
        try {
            result = await fetchData({ searchTerm });
            setOptions(result);
        } finally {
            setIsLoading(false);
            onFetchData?.(false);
        }
        return result;
    }

    const loadData = async () => {
        const result = await fetchData({});
        setOptions(result);
    }

    const inputValueChange = (value: string, action: InputActionMeta) => {
        if (action.action === "input-change") {
            setInputValue(value.toUpperCase());
        }

        if (action.action === "set-value") {
            return inputValue.toUpperCase();
        }

        if (action.action === "menu-close") {
            return action.prevInputValue.toUpperCase();
        }
    }

    const filterOption = (option: FilterOptionOption<SelectItem>, inputValue: string) => {
        return option.label.toUpperCase().includes(inputValue);
    }

    useEffect(() => {
        if (!isStatic)
            return;

        loadData()

    }, [isStatic]);

    useEffect(() => {
        if (isMulti) {
            setSelectedOption(options.filter(option => value?.includes(option.value)));
        } else {
            setSelectedOption(options.find(option => value === option.value));
        }
    }, [value, options]);

    if (isStatic) {
        return (
            <>
                <ReactSelect
                    filterOption={filterOption}
                    isDisabled={disabled}
                    isClearable={isClearable}
                    options={options}
                    ref={selectRef as any}
                    className={className}
                    value={selectedOption}
                    onChange={handleChange}
                    styles={styles}
                    instanceId={instanceId}
                    isMulti={isMulti}
                    menuPortalTarget={globalThis.document?.body}
                    closeMenuOnSelect={!isMulti}
                    hideSelectedOptions={false}
                    placeholder="Selecionar..."
                    isSearchable={isSearchable}
                    inputValue={inputValue}
                    onInputChange={inputValueChange}
                    onMenuClose={() => setInputValue('')}
                />
            </>
        );
    }

    return (
        <>
            <AsyncSelect
                key={key}
                isDisabled={disabled}
                isClearable={isClearable}
                loadOptions={handleLoadData}
                defaultOptions
                cacheOptions
                ref={selectRef as any}
                className={className}
                value={selectedOption}
                isLoading={isLoading}
                onChange={handleChange}
                styles={styles}
                instanceId={instanceId}
                isMulti={isMulti}
                menuPortalTarget={globalThis.document?.body}
                closeMenuOnSelect={!isMulti}
                placeholder="Selecionar..."
                hideSelectedOptions={false}
                isSearchable={isSearchable}
                blurInputOnSelect={false}
                tabSelectsValue={false}
                inputValue={inputValue}
                onMenuClose={() => { setInputValue(''); setKey(new Date().toISOString()) }}
                backspaceRemovesValue={false}
                onInputChange={inputValueChange}
            />
        </>
    );
}

export interface SelectAsyncProps {
    value?: string | string[];
    isMulti?: boolean;
    className?: string;
    isSearchable?: boolean;
    tags?: boolean;
    disabled?: boolean;
    isStatic?: boolean;
    isClearable?: boolean;
    onChange: (value: SelectItem | SelectItem[] | undefined) => void;
    fetchData: FetchData;
    onFetchData?: (isLoading: boolean) => void;
}

export interface FetchDataArgs {
    pagina?: number;
    limite?: number;
    searchTerm?: string;
}

export interface FetchData {
    (args: FetchDataArgs): Promise<SelectItem[]>;
}

export interface FilterOptionOption<Option> {
    readonly label: string;
    readonly value: string;
    readonly data: Option;
}