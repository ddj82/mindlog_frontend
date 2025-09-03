import {Outlet, useLocation} from "react-router-dom";
import Header from "../components/common/Header";
import {AnimatePresence, motion} from "framer-motion";

const Layout = () => {
    const location = useLocation();
    const variants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <div className="relative">
            <Header />
            <main>
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={location.pathname}
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default Layout;
