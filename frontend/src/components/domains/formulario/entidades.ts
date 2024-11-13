export interface AcolhidoFilho {
    id: string;
    nome_filho: string;
    paga_pensao: boolean;
}

export interface DadosSaude {
    tratamento_psiquiatrico: boolean;
    local_tratamento: string;
    medicamento_psicotropico: boolean;
    descricao_psicotropico: string;
    medicamento_uso_continuo: boolean;
    descricao_uso_continuo: string;
    lesao_fisica: boolean;
    local_lesao_fisica: string;
    doenca_respiratoria: boolean;
    nome_doenca_respiratoria: string;
    alergia_alimentar: boolean;
    nome_alimento: string;
    alergia_medicamentos: boolean;
    nome_alergia_medicamento: string;
    alguma_doenca: boolean;
    nome_doenca: string;
    problema_coracao: boolean;
    doenca_coracao: string;
    tem_cancer: boolean;
    historico_cancer: string;
    tipo_cancer: string;
    tentativa_suicidio: boolean;
    automutilacao: boolean;
}

export interface VidaJuridica {
    historico_prisao: boolean;
    motivo_prisao: string;
    processos: boolean;
    localidade_processo: string;
    uso_tornozeleira: boolean;
    informou_central: boolean;
    situacao_legal: boolean;
    motivo_situacao_ilegal: string;
    cumpriu_pena: boolean;
}

export interface Substancia {
    uso_alcool: boolean;
    motivo_alcool: string;
    uso_tabaco: boolean;
    motivo_tabaco: string;
    outras_substancias: boolean;
    principal_substancia: string;
    motivo_outras_substancias: string;
}

export interface EstadoSocial {
    situacao_rua: boolean;
    motivos_rua: string;
    outros_centros: boolean;
    nome_outros_centros: string;
    motivo_saida_outros_centros: string;
    chegada_missao_vida: string;
    igreja: string;
    secretaria_governamental: string;
    sentimentos: string;
    objetivos: string;
}

export interface TermoGuarda {
    autorizacao_guarda: boolean;
    documentos_guardados: string;
    descricao_carteira: string;
    recurso_especie: number;
    aparelho_celular: string;
    outros_objetos: string;
}

export interface TermoAlta {
    id_termo_alta: string;
    nameAlta: string;
    altaTerapeutica: boolean;
    altaDesistencia: boolean;
    altaAdministrativa: boolean;
    altaAbandono: boolean;
    altaJudicial: boolean;
    altaFalecimento: boolean;
    justificativaAlta: string;
    nucleoAlta: string;
    dataAlta: string;
}

