import { NavLink } from "react-router-dom"

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul className="m-0 p-0">
                <NavLink to={"/"} className="text-decoration-none ">
                    {({ isActive }) => (
                        <li className="sidebar-link">
                            <img
                                src={isActive ? "/dashboard-white.png" : "/dashboardd.png"}
                                alt="dashboard"
                            />
                            Dashboard
                        </li>
                    )}
                </NavLink>
                <NavLink to={"/tickets"} className="text-decoration-none ">
                    <li className="sidebar-link">
                        <img src="/tickets.svg" alt="tickets" />
                        Tickets
                    </li>
                </NavLink>
                <NavLink to={"/bookings"} className="text-decoration-none ">
                    <li className="sidebar-link">
                        <img src="/bookings.svg" alt="bookings" />
                        Bookings
                    </li>
                </NavLink>
                <NavLink to={"/broadcast"} className="text-decoration-none ">
                    <li className="sidebar-link">
                        <img src="/broadcast.svg" alt="broadcast" />
                        Broadcast
                    </li>
                </NavLink>
                <NavLink to={"/events"} className="text-decoration-none ">
                    {({ isActive }) => (
                        <li className="sidebar-link">
                            <img
                                src={isActive ? "/events-white.png" : "/event.png"}
                                alt="dashboard"
                            />
                            Events
                        </li>
                    )}
                </NavLink>
                <NavLink to={"/user"} className="text-decoration-none ">
                    <li className="sidebar-link">
                        <img src="/user.svg" alt="user" />
                        My User
                    </li>
                </NavLink>
            </ul>
        </div>
    )
}

export default Sidebar