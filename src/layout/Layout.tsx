import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";

const Layout = () => {
    return (
        <div className="relative">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
