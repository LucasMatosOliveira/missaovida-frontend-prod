import { sortAscCriterio } from "./arrays";

export function criarListaDeEnumDisplay(enumDisplay: Record<string, any>, valueType?: 'number', sort?: boolean, include?: (value: string) => boolean): { value: number, text: string }[];
export function criarListaDeEnumDisplay(enumDisplay: Record<string, any>, valueType: 'string', sort?: boolean, include?: (value: string) => boolean): { value: string, text: string }[];
export function criarListaDeEnumDisplay(enumDisplay: Record<string, any>, valueType: 'string' | 'number' = 'number', sort: boolean = true, include?: (value: string) => boolean) {

    const pairs: {
        value: string | number,
        text: string
    }[] = [];
    for (let value in enumDisplay) {

        if (include && !include(value))
            continue;

        if (valueType === 'number')
            pairs.push({ value: parseInt(value), text: enumDisplay[value] });
        else
            pairs.push({ value: value, text: enumDisplay[value] });
    }

    if (sort)
        return pairs.sort((a, b) => sortAscCriterio(a.text, b.text));

    return pairs;
}

export function criarListaDeEnumDisplayReact(enumDisplay: Record<string, any>, isNumber: boolean = true) {
    return criarListaDeEnumDisplay(enumDisplay, isNumber ? 'number' : 'string' as any).map(item => ({
        value: item.value.toString(),
        label: item.text
    }))
}