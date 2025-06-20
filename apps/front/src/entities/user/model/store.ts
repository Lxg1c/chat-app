import { create } from "zustand";

interface UserState {
    username: string;
    phone: string;
    accessToken: string;
    refreshToken: string;
    setTokens: (accessToken: string, refreshToken: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
    username: "",
    phone: "",
    accessToken: "",
    refreshToken: "",
    setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
}));
