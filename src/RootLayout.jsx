import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"

const RootLayout = () => {
    return (
        <div>
            <Header />
            <main className="d-flex">
                <Sidebar />
                <div className="px-4 py-3 main-section">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default RootLayout