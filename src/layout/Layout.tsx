import {Outlet, useLocation} from "react-router-dom";
import Header from "../components/common/Header";
import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useState} from "react";

const Layout = () => {
    const location = useLocation();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(false);
        // 약간의 지연을 주어 컴포넌트가 완전히 언마운트된 후 새로운 컴포넌트를 렌더링
        const timer = setTimeout(() => setIsReady(true), 10);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <div className="relative">
            <Header />
            <main>
                <AnimatePresence mode="wait" initial={false}>
                    {isReady && (
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                        >
                            <Outlet />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default Layout;
