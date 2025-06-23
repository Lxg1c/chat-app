import React from "react";

interface IButton {
    type: "submit" | "button";
    disabled: boolean;
    children: React.ReactNode;
    className?: string;
}

const Button = ({ type, disabled, children, className = '' }: IButton) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`w-full rounded-full bg-[#19897b] text-white px-4 py-2 transition-opacity ${
                disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
            } ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
