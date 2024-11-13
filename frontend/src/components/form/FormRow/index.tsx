import { cloneAndAddClass } from "..";

export function FormRow({ className, children, ...props }: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLDivElement>, HTMLDivElement>) {

    return <div {...props} className={cloneAndAddClass('row w-full mt-4', className)}>{children}</div>;
}