export type FormType = 'signup' | 'signin';

export interface FormValues {
    username: string;
    password: string;
    phone?: string;
}