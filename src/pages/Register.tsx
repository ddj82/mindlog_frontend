import React, {useState} from "react";
import {register} from "../api/api.ts";
import {useNavigate} from "react-router-dom";
import CommonAlert from "../util/CommonAlert.tsx";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertContent, setAlertContent] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(email, password, nickname);
            // const res = await register(email, password, nickname);
            // console.log('email',email,'password',password,'nickname',nickname);
            // console.log(res);
            handleAlert('회원가입 성공!');
        } catch (e) {
            console.error('회원가입 API 실패', e);
            handleAlert('회원가입 실패');
        }
    };

    const handleAlert = (content: string) => {
        setAlertOpen(true);
        setAlertContent(content);
    }

    const handleAlertResponse = (result: boolean) => {
        if (result) navigate('/login');
    }


    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">회원가입</h2>
            <div className="text-sm text-text-sub dark:text-text-sub-dark">
                이미 계정이 있으신가요? <a href="/login" className="mindlog-link">로그인</a>
            </div>
            <div className="mt-8">
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
                        type="nickname"
                        placeholder="닉네임"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
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
                        가입하기
                    </button>
                </form>
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

export default Register;
