import axios from "axios";
import { useEffect, useState } from "react";

const Header = () => {
    const [currentUser, setCurrentUser] = useState({})
    const [sites, setSites] = useState([])
    const [site, setSite] = useState(localStorage.getItem('site_name') || "Select Site")

    const token = localStorage.getItem("access_token");

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get(`https://app.gophygital.work/pms/get_user_detail.json`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCurrentUser(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCurrentUser()
    }, [])

    useEffect(() => {
        if (!currentUser?.id) return;

        const fetchSites = async () => {
            try {
                const response = await axios.get(`https://app.gophygital.work/pms/sites/allowed_sites.json?user_id=${currentUser.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setSites(response.data.sites)
            } catch (error) {
                console.log(error)
            }
        }

        fetchSites();
    }, [currentUser?.id])

    const handleStatusChange = async (id) => {
        try {
            const response = await axios.get(
                `https://app.gophygital.work/change_site.json?site_id=${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const newSite = response.data["pms/site"];

            setSite(newSite.name);
            localStorage.setItem("site_id", newSite.id);
            localStorage.setItem("site_name", newSite.name);

            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light p-0 px-3 px-lg-0">
            <div className="container-fluid py-1 align-items-center justify-content-between d-flex">
                <span className="navbar-toggler-icon" />
                <img
                    style={{ width: "12rem" }}
                    src="/logo.jpg"
                    // src="/image.png"
                    alt="Logo"
                />
                <span className="navbar-toggler-icon" />
                <div
                    className="collapse navbar-collapse"
                    style={{ marginLeft: "5rem" }}
                    id="navbarTogglerDemo02"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                aria-current="page"
                                href="/"
                            >
                                Home
                            </a>
                        </li>
                    </ul>
                    <div className="header-icons me-5">
                        <ul className="d-flex align-items-center gap-4 m-0 p-0">
                            <li>
                                <div className="dropdown">
                                    <button
                                        className="dropdown-toggle status-dropdown rounded-0"
                                        type="button"
                                        id={`dropdownMenuButton`}
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {site}
                                    </button>
                                    <ul
                                        className="dropdown-menu z-1 mt-2"
                                        aria-labelledby={`dropdownMenuButton`}
                                        style={{
                                            width: "200px",
                                            // overflow: "hidden",
                                            whiteSpace: "wrap",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {sites.map((option) => (
                                            <li key={option.id} className="my-2">
                                                <button
                                                    className="dropdown-item"
                                                    onClick={() => handleStatusChange(option.id)}
                                                    style={{
                                                        fontSize: "14px",
                                                        // overflow: "hidden",
                                                        whiteSpace: "wrap",
                                                        textOverflow: "ellipsis",
                                                    }}
                                                >
                                                    {option.name}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <span className="avatar d-flex align-items-center justify-content-center">A</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
