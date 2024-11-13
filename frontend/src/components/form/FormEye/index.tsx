import { Icon } from 'react-icons-kit';

export function FormEye({ size, icon, handleToggle }: FormEyeProps) {
    return (
        <span className="absolute right-0 top-0 mt-2 mr-3 cursor-pointer">
            <Icon icon={icon} size={size} onClick={handleToggle} style={{ color: 'gray' }} />
        </span>
    )
}

export interface FormEyeProps {
    size: number;
    icon: any;
    handleToggle: () => void;
}


