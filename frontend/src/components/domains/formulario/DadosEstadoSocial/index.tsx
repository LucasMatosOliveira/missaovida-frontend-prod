import { FormColumn } from "@/components/form/FormColumn";
import { FormRow } from "@/components/form/FormRow";
import { FormSection } from "@/components/form/FormSection";
import { FormInput } from "@/components/form/FormInput";
import { useFormContext } from "react-hook-form";
import { InternosInsaltSchema } from "../schema";
import { FormCheckbox } from "@/components/form/FormCheckbox";
import { useAppFormContext } from "@/components/form/hook";
import { useEffect } from "react";

const classNamesSubSection = "border-l-2 border-gray-300 pl-2 ml-5";

export function DadosEstadoSocialInsalt() {
    const { watch, setValue } = useAppFormContext<InternosInsaltSchema>();
    const values = watch();
    const situacaoRua = watch('social.situacao_rua');
    const situacaoCentros = watch('social.outros_centros');

    useEffect(() => {
        if(situacaoRua === false)
            setValue('social.motivos_rua', '');
    }, [situacaoRua]);

    useEffect(() => {
        if(situacaoCentros === false){
            setValue('social.nome_outros_centros', '');
            setValue('social.motivo_saida_outros_centros', '');
        }
    }, [situacaoCentros]);

    return (
        <FormSection title="SOBRE O ESTADO SOCIAL">
            <FormRow>
                <FormColumn span={6} >
                    <FormCheckbox name="social.situacao_rua" label="Estava em situação de rua" />
                    <FormColumn span={8} className={classNamesSubSection}>
                        <FormInput name="social.motivos_rua" label="Há quanto tempo e por quê?" disabled={!values.social?.situacao_rua} />
                    </FormColumn>
                </FormColumn>
                <FormColumn span={6} >
                    <FormCheckbox name="social.outros_centros" label="Já passou por outro Centro de Recuperação antes" />
                    <FormColumn span={8} className={classNamesSubSection}>
                        <FormInput name="social.nome_outros_centros" label="Qual?" disabled={!values.social?.outros_centros} />
                    </FormColumn>
                    <FormColumn span={8} className={classNamesSubSection}>
                        <FormInput name="social.motivo_saida_outros_centros" label="Por quanto tempo e por que saiu?" disabled={!values.social?.outros_centros} />
                    </FormColumn>
                </FormColumn>
            </FormRow>
            <FormRow>
                <FormColumn span={4}>
                    <FormInput name="social.chegada_missao_vida" label="Como chegou a Missão Vida?" />
                </FormColumn>
                <FormColumn span={4}>
                    <FormInput name="social.igreja" label="Se foi por uma Igreja, qual?" />
                </FormColumn>
                <FormColumn span={4}>
                    <FormInput name="social.secretaria_governamental" label="Se foi por uma secretaria governamental, qual?" />
                </FormColumn>
            </FormRow>
            <FormRow>
                <FormColumn span={6}>
                    <FormInput name="social.sentimentos" label="Como se sente na situação em que você se encontra?" />
                </FormColumn>
                <FormColumn span={6}>
                    <FormInput name="social.objetivos" label="Quais são os seus objetivos como acolhido na Missão Vida?" />
                </FormColumn>
            </FormRow>
        </FormSection>

    );
}