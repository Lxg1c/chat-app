// entities/User/model/store.ts
import { create } from 'zustand';

interface UserState {
    username: string | null;
    phone: string | null;
    accessToken: string | null;
    isLoading: boolean;
    setUserInfo: (username: string, phone: string) => void;
    setAccessTokens: (access: string) => void;
    checkAuth: () => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    username: null,
    phone: null,
    accessToken: null,
    isLoading: true,
    setUserInfo: (username, phone) => {
        set({username: username, phone: phone})
    },
    setAccessTokens: (access) => {
        localStorage.setItem('accessToken', access);
        set({ accessToken: access });
    },
    checkAuth: () => {
        const access = localStorage.getItem('accessToken');

        set({
            accessToken: access,
            isLoading: false,
        });
    },
    clearUser: () => {
        localStorage.removeItem('accessToken');
        set({ username: null, phone: null, accessToken: null, isLoading: false });
    }
}));
