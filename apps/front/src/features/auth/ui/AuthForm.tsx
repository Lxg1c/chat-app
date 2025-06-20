"use client";

import { useState } from "react";
import { login } from "../model/login";

export const AuthForm = () => {
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("adminpassword");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(username, password);
        if (success) {
            alert("✅ Login successful");
        } else {
            alert("❌ Login failed");
        }
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-semibold">Login</h2>

                <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="text-sm text-right text-blue-600 hover:underline cursor-pointer">
                    Forgot password?
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                    Sign In
                </button>

                <div className="text-sm text-center text-gray-600">
                    Don’t have an account? <span className="text-blue-600 hover:underline cursor-pointer">Register for free</span>
                </div>
            </form>
        </div>
    );
};
