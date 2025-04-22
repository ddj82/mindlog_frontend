import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {loginUser, scheduleAutoLogout} from '../api/authApi';
import { useAuthStore } from '../store/authStore';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setAccessToken = useAuthStore((state) => state.setAccessToken);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = await loginUser(email, password);
            setAccessToken(token); // Zustand에 저장
            scheduleAutoLogout(token);
            alert('로그인 성공!');
            navigate('/');
        } catch (e) {
            console.error('로그인 API 실패', e);
            alert('로그인 실패');
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">로그인</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-text-main border p-3 rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-text-main border p-3 rounded"
                    required
                />
                <button
                    type="submit"
                    className="w-full mindlog-btn py-3 rounded mindlog-btn-hover transition"
                >
                    로그인
                </button>
            </form>
            <div className="text-sm text-text-sub dark:text-text-sub-dark mt-1">
                계정이 없으신가요? <a href="/register" className="mindlog-link">회원가입</a>
            </div>
        </div>
    );
};

export default Login;
