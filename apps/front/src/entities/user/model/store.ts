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
    accessToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NGVmMzAzNzE2MmU1ZDA4MGQ4OTM5NyIsInJvbGVzIjpbIkFETUlOIl0sInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3NTA1MTg1NTYsImV4cCI6MTc1MDUxOTQ1Nn0.jq5cEktW5LIWGktw9BICkgZflFHTQaL_zqz9E9zoytaP1YBu5kyEVaGaIJOnz0eIrOe0dBJs_mjP8v2LiGQBbyt7JGa52JUbIbhAh7rv25oXiW8x7Yrxx663j0-0mtaAUpw9pf9DBeQo1c3EpeIfw6yxCoqCe02AjYb1KLH7v604_iXaU0mPpGsJjuM03mDcY297qAvt7k6gjb-7jeH8umjYQpdh7TvQqWDciVF-5w0edZeIbJ26qsXi2LnOecTCzXIU6RgkgXJCNkONarrMRxCZibhsWI3f8MWutaGl4Law623zfaSAP24arQj3LYxrhoKttDFqqxkvGdG2U9wAtQ",
    refreshToken: "",
    setTokens: (accessToken, refreshToken) => {
        console.log(accessToken)
        set({ accessToken, refreshToken })
    }
}));
