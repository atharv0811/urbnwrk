import { Eye, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const tableData = [
    {
        name: "Abdul G",
        email: "abdul@email.com",
        mobileNo: "1234567890",
        status: "Rejected",
        userId: "17736",
        userType: "Admin",
        createdDate: "09/11/24",
        isActive: false,
    },
    {
        name: "Abdul G",
        email: "abdul@email.com",
        mobileNo: "1234567890",
        status: "Approved",
        userId: "17736",
        userType: "Admin",
        createdDate: "09/11/24",
        isActive: true,
    },
    {
        name: "Abdul G",
        email: "abdul@email.com",
        mobileNo: "1234567890",
        status: "Rejected",
        userId: "17736",
        userType: "Admin",
        createdDate: "09/11/24",
        isActive: false,
    },
    {
        name: "Abdul G",
        email: "abdul@email.com",
        mobileNo: "1234567890",
        status: "Pending",
        userId: "17736",
        userType: "Admin",
        createdDate: "09/11/24",
        isActive: true,
    },
];

const statusOptions = [
    { value: "Approved", label: "Approve", color: "green" },
    { value: "Rejected", label: "Reject", color: "red" },
];

const User = () => {
    const navigate = useNavigate();

    const [selectedStatus, setSelectedStatus] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    const handleStatusChange = (index, status) => {
        setSelectedStatus((prev) => ({ ...prev, [index]: status }));
    };

    const statusBgColors = {
        Approved: "#3A8E5C",
        Rejected: "#B71C1C",
        Pending: "#F9A825"
    };

    const statusTextColors = {
        Approved: "white",
        Rejected: "white",
        Pending: "black"
    };

    return (
        <>
            <div className="row g-3">
                <div className="col-lg-3 col-md-6">
                    <div className="card card-shadow card-border bg-card3 d-flex align-items-center justify-content-center gap-3 p-4" style={{ height: "142px" }}>
                        <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                            <span className="text-red text-24 fw-semibold">250</span>
                            <span className="text-secondary text-22 fw-medium">Total Users</span>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6">
                    <div className="card card-shadow card-border bg-card3 d-flex align-items-center justify-content-center gap-3 p-4" style={{ height: "142px" }}>
                        <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                            <strong className="text-red text-24 fw-semibold">30</strong>
                            <span className="text-secondary text-22 fw-medium">Pending</span>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6">
                    <div className="card card-shadow card-border bg-card3 d-flex align-items-center justify-content-center gap-3 p-4" style={{ height: "142px" }}>
                        <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                            <strong className="text-red text-24 fw-semibold">22</strong>
                            <span className="text-secondary text-22 fw-medium">Approved</span>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6">
                    <div className="card card-shadow card-border bg-card3 d-flex align-items-center justify-content-center gap-3 p-4" style={{ height: "142px" }}>
                        <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                            <strong className="text-red text-24 fw-semibold">10</strong>
                            <span className="text-secondary text-22 fw-medium">Rejected</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 mb-4 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                    <div className="position-relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search"
                            className="form-control rounded-0 text-secondary"
                            style={{ padding: "8px 3px 8px 30px", width: "230px" }}
                        />
                        <Search
                            size={15}
                            className="text-secondary2 position-absolute top-50 translate-middle-y"
                            style={{ left: "10px" }}
                        />
                    </div>
                    <button className="btn-red fw-light" style={{ padding: "8px 10px" }}>
                        Go !
                    </button>
                </div>
                <button className="btn-red fw-light" style={{ padding: "8px 30px" }}>
                    + Filter
                </button>
            </div>

            <div className="table-responsive">
                <table className="text-start custom-table w-100">
                    <thead className="text-nowrap">
                        <tr>
                            <th>View</th>
                            <th>Name</th>
                            <th>Email ID</th>
                            <th>Mobile No</th>
                            <th>Status</th>
                            <th>User ID</th>
                            <th>User Type</th>
                            <th>Created Date</th>
                            <th>Active / In-Active Users</th>
                        </tr>
                    </thead>
                    <tbody className="text-nowrap">
                        {tableData.map((data, index) => (
                            <tr key={index}>
                                <td>
                                    <Eye
                                        size={20}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            navigate(`/user/${data.userId}`);
                                        }}
                                    />
                                </td>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td className="text-end">{data.mobileNo}</td>
                                <td>
                                    <div className="dropdown">
                                        <button
                                            className="btn dropdown-toggle status-dropdown rounded-0"
                                            type="button"
                                            id={`dropdownMenuButton${index}`}
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            style={{
                                                backgroundColor: statusBgColors[selectedStatus[index] || data.status],
                                                color: statusTextColors[selectedStatus[index] || data.status],
                                            }}
                                        >
                                            {selectedStatus[index] || data.status}
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${index}`}>
                                            {statusOptions.map((option) => (
                                                <li key={option.value}>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => handleStatusChange(index, option.value)}
                                                        style={{ color: option.color }}
                                                    >
                                                        {option.label}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </td>
                                <td className="text-end">{data.userId}</td>
                                <td>{data.userType}</td>
                                <td className="text-end">{data.createdDate}</td>
                                <td className="text-center">
                                    <button
                                        className="toggle-button"
                                        style={{
                                            border: "none",
                                            background: "none",
                                            cursor: "pointer",
                                            padding: 0,
                                            width: "70px",
                                        }}
                                    >
                                        {data.isActive ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="40"
                                                height="25"
                                                fill="#40bd16"
                                                className="bi bi-toggle-on"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8" />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="40"
                                                height="25"
                                                fill="#667085"
                                                className="bi bi-toggle-off"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5" />
                                            </svg>
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default User;
