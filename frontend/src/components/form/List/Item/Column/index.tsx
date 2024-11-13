import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from "react";

export function ListItemColumn({ children, ...props }: ListItemColumnProps) {
    return (
        <td {...props}>
            {children}
        </td>
    )
}

export interface ListItemColumnProps extends PropsWithChildren, DetailedHTMLProps<HTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement> {}
