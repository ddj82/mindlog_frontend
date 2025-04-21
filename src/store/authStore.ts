import { create } from 'zustand';

interface AuthState {
    accessToken: string | null;
    setAccessToken: (token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: localStorage.getItem('accessToken'), // 앱 시작 시 자동 복구
    setAccessToken: (token) => {
        localStorage.setItem('accessToken', token);
        set({ accessToken: token });
    },
    logout: () => {
        localStorage.removeItem('accessToken');
        set({ accessToken: null });
    },
}));

export const logout = () => useAuthStore.getState().logout();