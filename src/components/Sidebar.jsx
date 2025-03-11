import { NavLink } from "react-router-dom"

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul className="m-0 p-0">
                <NavLink to={"/"} className="text-decoration-none ">
                    <li className="sidebar-link">
                        Dashboard
                    </li>
                </NavLink>
                <NavLink to={"/tickets"} className="text-decoration-none ">
                    <li className="sidebar-link">
                        Tickets
                    </li>
                </NavLink>
                <NavLink to={"/bookings"} className="text-decoration-none ">
                    <li className="sidebar-link">
                        Bookings
                    </li>
                </NavLink>
                <NavLink to={"/broadcast"} className="text-decoration-none ">
                    <li className="sidebar-link">
                        Broadcast
                    </li>
                </NavLink>
                <NavLink to={"/events"} className="text-decoration-none ">
                    <li className="sidebar-link">
                        Events
                    </li>
                </NavLink>
                <NavLink to={"/user"} className="text-decoration-none ">
                    <li className="sidebar-link">
                        My User
                    </li>
                </NavLink>
            </ul>
        </div>
    )
}

export default Sidebar