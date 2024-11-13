import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FormColumn } from "@/components/form/FormColumn";
import { FormRow } from "@/components/form/FormRow";
import { FormSection } from "@/components/form/FormSection";
import { FormInput } from "@/components/form/FormInput";
import { InternosInsaltSchema } from "../schema";
import { FormCheckbox } from "@/components/form/FormCheckbox";
import { cloneAndAddClass } from "@/components/form";
import { useAppFormContext } from "@/components/form/hook";

const classNamesSubSection = "border-l-2 border-gray-300 pl-2 ml-5";

export function DadosJuridicosInsalt() {
    const { watch, setValue } = useAppFormContext<InternosInsaltSchema>();
    const values = watch();
    const historicoPrisao = watch('juridica.historico_prisao');
    const processos = watch('juridica.processos');
    const tornozeleira = watch('juridica.uso_tornozeleira');
    const situacaoLegal = watch('juridica.situacao_legal');

    useEffect(() => {
        if(historicoPrisao === false)
           setValue('juridica.motivo_prisao', '')
    }, [historicoPrisao]);

    useEffect(() => {
        if(processos === false)
            setValue('juridica.localidade_processo', '')
    }, [processos])

    useEffect(() => {
        if(tornozeleira === false)
            setValue('juridica.informou_central', false)
    }, [tornozeleira])

    useEffect(() => {
        if(situacaoLegal === false)
            setValue('juridica.motivo_situacao_ilegal', '')
    }, [situacaoLegal])

    return (
        <FormSection title="DADOS SOBRE A VIDA JURÍDICA">
            <FormRow >
                <FormColumn span={6} >
                    <FormCheckbox name="juridica.historico_prisao" label="Já foi preso" />
                    <FormColumn span={8} className={classNamesSubSection}>
                        <FormInput name="juridica.motivo_prisao" label="Motivo" disabled={!values.juridica?.historico_prisao} />
                    </FormColumn>
                </FormColumn>
                <FormColumn span={6}>
                    <FormCheckbox name="juridica.processos" label="Responde algum processo ou inquérito" />
                    <FormColumn span={8} className={classNamesSubSection}>
                        <FormInput name="juridica.localidade_processo" label="Em qual Cidade/Estado?" disabled={!values.juridica?.processos} />
                    </FormColumn>
                </FormColumn>
            </FormRow>
            <FormRow>
                <FormColumn span={6} >
                    <FormCheckbox name="juridica.uso_tornozeleira" label="Faz uso de tornozeleira eletrônica" />
                    <FormColumn span={8} className={cloneAndAddClass(classNamesSubSection)}>
                        <FormCheckbox name="juridica.informou_central" label="Informou a central de monitoramento" disabled={!values.juridica?.uso_tornozeleira} />
                    </FormColumn>
                </FormColumn>
                <FormColumn span={6} >
                    <FormCheckbox name="juridica.situacao_legal" label="Está em desacordo com a lei" />
                    <FormColumn span={8} className={classNamesSubSection}>
                        <FormInput name="juridica.motivo_situacao_ilegal" label="Porquê?" disabled={!values.juridica?.situacao_legal} />
                    </FormColumn>
                </FormColumn>
            </FormRow>
            <FormRow>
                <FormColumn span={6} >
                    <FormCheckbox name="juridica.cumpriu_pena" label="Já cumpriu pena" />
                </FormColumn>
            </FormRow>
        </FormSection>
    );
}
