import { axiosInstance } from "@/shared/api/axiosInstance";
import {FormValues} from "@/features/auth/model/models";


export const handleSignup = async (values: FormValues) => {
    try {
        const { data } = await axiosInstance.post('/register', values);
        return data;
    } catch (e) {
        console.error('Signup error:', e);
        throw e;
    }
};

export const handleSignin = async (values: FormValues) => {
    try {
        const response = await axiosInstance.post('/login', values);
        const { accessToken, refreshToken } = response.data;
        return { accessToken, refreshToken };
    } catch (e) {
        console.error('Signin error:', e);
        throw e;
    }
};

export const handleRefresh = async () => {
    try {
        const response = await axiosInstance.post('/api/auth/refresh', null, {
            withCredentials: true
        });
        return response.data;
    } catch (e) {
        console.error('Refresh error:', e);
        throw e;
    }
}
