import { obterValor } from '@/commom/primitives/object';
import { useFormContext } from 'react-hook-form';

interface TextAreaProps {
    name?: string;
    label?: string;
}
export const TextArea = ({
    name,
    label,
    required,
    ...props
}: TextAreaProps & React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>) => {
    if (!name)
        return (
            <div className="mb-5">
                {label && (
                    <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-900">
                        {label}
                        {required && '*'}
                    </label>
                )}
                <textarea
                    rows={4}
                    id={name}
                    {...props}
                    className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
            </div>
        );

    const context = useFormContext();

    const {
        register,
        formState: { errors },
    } = context;

    const errorMessages = obterValor(errors, `${name}.message`);
    const hasError = !!(errors && errorMessages);

    return (
        <div className="mb-5">
            {label && (
                <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-900">
                    {label}
                    {required && '*'}
                </label>
            )}
            <textarea
                id={name}
                rows={4}
                {...register(name!)}
                {...props}
                className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
            {hasError && <span className="error text-red-500">{errorMessages}</span>}
        </div>
    );
};
