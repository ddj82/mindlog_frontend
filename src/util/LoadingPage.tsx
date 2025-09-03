import { useEffect } from "react";
import { createPortal } from "react-dom";

type LoadingPageProps = {
    open: boolean;
    loadingMessage?: string;
};

const LoadingPage = ({ open, loadingMessage = "처리 중..." }: LoadingPageProps) => {
    // 열릴 때 스크롤 잠금
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    if (!open) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex-center">
            {/* 배경 */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            {/* 컨텐트 */}
            <div className="relative mindlog-bg rounded-2xl shadow-xl px-6 py-5 flex items-center gap-3">
                {/* 스피너 */}
                <div className="w-6 h-6 border-2 border-mindlog dark:border-mindlog-300 border-t-transparent rounded-full animate-spin"/>
                <span className="text-sm">{loadingMessage}</span>
            </div>
        </div>,
        document.body
    );
};

export default LoadingPage;
