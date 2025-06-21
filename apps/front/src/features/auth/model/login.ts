import { axiosInstance } from "@/shared/api/axiosInstance";
import { useUserStore } from "@/entities/user/model/store";

export const login = async (username: string, password: string) => {
    try {
        const response = await axiosInstance.post("/login", {
            username,
            password,
        });

        const { accessToken, refreshToken } = response.data;

        useUserStore.getState().setTokens(accessToken, refreshToken);
        return { accessToken, refreshToken };
    } catch (error) {
        console.error("❌ Login error:", error);
        return false;
    }
};
