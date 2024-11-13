import { z } from "@/commom/form/pt-zod";
import { booleanCoerce, numberCoerce } from "@/commom/form/form-validation-utils";

export const filhoSchema = z.object({
    id: z.string(),
    nome: z.string().optional(),
    pagaPensao: booleanCoerce(z.boolean()).optional(),
});

export const saudeSchema = z.object({
    tratamento_psiquiatrico: booleanCoerce(z.boolean()).optional(),
    local_tratamento: z.string().optional(),
    medicamento_psicotropico: booleanCoerce(z.boolean()).optional(),
    descricao_psicotropico: z.string().optional(),
    medicamento_uso_continuo: booleanCoerce(z.boolean()).optional(),
    descricao_uso_continuo: z.string().optional(),
    lesao_fisica: booleanCoerce(z.boolean()).optional(),
    local_lesao_fisica: z.string().optional(),
    doenca_respiratoria: booleanCoerce(z.boolean()).optional(),
    nome_doenca_respiratoria: z.string().optional(),
    alergia_alimentar: booleanCoerce(z.boolean()).optional(),
    nome_alimento: z.string().optional(),
    alergia_medicamentos: booleanCoerce(z.boolean()).optional(),
    nome_alergia_medicamento: z.string().optional(),
    alguma_doenca: booleanCoerce(z.boolean()).optional(),
    nome_doenca: z.string().optional(),
    problema_coracao: booleanCoerce(z.boolean()).optional(),
    doenca_coracao: z.string().optional(),
    tem_cancer: booleanCoerce(z.boolean()).optional(),
    historico_cancer: z.string().optional(),
    tipo_cancer: z.string().optional(),
    tentativa_suicidio: booleanCoerce(z.boolean()).optional(),
    automutilacao: booleanCoerce(z.boolean()).optional(),
});

export const juridicaSchema = z.object({
    historico_prisao: booleanCoerce(z.boolean()).optional(),
    motivo_prisao: z.string().optional(),
    processos: booleanCoerce(z.boolean()).optional(),
    localidade_processo: z.string().optional(),
    uso_tornozeleira: booleanCoerce(z.boolean()).optional(),
    informou_central: booleanCoerce(z.boolean()).optional(),
    situacao_legal: booleanCoerce(z.boolean()).optional(),
    motivo_situacao_ilegal: z.string().optional(),
    cumpriu_pena: booleanCoerce(z.boolean()).optional(),
});

export const substanciaSchema = z.object({
    uso_alcool: booleanCoerce(z.boolean()).optional(),
    motivo_alcool: z.string().optional(),
    uso_tabaco: booleanCoerce(z.boolean()).optional(),
    motivo_tabaco: z.string().optional(),
    outras_substancias: booleanCoerce(z.boolean()).optional(),
    principal_substancia: z.string().optional(),
    motivo_outras_substancias: z.string().optional(),
});

export const socialSchema = z.object({
    situacao_rua: booleanCoerce(z.boolean()).optional(),
    motivos_rua: z.string().optional(),
    outros_centros: booleanCoerce(z.boolean()).optional(),
    nome_outros_centros: z.string().optional(),
    motivo_saida_outros_centros: z.string().optional(),
    chegada_missao_vida: z.string().optional(),
    igreja: z.string().optional(),
    secretaria_governamental: z.string().optional(),
    sentimentos: z.string().optional(),
    objetivos: z.string().optional(),
});

export const guardaSchema = z.object({
    autorizacao_guarda: booleanCoerce(z.boolean()).optional(),
    documentos_guardados: z.string().optional(),
    descricao_carteira: z.string().optional(),
    recurso_especie: numberCoerce(z.number().optional()),
    aparelho_celular: z.string().optional(),
    outros_objetos: z.string().optional(),
});

export const altaSchema = z.object({
    id_termo_alta: z.string().optional(),
    nameAlta: z.string().optional(),
    altaTerapeutica: booleanCoerce(z.boolean()).optional(),
    altaDesistencia: booleanCoerce(z.boolean()).optional(),
    altaAdministrativa: booleanCoerce(z.boolean()).optional(),
    altaAbandono: booleanCoerce(z.boolean()).optional(),
    altaJudicial: booleanCoerce(z.boolean()).optional(),
    altaFalecimento: booleanCoerce(z.boolean()).optional(),
    justificativaAlta: z.string().optional(),
    nucleoAlta: z.string().optional(),
    dataAlta: z.string().optional(),
});

export const internosInsaltSchema = z.object({
    id: numberCoerce(z.number().optional()),
    name: z.string(),
    cpf: z.string().optional(),
    cidade: z.string().optional(),
    estadoUf: z.string().toUpperCase().optional(),
    rg: z.string().optional(),
    orgaoExpedidor: z.string().optional(),
    dataNascimento: z.string(),
    etnia: z.string().optional(),
    filiacaoPai: z.string().optional(),
    mae: z.string().optional(),
    enderecoFamiliar: z.string().optional(),
    telefone: z.string().optional(),
    whatsapp: z.string().optional(),
    escolaridade: z.string().optional(),
    profissao: z.string().optional(),
    estadoCivil: z.string().optional(),
    temFamiliaApoio: booleanCoerce(z.boolean()).optional(),
    nomeFamiliar: z.string().optional(),
    enderecoFamiliarApoio: z.string().optional(),
    filhos: z.array(filhoSchema).optional(),
    religiao: booleanCoerce(z.boolean()).optional(),
    qualReligiao: z.string().optional(),

    saude: saudeSchema,
    juridica: juridicaSchema,
    substancia: substanciaSchema,
    social: socialSchema,
    guarda: guardaSchema,
    alta: altaSchema
});

export type InternosInsaltSchema = z.infer<typeof internosInsaltSchema>;