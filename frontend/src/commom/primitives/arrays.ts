export function sortAscCriterio<T = string | number | boolean>(a: T, b: T, segundoCriterio?: () => number): number {

    return a < b ? -1 : (a > b ? 1 : segundoCriterio ? segundoCriterio() : 0);
}