// entities/User/model/store.ts
import { create } from 'zustand';

interface UserState {
    accessToken: string | null;
    isLoading: boolean;
    setTokens: (access: string, refresh: string) => void;
    checkAuth: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    accessToken: null,
    isLoading: true,
    setTokens: (access) => {
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
}));
