import { FormColumn } from "@/components/form/FormColumn";
import { FormRow } from "@/components/form/FormRow";
import { FormSection } from "@/components/form/FormSection";
import { FormInput } from "@/components/form/FormInput";
import { FormCheckbox } from "@/components/form/FormCheckbox";
import { InternosInsaltSchema } from "../../schema";
import { AssinaturaPdfButton } from "@/components/reports/pdf";

export function TermoGuardaBensInsalt() {
    return (
        <FormSection title="TERMO DE GUARDA DE BENS E DOCUMENTOS">
            <div className="page-teste">
            <FormRow>
                <FormColumn span={12}>
                    <FormCheckbox
                        name="guarda.autorizacao_guarda"
                        label="Autorizo a guarda dos meus documentos pessoais, bem como algum valor monetário que venha a possuir durante o período do programa de recuperação, como forma de prevenção a perda e roubo."
                    />
                </FormColumn>
            </FormRow>
            <FormRow>
                <FormColumn span={12}>
                    <FormInput name="guarda.documentos_guardados" label="Quais documentos serão guardados?" />
                </FormColumn>
            </FormRow>
            <FormRow>
                <FormColumn span={4}>
                    <FormInput name="guarda.descricao_carteira" label="Qual a aparência/cor da carteira para documentos?" />
                </FormColumn>
                <FormColumn span={4}>
                    <FormInput name="guarda.recurso_especie" label="Apresentou recurso em espécie no valor de (R$)" />
                </FormColumn>
                <FormColumn span={4}>
                    <FormInput name="guarda.aparelho_celular" label="Aparelho celular/marca apresentado:" />
                </FormColumn>
            </FormRow>
            <FormRow>
                <FormColumn span={12}>
                    <FormInput name="guarda.outros_objetos" label="Outros objetos de valor apresentados:" />
                </FormColumn>
            </FormRow>
            </div>
        </FormSection>
    );
}