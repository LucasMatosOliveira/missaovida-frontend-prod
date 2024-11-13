import { PropsWithChildren } from "react";

export function ListHeader({children}: PropsWithChildren) {
    return (
        <thead>
            <tr>
                {children}
            </tr>
        </thead>
    )
}