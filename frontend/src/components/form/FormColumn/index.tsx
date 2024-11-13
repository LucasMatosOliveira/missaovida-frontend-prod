import { cloneAndAddClass } from "..";

export function FormColumn({ span, size, className, children, ...props }: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    size?: 'sm' | 'md' | 'lg'
}) {

    size ??= 'md';
    span ??= 12;

    return <div {...props} className={cloneAndAddClass(`col-${size}-${span}`, 'form-group-rc', className)}>{children}</div>;
}
