import AppRouter from "./router/AppRouter.tsx";
import {useEffect} from "react";
import {useThemeStore} from "./store/themeStore.ts";
import {scheduleAutoLogout} from "./api/authApi.ts";

function App() {
    const isDarkMode = useThemeStore((state) => state.isDarkMode);

    // ✅ App 시작 시 최초 1번만 실행되도록
    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDarkMode);
        const token = localStorage.getItem('accessToken');
        if (token) {
            scheduleAutoLogout(token); // 앱 실행 시 토큰 있으면 자동 로그아웃 예약
        }
    }, []);

    // ✅ 상태 변경 시도할 때도 실행
    useEffect(() => {
        const classList = document.documentElement.classList;
        if (isDarkMode) {
            classList.add("dark");
        } else {
            classList.remove("dark");
        }
    }, [isDarkMode]);

    return (
        <div
            className="min-h-screen bg-mindlog-light text-text-main dark:bg-mindlog-dark dark:text-text-main-dark transition-colors">
            <AppRouter/>
        </div>
    )
}

export default App
