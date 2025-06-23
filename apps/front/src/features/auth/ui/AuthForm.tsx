'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { handleSignin, handleSignup } from '@/features/auth/model/api';
import { FormType, FormValues } from '@/features/auth/model/models';
import { useUserStore } from '@/entities/User/model/store';
import { useRouter } from 'next/navigation';
import Button from '@/shared/ui/button/Button';

interface AuthFormProps {
    type: FormType;
    setFormType: (type: FormType) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, setFormType }) => {
    const isSignup = type === 'signup';
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const setTokens = useUserStore(state => state.setTokens);
    const router = useRouter();

    const formik = useFormik<FormValues>({
        initialValues: {
            username: '',
            password: '',
            phone: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
            ...(isSignup && { phone: Yup.string().required('Required') }),
        }),
        onSubmit: async (values) => {
            setError(null);
            setLoading(true);
            try {
                const data = isSignup
                    ? await handleSignup(values)
                    : await handleSignin(values);

                if (!isSignup) {
                    setTokens(data.accessToken, data.refreshToken);
                    router.push('/');
                } else {
                    console.log('Auth success:', data);
                }
            } catch (e) {
                setError('Ошибка авторизации');
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4 max-w-sm mx-auto mt-10 bg-white py-4 px-16 rounded-3xl min-w-[500px]">
            <h2 className='mb-6 text-center font-semibold text-[28px]'>Login to your account</h2>
            <div>
                <label htmlFor="username" className="block text-sm font-medium mb-2">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete='username'
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    className="w-full px-3 py-2 border rounded"
                />
                {formik.touched.username && formik.errors.username && (
                    <p className="text-red-500 text-sm">{formik.errors.username}</p>
                )}
            </div>

            <div>
                <div className='flex items-center justify-between mb-3'>
                    <label htmlFor="password" className="block text-sm font-medium">Password</label>
                    {!isSignup && (<label><span className='text-[#19897b] cursor-pointer'>Forgot?</span></label>)}
                </div>

                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className="w-full px-3 py-2 border rounded"
                />
                {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-sm">{formik.errors.password}</p>
                )}
            </div>

            {isSignup && (
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone</label>
                    <input
                        id="phone"
                        name="phone"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {formik.touched.phone && formik.errors.phone && (
                        <p className="text-red-500 text-sm">{formik.errors.phone}</p>
                    )}
                </div>
            )}

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <Button type='submit' disabled={loading} className='mt-4'>
                {loading ? 'Loading...' : isSignup ? 'Sign Up' : 'Sign In'}
            </Button>

            <div className='w-full text-center'>
                {!isSignup ? (
                    <label>Don't have an account? <span className='text-[#19897b] cursor-pointer' onClick={() => setFormType('signup')}>Sign up</span></label>
                ) : (
                    <label>Already have an account? <span className='text-[#19897b] cursor-pointer' onClick={() => setFormType('signin')}>Log in</span></label>
                )}
            </div>
        </form>
    );
};

export default AuthForm;
