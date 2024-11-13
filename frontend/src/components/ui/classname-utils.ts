export function concatClassNames(...classeNames: (string | undefined)[]) {
    return classeNames.filter(cl => cl).join(' ');
}