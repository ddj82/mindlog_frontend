import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {loginUser, scheduleAutoLogout} from '../api/authApi';
import { useAuthStore } from '../store/authStore';
import CommonAlert from "../util/CommonAlert.tsx";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setAccessToken = useAuthStore((state) => state.setAccessToken);
    const navigate = useNavigate();

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertContent, setAlertContent] = useState("");

    const [apiSuccess, setApiSuccess] = useState(false);

    const handleAlert = (content: string) => {
        setAlertOpen(true);
        setAlertContent(content);
    }

    const handleAlertResponse = (result: boolean) => {
        if (apiSuccess && result) {
            navigate('/');
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await loginUser(email, password);
        if (result.success) {
            setAccessToken(result.data); // Zustand에 저장
            scheduleAutoLogout(result.data);
            setApiSuccess(true);
            handleAlert('로그인 성공!');
        } else {
            if (result.message.message) {
                handleAlert(`${result.message.message}`);
            } else {
                handleAlert('로그인에 실패했습니다.');
            }
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">로그인</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-text-main border p-3 rounded"
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-text-main border p-3 rounded"
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
            {alertOpen && (
                <CommonAlert
                    isOpen={alertOpen}
                    onRequestClose={() => setAlertOpen(false)}
                    content={alertContent}
                    alertResponse={handleAlertResponse}
                />
            )}
        </div>
    );
};

export default Login;
