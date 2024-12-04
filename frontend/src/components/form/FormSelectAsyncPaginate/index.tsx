import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormLabel } from "../FormLabel";
import { FormError } from "../FormError";
import { SelectAsyncPaginate, SelectAsyncPaginateProps } from "../Select/AsyncPaginate";
import { SelectItem } from "../Select/AsyncPaginate";

export const FormSelectAsyncPaginate = <TModel,>({ label, isMulti, name, fetchRefresh, help, disabled, buttonFetchData, isSearchable, tags, isStatic, isClearable, onChange: onChangeProp, fetchData }: FormAsyncPaginateSelectProps<TModel>) => {
    const [selectKey, setSelectKey] = useState("FormSelectAsync");
    const [isLoading, setIsLoading] = useState(false);
    const context = useFormContext();
    const { control, getValues } = context;

    buttonFetchData ??= false;

    useEffect(() => setSelectKey(new Date().toString()), [fetchRefresh]);

    return (
        <>
            {label && <FormLabel name={name as string}>{label}</FormLabel>}
            {/*help && <FormInfo content={help} />*/}
            <div className="input-group flex-nowrap">
                <Controller
                    control={control}
                    name={name as string}
                    render={({ field: { value, onChange } }) => {

                        return <SelectAsyncPaginate
                            className="select2"
                            value={isMulti ? value?.map(v => v.toString()) : value?.toString()}
                            onChange={(options) => {
                                onChange({ type: '', target: { value: Array.isArray(options) ? options.map(x => x.value) : options?.value ?? '' } });
                                onChangeProp?.(options);
                            }}
                            fetchData={fetchData}
                            onFetchData={setIsLoading}
                            isSearchable={isSearchable}
                            key={fetchRefresh + selectKey}
                            disabled={disabled}
                            isClearable={isClearable}
                        />
                    }
                    }
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

export interface FormAsyncPaginateSelectProps<TModel> extends Pick<SelectAsyncPaginateProps, 'isMulti' | 'fetchData' | 'isSearchable' | 'isClearable'> {
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