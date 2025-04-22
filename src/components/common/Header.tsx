import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useThemeStore } from "../../store/themeStore";
import { Moon, Sun } from "lucide-react"; // lucide-react 설치했다면 이걸로 아이콘

const Header = () => {
    const accessToken = useAuthStore((state) => state.accessToken);
    const logout = useAuthStore((state) => state.logout);
    const isDarkMode = useThemeStore((state) => state.isDarkMode);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        alert("로그아웃 되었습니다.");
        navigate("/");
    };

    const handleLogo = () => {
        navigate("/");
        window.location.reload();
    };

    return (
        <header className="border-b border-gray-300 dark:border-gray-700 px-4 py-3 flex justify-between items-center">
            <button
                type="button"
                onClick={handleLogo}
                className="text-xl font-bold text-mindlog dark:text-mindlog-300"
            >
                Mindlog
            </button>

            <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm">
                {accessToken ? (
                    <>
                        <Link to="/diary">감정기록</Link>
                        <Link to="/calendar">캘린더</Link>
                        <Link to="/stats">통계</Link>
                        <Link to="/mypage">마이페이지</Link>
                        <button onClick={handleLogout} className="text-red-500">로그아웃</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">로그인</Link>
                        <Link to="/register">회원가입</Link>
                    </>
                )}

                {/* 🌙 다크모드 토글 */}
                <button onClick={toggleTheme} className="ml-2">
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>
        </header>
    );
};

export default Header;
