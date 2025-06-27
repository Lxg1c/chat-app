'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '@/entities/User/model/store';
import {connectSocket} from "@/shared/lib/socket";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();

    const { accessToken, isLoading, checkAuth } = useUserStore();

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        const handleWSConnection = () => {
            try {
                if (!accessToken) {
                    console.log('accessToken is missing. Ws connection is not available');
                    return;
                }
                connectSocket(accessToken)
            } catch (e) {
                console.error(e)
            }
        }
        if (!isLoading) {
            const isAuthPage = pathname.startsWith("/auth");
            if (!accessToken && !isAuthPage) {
                router.push("/auth");
            } else if (accessToken && isAuthPage) {
                router.push("/");
            }

        }

        handleWSConnection()
    }, [accessToken, isLoading, pathname]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl">Загрузка...</p>
            </div>
        );
    }

    return <>{children}</>;
};
