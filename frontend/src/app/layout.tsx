import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthSessionProvider from "@/providers/sessionProvider";
import { SpinnerProvider } from "@/contexts/SpinnerContext";
import { PreLoader } from "@/contexts/Loader";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Missão Vida",
    description: "Missão Vida",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
                <NextAuthSessionProvider>
                    <SpinnerProvider>
                        <PreLoader />
                        {children}
                    </SpinnerProvider>
                </NextAuthSessionProvider>
            </body>
        </html>
    );
}
