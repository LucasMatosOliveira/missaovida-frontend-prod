import { PropsWithChildren } from "react";

export function ListItem({ children }: PropsWithChildren) {
    return (
        <tr>
            {children}
        </tr>
    )
}