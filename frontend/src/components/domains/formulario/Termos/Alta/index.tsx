import { FormCheckbox } from "@/components/form/FormCheckbox";
import { FormColumn } from "@/components/form/FormColumn";
import { FormInput } from "@/components/form/FormInput";
import { FormRow } from "@/components/form/FormRow";
import { FormSection } from "@/components/form/FormSection";
import { InternosInsaltSchema } from "../../schema";
import { AssinaturaPdfButton } from "@/components/reports/pdf";

export function TermoAltaInsalt() {
    return (
        <div className="mt-5">
        <FormSection title="TERMO DE ALTA DO ACOLHIDO" >
            <FormRow>
                <FormColumn span={12}>
                    <FormInput name="alta.nomeAlta" label="Nome:" />
                </FormColumn>
            </FormRow>
            <FormRow>
                <FormColumn span={12}>
                    <FormCheckbox
                        name="alta.altaTerapeutica"
                        label="Alta Terapêutica (Conclusão)"
                    />
                </FormColumn>
                <FormColumn span={12}>
                    <FormCheckbox
                        name="alta.altaDesistencia"
                        label="Desistência (Alta a pedido)"
                    />
                </FormColumn>
                <FormColumn span={12}>
                    <FormCheckbox
                        name="alta.altaAdministrativa"
                        label="Alta Administrativa (Desligamento)"
                    />
                </FormColumn>
                <FormColumn span={12}>
                    <FormCheckbox
                        name="alta.altaAbandono"
                        label="Abandono (Evasão ou fuga)"
                    />
                </FormColumn>
                <FormColumn span={12}>
                    <FormCheckbox
                        name="alta.altaJudicial"
                        label="Decisão Judiciária/Procedimento Policial"
                    />
                </FormColumn>
                <FormColumn span={12}>
                    <FormCheckbox
                        name="alta.altaFalecimento"
                        label="Falecimento"
                    />
                </FormColumn>
            </FormRow>
            <FormRow>
                <FormColumn span={12}>
                    <FormInput name="alta.justificativaAlta" label="Justificativa da saída:" />
                </FormColumn>
            </FormRow>
            <FormRow>
                <FormColumn span={10}>
                    <FormInput name="alta.nucleoAlta" label="Núcleo de:" />
                </FormColumn>
                <FormColumn span={2}>
                    <FormInput name="alta.dataAlta" label="Data da Alta:" type="date" />
                </FormColumn>
            </FormRow>
            <FormRow>
                <FormColumn>
                    <AssinaturaPdfButton className="pt-2" action="open" type="button"/>
                </FormColumn>
            </FormRow>
          </FormSection>
        </div>
    );
}