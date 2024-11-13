import { concatClassNames } from "@/components/ui/classname-utils";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export function TabsNav({ className, children, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>) {
    return <ul className={concatClassNames("nav nav-tabs", className)} {...props}>{children}</ul>
}
