import { Interno, InternoReturn } from "./entidades";

export class InternosApi {

    private _url: string;
    private _postUrl: string;

    constructor() {
        this._url = "http://189.126.111.132:8001/api/Acolhidos";
        this._postUrl = "http://189.126.111.132:8001/api/Acolhido";
    }

    public async getInternoPorId(id: string, token: string): Promise<Partial<Interno>> {
        const url = this._postUrl.concat(`/${id}`);
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        return data;
    }

    public async getInternos(): Promise<Interno[]> {
        const response = await fetch(this._url);
        const data = await response.json();
        return data;
    }

    public async inserir(dados: Interno, token: string): Promise<Interno> {

        const response = await fetch(this._postUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (!response.ok) {
            console.log({ response });
            const data = await response.json();
            console.log(data);
        }

        const data = await response.json();
        console.log(data);
        return data;
    }

    public async alterar(id: string, dados: Interno, token: string): Promise<Interno> {
        console.log({ token, dados })

        const response = await fetch(this._postUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        const data = await response.json();
        if (!response.ok) {
            console.log({ data });
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }
        console.log({ data, response });
        return data;
    }

    public async getInternosForGrid(token: string) {
        const response = await fetch(this._url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const internos: Interno[] = await response.json();
        return internos.map((data) => {
            const pipeIndex = data['naturalidade'].indexOf('|')
            if (pipeIndex == -1)
                return data;

            const { cidade, estadoUf } = mapNaturalidade(data['naturalidade'])
            return {
                ...data,
                naturalidade: cidade + ' | ' + estadoUf
            }
        })

    }
    public async desativar(id: string, token: string): Promise<Interno> {
        let dadosMap = {}
        const dados = await this.getInternoPorId(id, token);

        const isEmpty = (obj: any) => Object.keys(obj).length === 0;
        if (isEmpty(dados.alta))
            dadosMap = {
                ...dados, ativo: false, alta: {
                    id_termo_alta: "",
                    nameAlta: "",
                    altaTerapeutica: false,
                    altaDesistencia: false,
                    altaAdministrativa: false,
                    altaAbandono: false,
                    altaJudicial: false,
                    altaFalecimento: false,
                    justificativaAlta: "",
                    nucleoAlta: "",
                    dataAlta: ""
                }
            };
        else
            dadosMap = { ...dados, ativo: false };

        const response = await fetch(this._postUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosMap)
        });

        const data = await response.json();
        if (!response.ok) {
            console.log({ data });
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }
        return data;
    }

    public async ativar(id: string, token: string): Promise<Interno> {
        let dadosMap = {}
        const dados = await this.getInternoPorId(id, token);

        const isEmpty = (obj: any) => Object.keys(obj).length === 0;
        if (isEmpty(dados.alta))
            dadosMap = {
                ...dados, ativo: true, alta: {
                    id_termo_alta: "",
                    nameAlta: "",
                    altaTerapeutica: false,
                    altaDesistencia: false,
                    altaAdministrativa: false,
                    altaAbandono: false,
                    altaJudicial: false,
                    altaFalecimento: false,
                    justificativaAlta: "",
                    nucleoAlta: "",
                    dataAlta: ""
                }
            };
        else
            dadosMap = { ...dados, ativo: true };

        const response = await fetch(this._postUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosMap)
        });

        const data = await response.json();
        if (!response.ok) {
            console.log({ data });
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }
        console.log({ data, response });
        return data;
    }
}

const mapNaturalidade = (naturalidade: string): { cidade: string, estadoUf: string } => {
    const pipeIndex = naturalidade.indexOf('|')
    if (pipeIndex == -1)
        return {
            cidade: '',
            estadoUf: ''
        }

    return {
        cidade: naturalidade.substring(0, pipeIndex),
        estadoUf: naturalidade.substring(pipeIndex + 1)
    };

}