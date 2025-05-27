import { DiaryData } from '../types/DiaryData';

const BASE_URL = import.meta.env.VITE_API_URL;

const defaultHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
};

/*
* 공용 request 메소드 매개 변수
* 1. url 패턴
* 2. 데이터 전송 방식
* 3. 데이터
* */
const request = async (endpoint: string, method: string = 'GET', data?: any) => {
    try {
        const API_URL = BASE_URL + `${endpoint}`;

        const response = await fetch(`${API_URL}`, {
            method: method,
            headers: defaultHeaders(),
            body: data ? JSON.stringify(data) : undefined,
        });

        return response;
    } catch (error) {
        console.error(`API 요청 실패(request): ${endpoint}`, error);
        throw error;  // 전체 오류를 전달
    }
};

// ✅ 회원가입
export const register = async (email: string, password: string, nickname: string) => {
    const res = await request(`/api/auth/register`, "POST", {
        "email": email,
        "password": password,
        "nickname": nickname
    });

    if (!res.ok) {
        throw new Error('내 정보 조회 실패');
    }

    return await res.text();
};

// ✅ 내 정보 조회
export const fetchMyInfo = async () => {
    const res = await request(`/api/users/me`, "GET");

    if (!res.ok) {
        throw new Error('내 정보 조회 실패');
    }

    return await res.json();
};

// ✅ 감정일기 저장
export const saveDiary = async (emotionId: number, emotion: string, note: string, date: string) => {
    const res = await request(`/api/diary`, "POST", {
        "emotionId": emotionId,
        "emotion": emotion,
        "note": note,
        "date": date
    });

    if (!res.ok) {
        throw new Error(`일기 저장 실패: ${res.status}`);
    }

    return await res.text();
};

// ✅ 감정일기 전체 조회
export const fetchAllDiaries = async () => {
    const res = await request(`/api/diary`, "GET");

    if (!res.ok) {
        throw new Error('일기 조회 실패');
    }

    return await res.json();
};

// ✅ 월별 일기 조회
export const fetchMonthlyDiaries = async (year: number, month: number): Promise<DiaryData[]> => {
    const res = await request(`/api/diary/monthly?year=${year}&month=${month}`, "GET");

    if (!res.ok) {
        throw new Error(`월별 일기 조회 실패: ${res.status}`);
    }
    return await res.json();
};

// ✅ 감정일기 수정
export const updateDiary = async (modalDiary: DiaryData) => {
    const res = await request(`/api/diary/${modalDiary.id}`, "PUT", {
        ...modalDiary
    });

    if (!res.ok) {
        throw new Error(`일기 수정 실패: ${res.status}`);
    }

    return await res.text();
};

// ✅ 감정일기 삭제
export const deleteDiary = async (id: number) => {
    const res = await request(`/api/diary/${id}`, "DELETE");

    if (!res.ok) {
        throw new Error(`일기 삭제 실패: ${res.status}`);
    }

    return await res.text();
};