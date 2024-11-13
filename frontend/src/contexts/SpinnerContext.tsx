'use client'
import React, { createContext, useState, useContext, PropsWithChildren } from 'react';

interface SpinnerContextType {
    showSpinner: (message?: string) => void;
    hideSpinner: () => void;
    isVisible: boolean;
    message: string;
}

const SpinnerContext = createContext<SpinnerContextType | undefined>(undefined);

export function SpinnerProvider({ children }: PropsWithChildren) {
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState("");

    const showSpinner = (message: string = "") => {
        setMessage(message);
        setIsVisible(true);
    };

    const hideSpinner = () => {
        setIsVisible(false);
        setMessage("");
    };

    return (
        <SpinnerContext.Provider value={{ showSpinner, hideSpinner, isVisible, message }}>
            {children}
        </SpinnerContext.Provider>
    );
}

export function useSpinner() {
    const context = useContext(SpinnerContext);
    if (!context) {
        throw new Error('useSpinner deve ser usado dentro de um SpinnerProvider');
    }
    return context;
}