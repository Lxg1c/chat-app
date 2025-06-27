'use client'

import Image from 'next/image'
import { axiosInstance } from "@/shared/api/axiosInstance";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/entities/User/model/store";
import { useRouter } from "next/navigation";

const UserProfile = () => {
    const accessToken = useUserStore(state => state.accessToken);
    const setAccessToken = useUserStore(state => state.setAccessTokens);
    const setUserInfo = useUserStore(state => state.setUserInfo);
    const clearUser = useUserStore(state => state.clearUser);
    const username = useUserStore(state => state.username);

    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleModal = () => {
        setShowModal(prev => !prev);
    };

    const handleLogout = () => {
        clearUser();
        router.push('/auth');
    }

    // Закрытие при клике вне модалки
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setShowModal(false);
            }
        };

        if (showModal) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showModal]);

    const getUserInfo = async (token: string) => {
        const response = await axiosInstance.get('/about', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setUserInfo(response.data.username, response.data.phone);
    };

    const handleRefreshToken = async () => {
        try {
            const response = await axiosInstance.post('/refresh');
            const newAccessToken = response.data.accessToken;

            if (!newAccessToken) {
                throw new Error("No token returned");
            }

            setAccessToken(newAccessToken);
            await getUserInfo(newAccessToken);
        } catch (e) {
            console.error("Ошибка при обновлении токена", e);
            clearUser();
            router.push('/auth');
        }
    };

    // Получение информации о пользователе
    useEffect(() => {
        if (!accessToken) return;

        getUserInfo(accessToken).catch(err => {
            console.error("Ошибка получения информации о пользователе", err);
            handleRefreshToken();
        });
    }, [accessToken]);

    return (
        <section className="user-profile flex justify-between items-center mb-6">
            <div className='flex gap-4 items-center'>
                <Image src='/avatar.png' alt="avatar" width={40} height={40} />
                <h2>{username}</h2>
            </div>

            <div className='relative'>
                <Image
                    onClick={handleModal}
                    src='/Arrow - Down 2.svg'
                    alt="options"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                />

                {showModal && (
                    <div
                        ref={modalRef}
                        className='absolute -left-15 border border-black z-10 bg-white p-4 rounded-2xl space-y-2'
                    >
                        <h2 className="cursor-pointer">Профиль</h2>
                        <h2 className="cursor-pointer" onClick={handleLogout}>Выйти</h2>
                    </div>
                )}
            </div>
        </section>
    );
};

export default UserProfile;
