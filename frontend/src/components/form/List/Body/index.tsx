import { PropsWithChildren } from "react";

export function ListBody({children}: PropsWithChildren) {
    return (
        <tbody>
            {children}
        </tbody>
    )
}