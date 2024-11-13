import { cloneAndAddClass } from "@/components/form";
import { ButtonHTMLAttributes } from "react";
import Icon from "react-icons-kit";
import { filePdfO } from 'react-icons-kit/fa/filePdfO';
import { useAssinaturaPdfButton } from "./hook";
import { EstadoUF } from "@/components/domains/formulario/entidades";

export function AssinaturaPdfButton({nomeAcolhido, action, estado, className, ...props}: AssinaturaPdfButtonProps) {
    const {generatePDF} = useAssinaturaPdfButton({nomeAcolhido, action, estado})
    return (
        <button {...props} onClick={generatePDF}
            className={cloneAndAddClass("flex items-center p-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none", className)}>
            <Icon icon={filePdfO} className="mr-2" />
            Gerar PDF
        </button>
    )
}

export interface AssinaturaPdfButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    nomeAcolhido?: string;
    action: 'open' | 'download';
    estado?: EstadoUF;
}