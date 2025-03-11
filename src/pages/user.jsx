import { Eye, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const tableData = [
    {
        name: "Abdul G",
        email: "abdul@email.com",
        mobileNo: "1234567890",
        stauts: "Rejected",
        userId: "17736",
        userType: "Admin",
        createdDate: "09/11/24",
        isActive: false,
    },
    {
        name: "Abdul G",
        email: "abdul@email.com",
        mobileNo: "1234567890",
        stauts: "Accepted",
        userId: "17736",
        userType: "Admin",
        createdDate: "09/11/24",
        isActive: true,
    },
    {
        name: "Abdul G",
        email: "abdul@email.com",
        mobileNo: "1234567890",
        stauts: "Rejected",
        userId: "17736",
        userType: "Admin",
        createdDate: "09/11/24",
        isActive: false,
    },
    {
        name: "Abdul G",
        email: "abdul@email.com",
        mobileNo: "1234567890",
        stauts: "Pending",
        userId: "17736",
        userType: "Admin",
        createdDate: "09/11/24",
        isActive: true,
    },
];

const statusOptions = [
    { value: "Accepted", label: "Accept", color: "green" },
    { value: "Rejected", label: "Reject", color: "red" },
];

const User = () => {
    const navigate = useNavigate();

    const [selectedStatus, setSelectedStatus] = useState({});

    const handleStatusChange = (index, status) => {
        setSelectedStatus((prev) => ({ ...prev, [index]: status }));
    };

    return (
        <>
            <div className="row g-3">
                <div className="col-lg-3 col-md-6">
                    <div className="card card-shadow card-border bg-card d-flex align-items-center justify-content-center gap-3 p-4">
                        <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                            <strong className="text-red fs-4">250</strong>
                            <span className="text-secondary">Total Users</span>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6">
                    <div className="card card-shadow card-border bg-card d-flex align-items-center justify-content-center gap-3 p-4">
                        <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                            <strong className="text-red fs-4">30</strong>
                            <span className="text-secondary">Pending</span>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6">
                    <div className="card card-shadow card-border bg-card d-flex align-items-center justify-content-center gap-3 p-4">
                        <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                            <strong className="text-red fs-4">22</strong>
                            <span className="text-secondary">Approved</span>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6">
                    <div className="card card-shadow card-border bg-card d-flex align-items-center justify-content-center gap-3 p-4">
                        <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                            <strong className="text-red fs-4">10</strong>
                            <span className="text-secondary">Rejected</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 mb-4 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                    <div className="position-relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="form-control rounded-0 text-secondary"
                            style={{ paddingLeft: "30px" }}
                        />
                        <Search
                            size={15}
                            className="text-secondary2 position-absolute top-50 translate-middle-y"
                            style={{ left: "10px" }}
                        />
                    </div>
                    <button className="btn-red fw-light" style={{ padding: "6px 8px" }}>
                        Go !
                    </button>
                </div>
                <button className="btn-red fw-light" style={{ padding: "4px 18px" }}>
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
                        {tableData.map((data, idx) => (
                            <tr key={idx}>
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
                                <td>{data.mobileNo}</td>
                                <td>
                                    <div className="dropdown">
                                        <button
                                            className="btn dropdown-toggle status-dropdown"
                                            type="button"
                                            id={`dropdownMenuButton${idx}`}
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {selectedStatus[idx] || data.stauts}
                                        </button>
                                        <ul
                                            className="dropdown-menu"
                                            aria-labelledby={`dropdownMenuButton${idx}`}
                                        >
                                            {statusOptions.map((option) => (
                                                <li key={option.value}>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() =>
                                                            handleStatusChange(idx, option.value)
                                                        }
                                                        style={{ color: option.color }}
                                                    >
                                                        {option.label}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </td>
                                <td>{data.userId}</td>
                                <td>{data.userType}</td>
                                <td>{data.createdDate}</td>
                                <td>
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
