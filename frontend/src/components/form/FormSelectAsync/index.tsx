import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { SelectAsync, SelectAsyncProps } from "../Select/Async";
import { FormLabel } from "../FormLabel";
import { FormError } from "../FormError";
import { SelectItem } from "../Select/base";

export const FormSelectAsync = <TModel,>({ label, isMulti, name, fetchRefresh, help, disabled, buttonFetchData, isSearchable, tags, isStatic, isClearable, onChange: onChangeProp, fetchData }: FormAsyncSelectProps<TModel>) => {
    const [selectKey, setSelectKey] = useState(fetchRefresh ?? "FormSelectAsync");
    const [isLoading, setIsLoading] = useState(false);
    const context = useFormContext();
    const { control } = context;
    buttonFetchData ??= true;

    useEffect(() => {

        if (!fetchRefresh)
            return;

        if (fetchRefresh !== selectKey)
            setSelectKey(new Date().toString());

    }, [fetchRefresh]);
    //console.log({ refresh: selectKey })

    return (
        <>
            {label && <FormLabel name={name as string}>{label}</FormLabel>}
            <div className="input-group">
                <Controller
                    control={control}
                    name={name as string}
                    render={({ field: { value, onChange } }) => {

                        return <SelectAsync
                            className="select2"
                            value={isMulti ? value?.map(v => v.toString()) : value?.toString()}
                            onChange={(options) => {
                                onChange({ type: '', target: { value: Array.isArray(options) ? options.map(x => x.value) : options?.value ?? '' } });
                                onChangeProp?.(options);
                            }}
                            isStatic={isStatic}
                            isMulti={isMulti}
                            fetchData={fetchData}
                            onFetchData={setIsLoading}
                            isSearchable={isSearchable}
                            key={selectKey}
                            tags={tags}
                            disabled={disabled}
                            isClearable={isClearable}
                        />
                    }}
                />
                {buttonFetchData &&
                    <div className="input-group-append" style={{ zIndex: 0 }}>
                        <button name="refresh" className="btn btn-outline-secondary px-2 py-0" type="button" onClick={() => setSelectKey(new Date().toString())} disabled={disabled || isLoading} title="Atualizar"><i className="fas fa-sync"></i></button>
                    </div>
                }
            </div>
            <FormError name={name as string} />
        </>
    );
}

export interface FormAsyncSelectProps<TModel> extends Pick<SelectAsyncProps, 'isMulti' | 'fetchData' | 'isSearchable' | 'isClearable'> {
    label?: string;
    name: keyof TModel;
    help?: string;
    buttonFetchData?: boolean;
    tags?: boolean;
    disabled?: boolean;
    fetchRefresh?: string;
    isStatic?: boolean;
    onChange?: (options: SelectItem | SelectItem[] | undefined) => void;
}