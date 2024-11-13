export function parseBoolean(str: string, defaultIfInvalid: boolean | undefined = undefined) {

    const val =  ((str || '') + '').toLowerCase();

    if (val  === 'true')
        return true;

    if (val  === 'false')
        return false;

    return defaultIfInvalid;
}

export function isBoolean(value?: any) {

    return value === true || value === false;
}