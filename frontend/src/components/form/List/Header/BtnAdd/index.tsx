import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import Icon from "react-icons-kit";
import { plus } from 'react-icons-kit/fa/plus';

export function ListHeaderBtnAdd(props: ListHeaderBtnAddProps) {
    return (
        <button {...props} title="Adicionar novo item" type="button" className="btn btn-primary btn-circle bg-customGreen hover:bg-customGreenHover">
            <Icon icon={plus} className="text-white"  />
        </button>
    )
}

export interface ListHeaderBtnAddProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}
