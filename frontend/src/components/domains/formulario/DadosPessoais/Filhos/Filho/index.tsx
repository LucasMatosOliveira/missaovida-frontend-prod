import { FormInput } from "@/components/form/FormInput";
import { FormColumn } from "@/components/form/FormColumn";
import { FormRow } from "@/components/form/FormRow";
import { FormCheckbox } from "@/components/form/FormCheckbox";
import { ListItemColumn, ListItemBtnRemove, ListItem } from "@/components/form/List";

export function Filho({ index, onDelete }: FilhoProps) {
    return (
        <ListItem>
            <ListItemColumn>
                <FormRow className="m-2 mb-3">
                    <FormColumn span={6}>
                        <FormInput name={`filhos.${index}.nome`} label="Nome" />
                    </FormColumn>
                    <FormColumn span={6} className="mt-3">
                        <FormCheckbox name={`filhos.${index}.pagaPensao`} label="Paga pensão" />
                    </FormColumn>
                </FormRow>
            </ListItemColumn>
            <ListItemColumn>
                <ListItemBtnRemove onClick={onDelete}/>
            </ListItemColumn>
        </ListItem>
    )
}

export interface FilhoProps {
    onDelete: () => void;
    index: number;
}

