'use client'
import { signOut } from 'next-auth/react';
import Icon from 'react-icons-kit';
import { signOut as signOutIcon } from 'react-icons-kit/fa/signOut';
import { AppRoutes } from '@/commom/http/app-routes';
import { cloneAndAddClass } from '@/components/form';
import { ButtonHTMLAttributes } from 'react';

export function SignOutButton({className, ...props}: SignOutButtonProps) {
    const handleSignOut = async () => {
        localStorage.clear();
        await signOut({ callbackUrl: AppRoutes.Login() });
    };

    return (
        <button {...props} onClick={handleSignOut}
            className={cloneAndAddClass("flex items-center p-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none", className)}>
            <Icon icon={signOutIcon} className="mr-2" />
            Sair
        </button>
    );
}

export interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }