import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

const Layout = () => {
    const [loading, setLoading] = useState(true);

    // 페이지 로드 시 딜레이
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative">
            <AnimatePresence>
                {loading ? (
                    <div></div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <Header />
                        <Outlet />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Layout;
