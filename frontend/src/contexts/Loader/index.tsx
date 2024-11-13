'use client'
import React from "react";
import { useSpinner } from "@/contexts/SpinnerContext";

export function PreLoader() {
    const { isVisible, message } = useSpinner();

    if(!isVisible) return null;

    return (
            <div className="preloader-container">
                <div className="preloader">
                    <svg className="circular" viewBox="25 25 50 50">
                        <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
                    </svg>
                    <span className="preloader-message">{message}</span>
                </div>
            </div>
    );
}
