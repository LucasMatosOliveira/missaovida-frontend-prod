import { MultiValue, SingleValue } from "react-select";
export interface SelectItem {
    value: string;
    label: string;
}

export type SelectItens = SelectItem | SelectItem[] | undefined;

export type SelectItemOptional = SelectItem | undefined;

export function CheckOptionType(option: MultiValue<SelectItem> | SingleValue<SelectItem>): option is SingleValue<SelectItem> {
    return (option as SingleValue<SelectItem>)?.value != undefined;
}