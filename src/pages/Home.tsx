import {useAuthStore} from "../store/authStore.ts";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const Home = () => {
    const accessToken = useAuthStore((state) => state.accessToken);
    const [ready, setReady] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        const t = setTimeout(() => setReady(true), 1000);
        return () => clearTimeout(t);
    }, []);

    const splashVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit:   { opacity: 0 },
    };

    const contentVariants = {
        initial: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
        animate: { opacity: 1, y: 0 },
        exit:    { opacity: 0, y: shouldReduceMotion ? 0 : -8 },
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            <AnimatePresence mode="wait">
                {!ready ? (
                    <motion.div
                        key="splash"
                        variants={splashVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{duration: 0.35, ease: "easeOut"}}
                        aria-busy="true"
                        aria-live="polite"
                    >
                        <div
                            className="
                            w-12 h-12 border-4 border-mindlog dark:border-mindlog-300
                            border-t-transparent dark:border-t-transparent
                            rounded-full animate-spin
                            "
                        />
                    </motion.div>
                ) : (
                    <motion.main
                        key="content"
                        variants={contentVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{duration: 0.35, ease: "easeOut"}}
                    >
                        <h1 className="text-4xl font-bold text-text-main dark:text-text-main-dark mb-4">Mindlog</h1>
                        <p className="text-lg text-text-sub dark:text-text-sub-dark mb-6">감정을 기록하고, 나를 돌아보는 시간</p>
                        <a
                            href={accessToken ? "/diary" : "/register"}
                            className="mindlog-btn px-6 py-2 rounded-lg mindlog-btn-hover transition"
                        >
                            {accessToken ? ("기록하기") : ("시작하기")}
                        </a>
                    </motion.main>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Home;
