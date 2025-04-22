import { DiaryData } from '../types/DiaryData';

const API_URL = import.meta.env.VITE_API_URL;

const defaultHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
};

// ✅ 회원가입
export const register = async (email: string, password: string, nickname: string) => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: defaultHeaders(),
        body: JSON.stringify({ email, password, nickname }),
    });

    if (!res.ok) {
        throw new Error('내 정보 조회 실패');
    }

    return await res.text();
};

// ✅ 감정일기 저장
export const saveDiary = async (emotion: string, note: string, date: string) => {
    const res = await fetch(`${API_URL}/api/diary`, {
        method: 'POST',
        headers: defaultHeaders(),
        body: JSON.stringify({ emotion, note, date }),
    });

    if (!res.ok) {
        throw new Error(`일기 저장 실패: ${res.status}`);
    }

    return await res.text();
};

// ✅ 감정일기 전체 조회
export const fetchAllDiaries = async () => {
    const res = await fetch(`${API_URL}/api/diary`, {
        method: 'GET',
        headers: defaultHeaders(),
    });

    if (!res.ok) {
        throw new Error('일기 조회 실패');
    }

    return await res.json();
};

// ✅ 내 정보 조회
export const fetchMyInfo = async () => {
    const res = await fetch(`${API_URL}/api/users/me`, {
        method: 'GET',
        headers: defaultHeaders(),
    });

    if (!res.ok) {
        throw new Error('내 정보 조회 실패');
    }

    return await res.json();
};

// ✅ 월별 일기 조회
export const fetchMonthlyDiaries = async (year: number, month: number): Promise<DiaryData[]> => {
    const res = await fetch(`${API_URL}/api/diary/monthly?year=${year}&month=${month}`, {
        method: 'GET',
        headers: defaultHeaders(),
    });
    if (!res.ok) {
        throw new Error(`월별 일기 조회 실패: ${res.status}`);
    }
    return await res.json();
};