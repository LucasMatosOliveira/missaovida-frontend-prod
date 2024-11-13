export const obterValor = (objeto: any, campo: string) => {
    if (!objeto)
        return null;

    let valor = objeto;
    campo.split('.').forEach((c) => {

        if (valor === undefined || valor === null)
            return false;

        const matchArray = /(\w+)\[(\d+)\]/i.exec(c);

        if (matchArray != null) {
            const campo = matchArray[1];
            const index = matchArray[2];
            valor = valor[campo][index];
        }
        else {
            valor = valor[c];
        }
    });

    if (valor === objeto)
        return null;
    else
        return valor;
};
