import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import React from "react";

const plusJakartaSans = Plus_Jakarta_Sans({
    variable: "--font-plus-jakarta",
    subsets: ["latin"]
});

export const metadata = {
    title: "Messenger",
    description: "Secure chat",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${plusJakartaSans.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
