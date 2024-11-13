import { PropsWithChildren } from "react";

export function ListHeaderColumn({children}: PropsWithChildren) {
    return (
        <th>
            {children}
        </th>
    )
}