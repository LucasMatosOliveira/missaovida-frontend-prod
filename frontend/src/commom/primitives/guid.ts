export function createFakeTempGUID(startSeq: number = 0) {
    const guidMask = 'FAKE0000-FAKE-FAKE-FAKE-0000000';
    let current = startSeq;

    function next() {
        current++;

        if (current.toString().length > 5) {
            throw new Error('Limite de IDs atingido');
        }

        const seq = current.toString().padStart(5, '0');
        return guidMask + seq;
    }

    function isFake(id: string) {
        return id.startsWith(guidMask);
    }

    return {
        next,
        isFake
    };
}
