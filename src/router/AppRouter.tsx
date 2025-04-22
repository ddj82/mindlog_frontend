import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import ProtectedAuthRoute from "./ProtectedAuthRoute";

// 페이지 컴포넌트
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Diary from "../pages/Diary";
import EmotionCalendar from "../pages/EmotionCalendar.tsx";
import Stats from "../pages/Stats";
import MyPage from "../pages/MyPage";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    {/* 공개 라우트 */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* 보호 라우트 */}
                    <Route element={<ProtectedAuthRoute />}>
                        <Route path="/diary" element={<Diary />} />
                        <Route path="/calendar" element={<EmotionCalendar />} />
                        <Route path="/stats" element={<Stats />} />
                        <Route path="/mypage" element={<MyPage />} />
                    </Route>
                </Route>

                {/* 잘못된 경로 → 홈 */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
