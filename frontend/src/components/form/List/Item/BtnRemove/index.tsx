import { DetailedHTMLProps, HTMLAttributes } from "react";
import Icon from "react-icons-kit";
import { remove } from 'react-icons-kit/fa/remove';

export function ListItemBtnRemove(props: ListItemBtnRemoveProps) {
    return (
        <button {...props} className="vta-center" type="button">
            <Icon icon={remove} style={{ color: 'gray' }} />
        </button>
    );
}

export interface ListItemBtnRemoveProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}
