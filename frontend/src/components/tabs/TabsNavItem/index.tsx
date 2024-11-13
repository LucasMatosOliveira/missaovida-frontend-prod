import { DetailedHTMLProps, MouseEvent, RefObject } from "react";
import { FieldErrors } from "react-hook-form";
import { useTabErros } from "./hook";
import { AbaValidacaoIcon } from "@/components/form/AbaValidacaoIcon";
import { concatClassNames } from "@/components/ui/classname-utils";

export function TabsNavItem({ className, children, tabId, active, errorsAlert, onClick, isTabactive, setTabActive, ...props }: TabsNavItemProps) {
    const { tabsIds } = useTabErros({ context: errorsAlert?.formRef.current ?? null, errors: errorsAlert?.error ?? {} });

    const handleClick = setTabActive ? (event: MouseEvent<HTMLLIElement>) => {
        event.preventDefault();
        setTabActive(tabId);
        onClick?.(event);
    } : onClick;

    if (isTabactive) {
        active = isTabactive(tabId);
    }

    return (
        <li {...props} className={concatClassNames('nav-item', className)} onClick={handleClick}>
            <a className={concatClassNames('nav-link', active ? 'active show' : '')} data-toggle="tab" href={`#${tabId}`}>
                {children}
                {tabsIds[tabId] && <AbaValidacaoIcon />}
            </a>
        </li>
    );
}

export interface TabsNavItemProps extends DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
    tabId: string;
    active?: boolean;
    errorsAlert?: {
        formRef: RefObject<HTMLElement>;
        error: FieldErrors;
    };
    isTabactive?: (tabId: string) => boolean;
    setTabActive: (tabId: string) => void;
}
