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
    const [apiSuccess, setApiSuccess] = useState(false);

    // 오류 메시지 상태 추가
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: { [key: string]: string } = {}; // 새로운 오류 객체

        // 이메일 유효성 검사
        if (!email.trim()) {
            newErrors.email = "이메일을 입력하세요.";
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            // newErrors.email = "올바른 이메일 형식이 아닙니다.";
        }

        // 닉네임 유효성 검사
        if (!nickname.trim()) {
            newErrors.nickname = "닉네임을 입력하세요.";
        }

        // 비밀번호 유효성 검사
        if (!password.trim()) {
            newErrors.password = "비밀번호를 입력하세요.";
        }

        // 오류가 있으면 상태 업데이트 후 진행 중지
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // 오류가 없으면 초기화 후 진행
        setErrors({});

        const result = await register(email, password, nickname);

        if (result.success) {
            setApiSuccess(true);
            handleAlert('회원가입 성공!');
        } else {
            handleAlert(`${result.message}`);
        }
    };

    const handleAlert = (content: string) => {
        setAlertOpen(true);
        setAlertContent(content);
    }

    const handleAlertResponse = (result: boolean) => {
        if (apiSuccess && result) {
            navigate('/login');
        }
    }


    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">회원가입</h2>
            <div className="text-sm text-text-sub dark:text-text-sub-dark">
                이미 계정이 있으신가요? <a href="/login" className="mindlog-link">로그인</a>
            </div>
            <div className="mt-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="이메일"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full text-text-main border p-3 rounded"
                        />
                        {errors.email && <p className="font-bold text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div>
                        <input
                            type="nickname"
                            placeholder="닉네임"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            className="w-full text-text-main border p-3 rounded"
                        />
                        {errors.nickname && <p className="font-bold text-red-500 text-sm">{errors.nickname}</p>}
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full text-text-main border p-3 rounded"
                        />
                        {errors.password && <p className="font-bold text-red-500 text-sm">{errors.password}</p>}
                    </div>
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
