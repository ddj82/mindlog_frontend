import {useAuthStore} from "../store/authStore.ts";

const Home = () => {
    const accessToken = useAuthStore((state) => state.accessToken);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            <h1 className="text-4xl font-bold text-text-main dark:text-text-main-dark mb-4">Mindlog</h1>
            <p className="text-lg text-text-sub dark:text-text-sub-dark mb-6">감정을 기록하고, 나를 돌아보는 시간</p>
            <a
                href={accessToken ? "/diary" : "/register"}
                className="mindlog-btn px-6 py-2 rounded-lg mindlog-btn-hover transition"
            >
                {accessToken ? ("기록하기") : ("시작하기")}
            </a>
        </div>
    );
};

export default Home;
