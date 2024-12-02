import React, { useId, useMemo, useRef } from "react";
import { MultiValue, SingleValue } from "react-select";
import ReactSelect from "react-select";
import { getSelectStyles, getSelectStyles2, getSelectTheme } from "./style";
import { SelectItem, SelectItens } from "./base";

export function Select({ options, value, isMulti, className, tags, disabled, isSearchable, isClearable, onChange }: SelectProps) {
    const selectRef = useRef<any>();
    isClearable ??= true
    tags ??= false;
    className = (className ?? '') + (tags ? ' flag-has-tags' : '') + (isMulti ? ' flag-is-multi' : '');

    const styles = useMemo(() => getSelectStyles2(), []);

    const handleChange = (option: MultiValue<SelectItem> | SingleValue<SelectItem>) => {
        onChange?.(option as SelectItem[] ?? undefined);
    }

    const selectedOption = Array.isArray(value)
        ? options.filter(option => value.includes(option.value))
        : options.find(option => option.value === value);

    return (
        <ReactSelect
            isDisabled={disabled}
            hideSelectedOptions={false}
            className={className}
            ref={selectRef}
            onChange={handleChange}
            value={selectedOption ?? null}
            //theme={getSelectTheme}
            styles={styles}
            options={options}
            instanceId={useId()}
            isMulti={isMulti}
            menuPortalTarget={globalThis.document?.body}
            closeMenuOnSelect={!isMulti}
            placeholder="Selecionar..."
            isSearchable={isSearchable}
            isClearable={isClearable}
        />
    );
}

export interface SelectProps {
    options: SelectItem[];
    value?: string | string[];
    isMulti?: boolean;
    className?: string;
    tags?: boolean;
    disabled?: boolean;
    isSearchable?: boolean;
    isClearable?: boolean;
    onChange?: (options: SelectItens) => void;
}