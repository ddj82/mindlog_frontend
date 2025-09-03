import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useThemeStore } from "../../store/themeStore";
import {Moon, Sun, Type} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import CommonAlert from "../../util/CommonAlert.tsx";
import {
    FONT_STORAGE_KEY,
    DEFAULT_FONT,
    FONT_OPTIONS,
    type FontName,
    isFontName,
    applyFont,
} from "../../types/font.ts"
import AccordionItem from "../../util/AccordionItem.tsx";
import LoadingPage from "../../util/LoadingPage.tsx";

const Header = () => {
    const accessToken = useAuthStore((state) => state.accessToken);
    const logout = useAuthStore((state) => state.logout);
    const isDarkMode = useThemeStore((state) => state.isDarkMode);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);
    const navigate = useNavigate();

    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [currentFont, setCurrentFont] = useState<FontName>(DEFAULT_FONT);

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertContent, setAlertContent] = useState("");

    // 마운트 시 저장된 폰트 복원
    useEffect(() => {
        const saved = localStorage.getItem(FONT_STORAGE_KEY);
        const initial = isFontName(saved) ? (saved as FontName) : DEFAULT_FONT;
        setCurrentFont(initial);
        applyFont(initial);
    }, []);

    const handleAlert = (content: string) => {
        setAlertOpen(true);
        setAlertContent(content);
    }

    const handleAlertResponse = (result: boolean) => {
        if (result) navigate('/login');
    }

    const handleLogout = () => {
        logout();
        handleAlert("로그아웃 되었습니다.");
    };

    const handleLogo = () => {
        navigate("/");
        window.location.reload();
    };

    const toggleAccordion = () => {
        setIsAccordionOpen((prev) => !prev);
    };

    const closeAccordion = () => {
        setIsAccordionOpen(false);
    };

    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if (!wrapperRef.current || wrapperRef.current.contains(event.target as Node)) {
                return;
            }
            closeAccordion();
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, []);

    const handleFontChange = (font: FontName) => {
        setCurrentFont(font);
        applyFont(font);
        localStorage.setItem(FONT_STORAGE_KEY, font);
        setIsAccordionOpen(false);
        handleFontChangeLoading();
    };

    const [loading, setLoading] = useState(false);

    // 딜레이
    const handleFontChangeLoading = () => {
        setLoading(true);
        window.setTimeout(() => setLoading(false), 500);
    };

    return (
        <header
            className="sticky top-0 mindlog-bg border-b border-gray-300 dark:border-gray-700 px-4 py-3 flex justify-between items-center"
        >
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
                        {/*<Link to="/stats">통계</Link>*/}
                        <Link to="/mypage">마이페이지</Link>
                        <button onClick={handleLogout} className="text-red-500">로그아웃</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">로그인</Link>
                        <Link to="/register">회원가입</Link>
                    </>
                )}

                <div ref={wrapperRef} className="flex-center relative">
                    <button
                        type="button"
                        onClick={toggleAccordion}
                    >
                        <Type size={18}/>
                    </button>

                    <div className="absolute top-7 left-[-40px] md:left-[-50px] z-50">
                        <AccordionItem isOpen={isAccordionOpen}>
                            <div
                                className="
                                    flex flex-col items-start gap-2 rounded-lg py-2 px-3
                                    bg-theme-light/30 dark:bg-theme-dark/30
                                    border border-black/30 dark:border-white/30
                                    "
                            >
                                {FONT_OPTIONS.map((f) => (
                                    <button
                                        key={f}
                                        type="button"
                                        onClick={() => handleFontChange(f)}
                                        aria-pressed={currentFont === f}
                                        className={currentFont === f ? "font-bold underline" : ""}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </AccordionItem>
                    </div>
                </div>

                {/* 🌙 다크모드 토글 */}
                <button onClick={toggleTheme} className="ml-2">
                    {isDarkMode ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
                </button>
            </div>
            {alertOpen && (
                <CommonAlert
                    isOpen={alertOpen}
                    onRequestClose={() => setAlertOpen(false)}
                    content={alertContent}
                    alertResponse={handleAlertResponse}
                />
            )}
            <LoadingPage open={loading} loadingMessage="폰트 적용 중..." />
        </header>
    );
};

export default Header;
