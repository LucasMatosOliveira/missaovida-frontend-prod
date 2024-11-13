
import { useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { createFakeTempGUID } from "@/commom/primitives/guid";
import { List, ListBody, ListHeader, ListHeaderActions, ListHeaderColumn, ListHeaderBtnAdd } from "@/components/form/List";
import { Filho } from "./Filho";
import { useAppFieldArray, useAppFormContext } from "@/components/form/hook";
import { InternosInsaltSchema } from "../../schema";

export function FilhosInsalt() {
    const fakeId = useMemo(() => createFakeTempGUID(), []);

    const context = useAppFormContext();
    const { control } = context;

    const { fields, append, remove } = useAppFieldArray<InternosInsaltSchema>({
        control,
        name: 'filhos'
    });

    const addFilho = () => {
        append({
            id: fakeId.next(),
            nome: undefined!,
            idade: undefined!
        });
    }

    return (
        <div className="form-control-line mt-10">
            <List>
                <ListHeader>
                    <ListHeaderColumn>
                        <span>Filhos</span>
                    </ListHeaderColumn>
                    <ListHeaderActions>
                        <ListHeaderBtnAdd onClick={addFilho} />
                    </ListHeaderActions>
                </ListHeader>
                <ListBody>
                    {fields.map((field, index) => (
                        <Filho key={field.id} index={index} onDelete={() => remove(index)} />
                    ))}
                </ListBody>
            </List>
        </div>
    )
}