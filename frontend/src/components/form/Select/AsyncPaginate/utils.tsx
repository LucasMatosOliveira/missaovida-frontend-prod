import { ReactNode, RefAttributes } from "react";
import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";
import { cloneAndAddClass } from "../..";

export const Menu = (props: JSX.IntrinsicElements['div']) => {
    const shadow = 'hsla(218, 50%, 10%, 0.1)';
    return (
        <div
            style={{
                backgroundColor: 'white',
                borderRadius: 4,
                boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
                marginTop: 8,
                position: 'absolute',
                zIndex: 2,
                width: '100%'
            }}
            {...props}
        />
    );
};

export const Blanket = (props: JSX.IntrinsicElements['div']) => (
    <div
        style={{
            bottom: 0,
            left: 0,
            top: 0,
            right: 0,
            position: 'fixed',
            zIndex: 1,
        }}
        {...props}
    />
);

export const Dropdown = ({
    children,
    isOpen,
    target,
    onClose,
}: {
    children?: ReactNode;
    readonly isOpen: boolean;
    readonly target: ReactNode;
    readonly onClose: () => void;
}) => (
    <div style={{ position: 'relative', width: '100%' }}>
        {target}
        {isOpen ? <Menu>{children}</Menu> : null}
        {isOpen ? <Blanket onClick={onClose} /> : null}
    </div>
);

export const Svg = (props: JSX.IntrinsicElements['svg']) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        focusable="false"
        role="presentation"
        {...props}
    />
);

export const ChevronDown = () => (
    <Svg style={{ marginRight: -6 }}>
        <path
            d="M8.292 10.293a1.009 1.009 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0z"
            fill="currentColor"
            fillRule="evenodd"
        />
    </Svg>
);

export const SelectButton = ({ children, className, ...props }: Omit<ButtonProps, "ref"> & RefAttributes<HTMLButtonElement>) => {
    return (
        <Button {...props}
            className={cloneAndAddClass("select-button", className)}>
            {children}
        </Button>);
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ primary, secondary, warn, type, className, children, ...props }, ref) {

    const classes = cloneAndAddClass('btn btn-sm',
        primary ? 'btn-outline-primary' : undefined,
        secondary ? 'btn-outline-secondary' : undefined,
        warn ? 'btn-outline-warning' : undefined,
        className);

    return (
        <button
            {...props}
            ref={ref}
            type={type ?? "button"}
            className={classes}>
            {children}
        </button>
    );
})

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    primary?: true;
    secondary?: true;
    warn?: true;
}