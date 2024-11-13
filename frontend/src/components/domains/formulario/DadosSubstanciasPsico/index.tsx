import { useEffect } from "react";
import { FormColumn } from "@/components/form/FormColumn";
import { FormRow } from "@/components/form/FormRow";
import { FormSection } from "@/components/form/FormSection";
import { FormInput } from "@/components/form/FormInput";
import { FormCheckbox } from "@/components/form/FormCheckbox";
import { InternosInsaltSchema } from "../schema";
import { useFormContext } from "react-hook-form";

const classNamesSubSection = "border-l-2 border-gray-300 pl-2 ml-5";

export function DadosSubstanciasPsicoInsalt() {
    const { setValue, watch } = useFormContext<InternosInsaltSchema>();
    const values = watch();
    const usoAlcool = watch('substancia.uso_alcool');
    const usoTabaco = watch('substancia.uso_tabaco');
    const outrasSubstancias = watch('substancia.outras_substancias');

    useEffect(() => {
        if (usoAlcool === false) {
            setValue('substancia.motivo_alcool', '');
        }
    }, [usoAlcool]);

    useEffect(() => {
        if (usoTabaco === false) {
            setValue('substancia.motivo_tabaco', '');
        }
    }, [usoTabaco]);

    useEffect(() => {
        if (outrasSubstancias === false) {
            setValue('substancia.principal_substancia', '');
            setValue('substancia.motivo_outras_substancias', '');
        }
    }, [outrasSubstancias]);

    return (
        <FormSection title="QUAIS SÃO AS SUBSTÂNCIAS PSICOATIVAS DO SEU USO">
            <FormRow>
                <FormColumn span={6} >
                    <FormCheckbox name="substancia.uso_alcool" label="Álcool" />
                    <FormColumn span={8} className={classNamesSubSection}>
                        <FormInput name="substancia.motivo_alcool" label="O que levou você a fazer o uso, com que idade e por quê?" disabled={!values.substancia?.uso_alcool} />
                    </FormColumn>
                </FormColumn>
                <FormColumn span={6} >
                    <FormCheckbox name="substancia.uso_tabaco" label="Faz uso do tabaco" />
                    <FormColumn span={8} className={classNamesSubSection}>
                        <FormInput name="substancia.motivo_tabaco" label="Com quantos anos começou?" disabled={!values.substancia?.uso_tabaco} />
                    </FormColumn>
                </FormColumn>
            </FormRow>
            <FormRow>
            <FormColumn span={6} >
                    <FormCheckbox name="substancia.outras_substancias" label="Substâncias em geral" />
                    <FormColumn span={8} className={classNamesSubSection}>
                        <FormInput name="substancia.principal_substancia" label="Qual a principal substância que você faz uso?" disabled={!values.substancia?.outras_substancias} />
                    </FormColumn>
                    <FormColumn span={8} className={classNamesSubSection}>
                        <FormInput name="substancia.motivo_outras_substancias" label="O que te levou a fazer uso da(s) substância(s)?" disabled={!values.substancia?.outras_substancias} />
                    </FormColumn>
                </FormColumn>
            </FormRow>
        </FormSection>

    );
}