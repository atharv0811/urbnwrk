import { useState } from "react";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("Status");

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (value) => {
        setSelectedStatus(value);
        setIsOpen(false);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light p-0">
            <div className="container-fluid py-1 align-items-center justify-content-between d-flex">
                <img
                    style={{ width: "12rem" }}
                    src="/logo.jpg"
                    // src="/image.png"
                    alt="Logo"
                />
                <div
                    className={`collapse navbar-collapse`}
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
                                        className="dropdown-toggle text-20 fw-normal"
                                        type="button"
                                        id="dropdownMenuButton"
                                    >
                                        Sai Radhe
                                    </button>
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
