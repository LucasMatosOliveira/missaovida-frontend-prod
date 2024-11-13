import { useEffect } from "react";
import { FormColumn } from "@/components/form/FormColumn";
import { FormRow } from "@/components/form/FormRow";
import { FormSection } from "@/components/form/FormSection";
import { FormInput } from "@/components/form/FormInput";
import { FormCheckbox } from "@/components/form/FormCheckbox";
import { InternosInsaltSchema } from "../schema";
import { useAppFormContext } from "@/components/form/hook";

const classNamesSubSection = "border-l-2 border-gray-300 pl-2 ml-5";

export function DadosSaudeInsalt() {
    const { setValue, watch } = useAppFormContext<InternosInsaltSchema>();
    const values = watch();

    const tratamentoPsiquiatrico = watch('saude.tratamento_psiquiatrico');
    const medicamentoPsicotropico = watch('saude.medicamento_psicotropico');
    const medicamentoUsoContinuo = watch('saude.medicamento_uso_continuo');
    const lesaoFisica = watch('saude.lesao_fisica');
    const doenca_respiratoria = watch('saude.doenca_respiratoria');
    const alergiaAlimentar = watch('saude.alergia_alimentar');
    const alergiaMedicamentos = watch('saude.alergia_medicamentos');
    const algumaDoenca = watch('saude.alguma_doenca');
    const problemaCoracao = watch('saude.problema_coracao');
    const temCancer = watch('saude.tem_cancer');

    useEffect(() => {
        if(alergiaAlimentar === false)
            setValue('saude.nome_alimento', '')
    }, [alergiaAlimentar]);

    useEffect(() => {
        if(alergiaMedicamentos === false)
            setValue('saude.nome_alergia_medicamento', '')
    }, [alergiaMedicamentos]);

    useEffect(() => {
        if(algumaDoenca === false)
            setValue('saude.nome_doenca', '')
    }, [algumaDoenca]);

    useEffect(() => {
        if(problemaCoracao === false)
            setValue('saude.doenca_coracao', '')
    }, [problemaCoracao]);

    useEffect(() => {
        if(temCancer === false) {
            setValue('saude.historico_cancer', '')
            setValue('saude.tipo_cancer', '')
        }
    }, [temCancer]);

    useEffect(() => {
        if(tratamentoPsiquiatrico === false)
            setValue('saude.local_tratamento', '')
    }, [tratamentoPsiquiatrico]);

    useEffect(() => {
        if(medicamentoPsicotropico === false)
            setValue('saude.descricao_psicotropico', '')
    }, [medicamentoPsicotropico]);

    useEffect(() => {
        if(medicamentoUsoContinuo === false)
            setValue('saude.descricao_uso_continuo', '')
    }, [medicamentoUsoContinuo]);

    useEffect(() => {
        if(lesaoFisica === false)
            setValue('saude.local_lesao_fisica', '')
    }, [lesaoFisica]);

    useEffect(() => {
        if(doenca_respiratoria === false)
            setValue('saude.nome_doenca_respiratoria', '')
    }, [doenca_respiratoria]);

    return (
        <FormSection title="DADOS DE SAÚDE DO ACOLHIDO">
            <FormRow>
                <FormColumn span={6} >
                    <FormCheckbox name="saude.tratamento_psiquiatrico" label="Já passou por tratamento psiquiátrico" />
                    <FormColumn span={8} className={classNamesSubSection}>
                        <FormInput name="saude.local_tratamento" label="Local (CAPS, Clínica Psiq., Hosp. Psiq.)" disabled={!values.saude?.tratamento_psiquiatrico} />
                    </FormColumn>
                </FormColumn>
                <FormColumn span={6} >
                    <FormCheckbox name="saude.medicamento_psicotropico" label="Já tomou ou toma medicamentos psicotrópicos" />
                    <FormColumn span={8} className={classNamesSubSection}>
                        <FormInput name="saude.descricao_psicotropico" label="Qual e por quê?" disabled={!values.saude?.medicamento_psicotropico} />
                    </FormColumn>
                </FormColumn>
            </FormRow>
            <FormRow>
                <FormColumn span={6} >
                    <FormCheckbox name="saude.medicamento_uso_continuo" label="Já tomou outro medicamento de uso contínuo" />
                    <FormColumn span={8} className={classNamesSubSection}>
                        <FormInput name="saude.descricao_uso_continuo" label="Qual?" disabled={!values.saude?.medicamento_uso_continuo} />
                    </FormColumn>
                </FormColumn>
                <FormColumn span={6} >
                    <FormCheckbox name="saude.lesao_fisica" label="Já sofreu alguma lesão física" />
                    <FormColumn span={8} className={classNamesSubSection}>
                        <FormInput name="saude.local_lesao_fisica" label="Em qual dos membros?" disabled={!values.saude?.lesao_fisica} />
                    </FormColumn>
                </FormColumn>
            </FormRow>
            <FormRow>
                <FormColumn span={6} >
                    <FormCheckbox name="saude.doenca_respiratoria" label="Tem doença respiratória" />
                    <FormColumn span={8} className={classNamesSubSection}>
                        <FormInput name="saude.nome_doenca_respiratoria" label="Qual doença respiratória?" disabled={!values.saude?.doenca_respiratoria} />
                    </FormColumn>
                </FormColumn>
                <FormColumn span={6} >
                    <FormCheckbox name="saude.alergia_alimentar" label="Tem algum tipo de alergia alimentar" />
                    <FormColumn span={8} className={classNamesSubSection}>
                        <FormInput name="saude.nome_alimento" label="Nome do alimento" disabled={!values.saude?.alergia_alimentar} />
                    </FormColumn>
                </FormColumn>
            </FormRow>
            <FormRow>
                <FormColumn span={6} >
                    <FormCheckbox name="saude.alergia_medicamentos" label="Tem alergia a algum medicamento" />
                    <FormColumn span={8} className={classNamesSubSection}>
                        <FormInput name="saude.nome_alergia_medicamento" label="Nome do medicamento" disabled={!values.saude?.alergia_medicamentos} />
                    </FormColumn>
                </FormColumn>
                <FormColumn span={4} >
                    <FormCheckbox name="saude.alguma_doenca" label="Apresenta alguma doença" />
                    <FormColumn span={8} className={classNamesSubSection}>
                        <FormInput name="saude.nome_doenca" label="Qual doença?" disabled={!values.saude?.alguma_doenca} />
                    </FormColumn>
                </FormColumn>
            </FormRow>
            <FormRow>
                <FormColumn span={6} >
                    <FormCheckbox name="saude.problema_coracao" label="Apresenta doenças do coração" />
                    <FormColumn span={8} className={classNamesSubSection}>
                        <FormInput name="saude.doenca_coracao" label="Qual doença do coração?" disabled={!values.saude?.problema_coracao} />
                    </FormColumn>
                </FormColumn>
                <FormColumn span={6} >
                    <FormCheckbox name="saude.tem_cancer" label="Tem histórico de câncer" />
                    <FormColumn span={8} className={classNamesSubSection}>
                        <FormInput name="saude.historico_cancer" label="Em você ou na família?" disabled={!values.saude?.tem_cancer} />
                    </FormColumn>
                    <FormColumn span={8} className={classNamesSubSection}>
                        <FormInput name="saude.tipo_cancer" label="Qual tipo de câncer?" disabled={!values.saude?.tem_cancer} />
                    </FormColumn>
                </FormColumn>
            </FormRow>
            <FormRow className="mt-5">
                <FormColumn span={6}>
                    <FormCheckbox name="saude.tentativa_suicidio" label="Por algum motivo já tentou suicídio" />
                </FormColumn>
                <FormColumn span={6}>
                    <FormCheckbox name="saude.automutilacao" label="Por algum motivo já se automutilou" />
                </FormColumn>
            </FormRow>
        </FormSection>
    );
}