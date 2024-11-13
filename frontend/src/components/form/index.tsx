import React, { DetailedHTMLProps, forwardRef } from "react";

const mainClass = 'w-full h-screen items-center justify-center bg-gray-100 text-black form-control-line'

export const Form = forwardRef<HTMLFormElement, DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>>(function Form({ className, children, ...props }, ref) {
    return <form {...props} ref={ref} className={cloneAndAddClass("form-container", className)}>{children}</form>
});

export const cloneAndAddClass = (...classNames : (string | undefined)[]) => {
    return classNames.filter(cn => cn).join(' ')
}
