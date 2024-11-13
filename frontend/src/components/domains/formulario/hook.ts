import { EstadoUF } from '@/components/domains/formulario/entidades';
import { useForm } from "react-hook-form";
import { internosInsaltSchema, InternosInsaltSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { InternosApi } from "./internos.api";
import { useSpinner } from "@/contexts/SpinnerContext";
import { useSnapshot } from "valtio";
import { authState } from "@/store/login";
import { toast } from "react-toastify";
import { useAppForm } from "@/components/form/hook";
import { AcolhidoFilho, Interno, InternoReturn } from "./entidades";
import { Masks } from '@/commom/form/mask';

export function useInternosInsalt({ idInterno, onDadosSalvos }: InternosInsaltArgs) {
    const formMethods = useAppForm<InternosInsaltSchema>({
        resolver: zodResolver(internosInsaltSchema),
    });

    const { showSpinner, hideSpinner } = useSpinner();
    const token = localStorage.getItem('token');

    const { reset } = formMethods;

    useEffect(() => {
        if (!idInterno)
            return;

        if (!token)
            return;

        (async () => {
            try {
                showSpinner();
                const api = new InternosApi();
                const response = await api.getInternoPorId(idInterno, token!);
                const mappedData = mapTypeForSchema(response);

                reset(mappedData);
            }
            catch (error) {
                toast.error("Erro ao cadastrar");
            }
            finally {
                hideSpinner();
            }
        })();

    }, [idInterno, token]);

    const handleSalvar = async (data: InternosInsaltSchema) => {
        const isNovo = !idInterno;
        const dados = mapSchemaForType(data);

        try {
            const api = new InternosApi()
            const response = isNovo
                ? await api.inserir(dados, token!)
                : await api.alterar(idInterno, dados, token!);
            toast.success('Dados salvos com sucesso')

        }
        catch (error) {
            toast.error(error as string);
            // console.log({ error })
        }
    }

    return {
        formMethods,
        handleSalvar
    };
}

export interface Error {
    message: string;
    stack: string;
}

const mapSchemaForType = (data: InternosInsaltSchema): Interno => {
    return {
        id_acolhido: data.id,
        nome_acolhido: data.name ?? '',
        naturalidade: (data.cidade + '|' + data.estadoUf) || '',
        cpf_acolhido: data.cpf?.replace(/[.\-]/g, '') ?? '',
        rg_acolhido: data.rg ?? '',
        orgao_expedidor_rg: data.orgaoExpedidor ?? '',
        data_nascimento: data.dataNascimento ?? '',
        declaracao_racial: data.etnia ?? '',
        filiacao_pai: data.filiacaoPai ?? '',
        filiacao_mae: data.mae ?? '',
        endereco_familiar: data.enderecoFamiliar ?? '',
        telefone: data.telefone?.replace(/\D/g, '') ?? '',
        whatsapp: data.whatsapp?.replace(/\D/g, '') ?? '',
        escolaridade_acolhido: data.escolaridade ?? '',
        profissao_acolhido: data.profissao ?? '',
        estado_civil_acolhido: data.estadoCivil ?? '',
        apoio_familiar: data.temFamiliaApoio ?? (!!data.nomeFamiliar || !!data.enderecoFamiliarApoio),
        nome_apoio: data.nomeFamiliar ?? '',
        endereco_apoio: data.enderecoFamiliarApoio || '',
        religiao_acolhido: data.religiao ?? !!data.qualReligiao,
        qual_religiao: data.qualReligiao ?? '',
        ativo: true,
        filhos: data.filhos?.filter(filho => filho.nome)
            .map(filho => ({
                nome_filho: filho.nome ?? '',
                paga_pensao: filho.pagaPensao ?? false,
            })) as AcolhidoFilho[],
        saude: {
            tratamento_psiquiatrico: data.saude.tratamento_psiquiatrico ?? false,
            local_tratamento: data.saude.local_tratamento ?? '',
            medicamento_psicotropico: data.saude.medicamento_psicotropico ?? false,
            descricao_psicotropico: data.saude.descricao_psicotropico ?? '',
            medicamento_uso_continuo: data.saude.medicamento_uso_continuo ?? false,
            descricao_uso_continuo: data.saude.descricao_uso_continuo ?? '',
            lesao_fisica: data.saude.lesao_fisica ?? false,
            local_lesao_fisica: data.saude.local_lesao_fisica ?? '',
            doenca_respiratoria: data.saude.doenca_respiratoria ?? false,
            nome_doenca_respiratoria: data.saude.nome_doenca_respiratoria ?? '',
            alergia_alimentar: data.saude.alergia_alimentar ?? false,
            nome_alimento: data.saude.nome_alimento ?? '',
            alergia_medicamentos: data.saude.alergia_medicamentos ?? false,
            nome_alergia_medicamento: data.saude.nome_alergia_medicamento ?? '',
            alguma_doenca: data.saude.alguma_doenca ?? false,
            nome_doenca: data.saude.nome_doenca ?? '',
            problema_coracao: data.saude.problema_coracao ?? false,
            doenca_coracao: data.saude.doenca_coracao ?? '',
            tem_cancer: data.saude.tem_cancer ?? false,
            historico_cancer: data.saude.historico_cancer ?? '',
            tipo_cancer: data.saude.tipo_cancer ?? '',
            tentativa_suicidio: data.saude.tentativa_suicidio ?? false,
            automutilacao: data.saude.automutilacao ?? false,
        },
        juridica: {
            historico_prisao: data.juridica.historico_prisao ?? false,
            motivo_prisao: data.juridica.motivo_prisao ?? '',
            processos: data.juridica.processos ?? false,
            localidade_processo: data.juridica.localidade_processo ?? '',
            uso_tornozeleira: data.juridica.uso_tornozeleira ?? false,
            informou_central: data.juridica.informou_central ?? false,
            situacao_legal: data.juridica.situacao_legal ?? false,
            motivo_situacao_ilegal: data.juridica.motivo_situacao_ilegal ?? '',
            cumpriu_pena: data.juridica.cumpriu_pena ?? false,
        },
        substancia: {
            uso_alcool: data.substancia.uso_alcool ?? false,
            motivo_alcool: data.substancia.motivo_alcool ?? '',
            uso_tabaco: data.substancia.uso_tabaco ?? false,
            motivo_tabaco: data.substancia.motivo_tabaco ?? '',
            outras_substancias: data.substancia.outras_substancias ?? false,
            principal_substancia: data.substancia.principal_substancia ?? '',
            motivo_outras_substancias: data.substancia.motivo_outras_substancias ?? '',
        },
        social: {
            situacao_rua: data.social.situacao_rua ?? false,
            motivos_rua: data.social.motivos_rua ?? '',
            outros_centros: data.social.outros_centros ?? false,
            nome_outros_centros: data.social.nome_outros_centros ?? '',
            motivo_saida_outros_centros: data.social.motivo_saida_outros_centros ?? '',
            chegada_missao_vida: data.social.chegada_missao_vida ?? '',
            igreja: data.social.igreja ?? '',
            secretaria_governamental: data.social.secretaria_governamental ?? '',
            sentimentos: data.social.sentimentos ?? '',
            objetivos: data.social.objetivos ?? '',
        },
        guarda: {
            autorizacao_guarda: data.guarda.autorizacao_guarda ?? false,
            documentos_guardados: data.guarda.documentos_guardados ?? '',
            descricao_carteira: data.guarda.descricao_carteira ?? '',
            recurso_especie: data.guarda.recurso_especie ?? 0,
            aparelho_celular: data.guarda.aparelho_celular ?? '',
            outros_objetos: data.guarda.outros_objetos ?? '',
        },
        alta: {
            id_termo_alta: data.alta.id_termo_alta ?? '',
            nameAlta: data.name ?? '',
            altaAbandono: data.alta.altaAbandono ?? false,
            altaAdministrativa: data.alta.altaAdministrativa ?? false,
            altaDesistencia: data.alta.altaDesistencia ?? false,
            altaFalecimento: data.alta.altaFalecimento ?? false,
            altaJudicial: data.alta.altaJudicial ?? false,
            altaTerapeutica: data.alta.altaTerapeutica ?? false,
            justificativaAlta: data.alta.justificativaAlta ?? '',
            nucleoAlta: data.alta.nucleoAlta ?? '',
            dataAlta: data.alta.dataAlta ?? '',
        }
    } as Interno;
};


// const mapTypeForSchema = (data: Partial<InternoReturn>): InternosInsaltSchema => {
//     const { cidade, estadoUf } = mapNaturalidade(data.naturalidade!)
//     return {
//         id: data.id_acolhido,
//         name: data.nome_acolhido ?? '',
//         cpf: data.cpf_acolhido ?? '',
//         cidade,
//         estadoUf,
//         rg: data.rg_acolhido ?? '',
//         orgaoExpedidor: data.orgao_expedidor_rg ?? '',
//         dataNascimento: data.data_nascimento ?? '',
//         etnia: data.declaracao_racial ?? '',
//         filiacaoPai: data.filiacao_pai ?? '',
//         mae: data.filiacao_mae ?? '',
//         enderecoFamiliar: data.endereco_familiar ?? '',
//         telefone: data.telefone ?? '',
//         whatsapp: data.whatsapp ?? '',
//         escolaridade: data.escolaridade_acolhido ?? '',
//         profissao: data.profissao_acolhido ?? '',
//         estadoCivil: data.estado_civil_acolhido ?? '',
//         temFamiliaApoio: data.apoio_familiar ?? false,
//         nomeFamiliar: data.nome_apoio ?? '',
//         enderecoFamiliarApoio: data.endereco_apoio ?? '',
//         filhos: data.filho ? data.filho.map(filho => ({
//             id: 'FAKEID-000000000000' + filho.nome_filho,
//             nome: filho.nome_filho,
//             pagaPensao: filho.paga_pensao
//         })) : [],
//         religiao: data.religiao_acolhido ?? !!data.qual_religiao,
//         qualReligiao: data.qual_religiao ?? '',

//         tratamentoPsiquiatrico: data.saude?.[0]?.tratamento_psiquiatrico ?? data.saude?.[0]?.local_tratamento,
//         tratamentoPsiquiatricoLocal: data.saude?.[0]?.local_tratamento ?? '',
//         medicamentosPsicotropicos: data.saude?.[0]?.medicamento_psicotropico ?? data.saude?.[0]?.descricao_psicotropico,
//         medicamentosPsicotropicosMotivo: data.saude?.[0]?.descricao_psicotropico ?? '',
//         medicamentoUsoContinuo: data.saude?.[0]?.medicamento_uso_continuo ?? !!data.saude?.[0]?.descricao_uso_continuo,
//         medicamentoUsoContinuoQual: data.saude?.[0]?.descricao_uso_continuo ?? '',
//         lesaoFisica: data.saude?.[0]?.lesao_fisica ?? data.saude?.[0]?.local_lesao_fisica,
//         lesaoFisicaMembro: data.saude?.[0]?.local_lesao_fisica ?? '',
//         doencaRespiratoria: data.saude?.[0]?.doenca_respiratoria ?? data.saude?.[0]?.nome_doenca_respiratoria,
//         doencaRespiratoriaTipo: data.saude?.[0]?.nome_doenca_respiratoria ?? '',
//         alergiaAlimentar: data.saude?.[0]?.alergia_alimentar ?? !!data.saude?.[0]?.nome_alimento,
//         alergiaAlimentarTipo: data.saude?.[0]?.nome_alimento ?? '',
//         alergiaMedicamento: data.saude?.[0]?.alergia_medicamentos ?? !!data.saude?.[0]?.nome_alergia_medicamento,
//         alergiaMedicamentoTipo: data.saude?.[0]?.nome_alergia_medicamento ?? '',
//         doencas: data.saude?.[0]?.alguma_doenca ?? !!data.saude?.[0]?.nome_doenca,
//         doencasQual: data.saude?.[0]?.nome_doenca ?? '',
//         doencaCoracao: data.saude?.[0]?.problema_coracao ?? !!data.saude?.[0]?.doenca_coracao,
//         doencaCoracaoTipo: data.saude?.[0]?.doenca_coracao ?? '',
//         tentouSuicidio: data.saude?.[0]?.tentativa_suicidio ?? false,
//         autoMutilou: data.saude?.[0]?.automutilacao ?? false,
//         historicoCancer: data.saude?.[0]?.tem_cancer ?? (!!data.saude?.[0]?.historico_cancer || !!data.saude?.[0]?.tipo_cancer),
//         historicoCancerTipo: data.saude?.[0]?.historico_cancer ?? '',
//         historicoCancerOrigem: data.saude?.[0]?.tipo_cancer ?? '',

//         foiPreso: data.vidajuridica?.[0]?.historico_prisao ?? !!data.vidajuridica?.[0]?.historico_prisao,
//         foiPresoMotivo: data.vidajuridica?.[0]?.motivo_prisao ?? '',
//         respondeProcesso: data.vidajuridica?.[0]?.processos ?? !!data.vidajuridica?.[0]?.localidade_processo,
//         respondeProcessoLocal: data.vidajuridica?.[0]?.localidade_processo ?? '',
//         tornozeleiraEletronica: data.vidajuridica?.[0]?.uso_tornozeleira ?? false,
//         tornozeleiraEletronicaCentralMonitoramento: data.vidajuridica?.[0]?.informou_central ?? false,
//         cumpriuPena: data.vidajuridica?.[0]?.cumpriu_pena ?? false,
//         desacordoLei: data.vidajuridica?.[0]?.situacao_legal ?? !!data.vidajuridica?.[0]?.motivo_situacao_ilegal,
//         desacordoLeiMotivo: data.vidajuridica?.[0]?.motivo_situacao_ilegal ?? '',

//         alcool: data.substancia?.[0]?.uso_alcool ?? !!data.substancia?.[0]?.motivo_alcool,
//         alcoolInformacoes: data.substancia?.[0]?.motivo_alcool || '',
//         tabaco: data.substancia?.[0]?.uso_tabaco ?? !!data.substancia?.[0]?.motivo_tabaco,
//         tabacoInformacoes: data.substancia?.[0]?.motivo_tabaco ?? '',
//         substancias: data.substancia?.[0]?.outras_substancias ?? !!data.substancia?.[0]?.motivo_outras_substancias,
//         substanciasMotivoUso: data.substancia?.[0]?.motivo_outras_substancias ?? '',
//         substanciaMaiorUso: data.substancia?.[0]?.principal_substancia ?? '',

//         situacaoRua: data.social?.[0]?.situacao_rua ?? !!data.social?.[0]?.motivos_rua,
//         situacaoRuaInformacoes: data.social?.[0]?.motivos_rua ?? '',
//         chegadaMissaoVida: data.social?.[0]?.chegada_missao_vida ?? '',
//         chegadaMissaoVidaIgreja: data.social?.[0]?.igreja ?? '',
//         chegadaMissaoVidaSecretariaGov: data.social?.[0]?.secretaria_governamental ?? '',
//         comoSente: data.social?.[0]?.sentimentos ?? '',
//         objetivosAcolhido: data.social?.[0]?.objetivos ?? '',
//         outroCentroRecuperacao: data.social?.[0]?.outros_centros ?? !!data.social?.[0]?.nome_outros_centros,
//         outroCentroRecuperacaoQual: data.social?.[0]?.nome_outros_centros ?? '',
//         outroCentroRecuperacaoInformacoes: data.social?.[0]?.motivo_saida_outros_centros ?? '',

//         autorizacaoGuardaDocumentos: data.termoguarda?.[0]?.autorizacao_guarda ?? false,
//         autorizacaoGuardaDocumentosQuais: data.termoguarda?.[0]?.documentos_guardados ?? '',
//         carteiraDocumentosAparencia: data.termoguarda?.[0]?.descricao_carteira ?? '',
//         valorMonetarioApresentado: data.termoguarda?.[0]?.recurso_especie?.toString() ?? '',
//         aparelhoCelularApresentado: data.termoguarda?.[0]?.aparelho_celular ?? '',
//         objetoValorApresentado: data.termoguarda?.[0]?.outros_objetos ?? '',

//     };
// };

const mapTypeForSchema = (data: Partial<Interno>): InternosInsaltSchema => {
    const { cidade, estadoUf } = mapNaturalidade(data.naturalidade!)
    return {
        id: data.id_acolhido,
        name: data.nome_acolhido ?? '',
        cpf: data.cpf_acolhido ?? '',
        cidade,
        estadoUf,
        rg: data.rg_acolhido ?? '',
        orgaoExpedidor: data.orgao_expedidor_rg ?? '',
        dataNascimento: data.data_nascimento ?? '',
        etnia: data.declaracao_racial ?? '',
        filiacaoPai: data.filiacao_pai ?? '',
        mae: data.filiacao_mae ?? '',
        enderecoFamiliar: data.endereco_familiar ?? '',
        telefone: data.telefone?.replace(/\D/g, '') ?? '',
        whatsapp: data.whatsapp?.replace(/\D/g, '') ?? '',
        escolaridade: data.escolaridade_acolhido ?? '',
        profissao: data.profissao_acolhido ?? '',
        estadoCivil: data.estado_civil_acolhido ?? '',
        temFamiliaApoio: data.apoio_familiar ?? (!!data.nome_apoio || !!data.endereco_apoio),
        nomeFamiliar: data.nome_apoio ?? '',
        enderecoFamiliarApoio: data.endereco_apoio ?? '',
        filhos: data.filhos ? data.filhos.map(filho => ({
            id: 'FAKEID-000000000000' + filho.nome_filho,
            nome: filho.nome_filho,
            pagaPensao: filho.paga_pensao
        })) : [],
        religiao: data.religiao_acolhido ?? !!data.qual_religiao,
        qualReligiao: data.qual_religiao ?? '',

        saude: data.saude!,
        juridica: data.juridica!,
        substancia: data.substancia!,
        social: data.social!,
        guarda: data.guarda!,
        alta: data.alta!
    };
};

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
export interface InternosInsaltArgs {
    idInterno?: string;
    onDadosSalvos?: (interno: any, isNovo: boolean) => void;
}