// src/pages/auth/ui/LoginPage.tsx
'use client';

import React, { useState } from 'react';
import { FormType } from '@/features/auth/model/models';
import AuthForm from '@/features/auth/ui/AuthForm';

export default function LoginPage() {
    const [formType, setFormType] = useState<FormType>('signin');

    return (
        <div className="p-6 bg-[#19897b] h-screen">
            <AuthForm type={formType} setFormType={setFormType} />
        </div>
    );
}
