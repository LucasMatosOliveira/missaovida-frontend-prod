import { PropsWithChildren } from "react";

export function ListHeaderActions({children}: PropsWithChildren) {
    return (
        <th style={{width: '55px'}}>
            {children}
        </th>
    )
}