export interface Interno {
    id_acolhido: number;
    nome_acolhido: string;
    naturalidade: string;
    cpf_acolhido: string;
    rg_acolhido: string;
    orgao_expedidor_rg: string;
    data_nascimento: string;
    declaracao_racial: string;
    filiacao_pai: string;
    filiacao_mae: string;
    endereco_familiar: string;
    telefone: string;
    whatsapp: string;
    escolaridade_acolhido: string;
    profissao_acolhido: string;
    estado_civil_acolhido: string;
    apoio_familiar: boolean;
    nome_apoio: string;
    endereco_apoio: string;
    religiao_acolhido: boolean;
    qual_religiao: string;
    ativo: boolean;
    filhos: AcolhidoFilho[];
    saude: DadosSaude;
    juridica: VidaJuridica;
    substancia: Substancia;
    social: EstadoSocial;
    guarda: TermoGuarda;
    alta: TermoAlta;
}
export interface InternoReturn {
    id_acolhido: number;
    nome_acolhido: string;
    naturalidade: string;
    cpf_acolhido: string;
    rg_acolhido: string;
    orgao_expedidor_rg: string;
    data_nascimento: string;
    declaracao_racial: string;
    filiacao_pai: string;
    filiacao_mae: string;
    endereco_familiar: string;
    telefone: string;
    whatsapp: string;
    escolaridade_acolhido: string;
    profissao_acolhido: string;
    estado_civil_acolhido: string;
    apoio_familiar: boolean;
    nome_apoio: string;
    endereco_apoio: string;
    religiao_acolhido: boolean;
    qual_religiao: string;
    ativo: boolean;
    filho: {
        nome_filho: string;
        paga_pensao: boolean;
    }[];
    saude: {
        tratamento_psiquiatrico: boolean;
        local_tratamento: string;
        medicamento_psicotropico: boolean;
        descricao_psicotropico: string;
        medicamento_uso_continuo: boolean;
        descricao_uso_continuo: string;
        lesao_fisica: boolean;
        local_lesao_fisica: string;
        doenca_respiratoria: boolean;
        nome_doenca_respiratoria: string;
        alergia_alimentar: boolean;
        nome_alimento: string;
        alergia_medicamentos: boolean;
        nome_alergia_medicamento: string;
        alguma_doenca: boolean;
        nome_doenca: string;
        problema_coracao: boolean;
        doenca_coracao: string;
        tem_cancer: boolean;
        historico_cancer: string;
        tipo_cancer: string;
        tentativa_suicidio: boolean;
        automutilacao: boolean;
    }[];
    vidajuridica: {
        historico_prisao: boolean;
        motivo_prisao: string;
        processos: boolean;
        localidade_processo: string;
        uso_tornozeleira: boolean;
        informou_central: boolean;
        cumpriu_pena: boolean;
        situacao_legal: boolean;
        motivo_situacao_ilegal: string;
    }[];
    substancia: {
        uso_alcool: boolean;
        motivo_alcool: string;
        uso_tabaco: boolean;
        motivo_tabaco: string;
        outras_substancias: string;
        motivo_outras_substancias: string;
        principal_substancia: string;
    }[];
    social: {
        situacao_rua: boolean;
        motivos_rua: string;
        chegada_missao_vida: string;
        igreja: string;
        secretaria_governamental: string;
        sentimentos: string;
        objetivos: string;
        outros_centros: boolean;
        nome_outros_centros: string;
        motivo_saida_outros_centros: string;
    }[];
    termoguarda: {
        autorizacao_guarda: boolean;
        documentos_guardados: string;
        descricao_carteira: string;
        recurso_especie: number;
        aparelho_celular: string;
        outros_objetos: string;
    }[];
}

export enum EstadoUF {
    AC = 12,
    AL = 27,
    AP = 16,
    AM = 13,
    BA = 29,
    CE = 23,
    DF = 53,
    ES = 32,
    GO = 52,
    MA = 21,
    MT = 51,
    MS = 50,
    MG = 31,
    PA = 15,
    PB = 25,
    PR = 41,
    PE = 26,
    PI = 22,
    RJ = 33,
    RN = 24,
    RS = 43,
    RO = 11,
    RR = 14,
    SC = 42,
    SP = 35,
    SE = 28,
    TO = 17,
    AN = 91,
    EX = 99
}

export const EstadoUFDisplay: Record<string, string> = {
    [EstadoUF.AC]: 'AC',
    [EstadoUF.AL]: 'AL',
    [EstadoUF.AP]: 'AP',
    [EstadoUF.AM]: 'AM',
    [EstadoUF.BA]: 'BA',
    [EstadoUF.CE]: 'CE',
    [EstadoUF.DF]: 'DF',
    [EstadoUF.ES]: 'ES',
    [EstadoUF.GO]: 'GO',
    [EstadoUF.MA]: 'MA',
    [EstadoUF.MT]: 'MT',
    [EstadoUF.MS]: 'MS',
    [EstadoUF.MG]: 'MG',
    [EstadoUF.PA]: 'PA',
    [EstadoUF.PB]: 'PB',
    [EstadoUF.PR]: 'PR',
    [EstadoUF.PE]: 'PE',
    [EstadoUF.PI]: 'PI',
    [EstadoUF.RJ]: 'RJ',
    [EstadoUF.RN]: 'RN',
    [EstadoUF.RS]: 'RS',
    [EstadoUF.RO]: 'RO',
    [EstadoUF.RR]: 'RR',
    [EstadoUF.SC]: 'SC',
    [EstadoUF.SP]: 'SP',
    [EstadoUF.SE]: 'SE',
    [EstadoUF.TO]: 'TO',
    [EstadoUF.AN]: 'AN',
    [EstadoUF.EX]: 'EX',
}