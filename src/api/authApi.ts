import axios from 'axios';
import { logout } from '../store/authStore'; // ✅ 주스탠드에서 logout 불러오기 (상대경로 주의!)

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: false,
});

// ✅ 로그인 요청
export const loginUser = async (email: string, password: string) => {
    const res = await api.post('/api/auth/login', { email, password });
    return res.data; // accessToken
};

// ✅ JWT 만료시간에 맞춰 자동 로그아웃
export const scheduleAutoLogout = (token: string) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp; // UNIX timestamp (초 단위)
        const now = Math.floor(Date.now() / 1000); // 현재 시간
        const remaining = exp - now;

        console.log(`[AUTO-LOGOUT] ${remaining}초 후 로그아웃 예정`);

        if (remaining > 0) {
            setTimeout(() => {
                alert("세션이 만료되었습니다. 다시 로그인해주세요.");
                logout(); // ✅ 주스탠드 logout 호출
                window.location.href = "/login";
            }, remaining * 1000); // ms 단위
        }
    } catch (e) {
        console.error("토큰 파싱 실패", e);
    }
};