import axios from "axios";
import { Eye, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const statusOptions = [
    { value: "approved", label: "Approve", color: "green" },
    { value: "rejected", label: "Reject", color: "red" },
];

const statusBgColors = {
    approved: "#3A8E5C",
    rejected: "#B71C1C",
    pending: "#F9A825",
};

const statusTextColors = {
    approved: "white",
    rejected: "white",
    pending: "black",
};

const User = () => {
    const navigate = useNavigate();

    const [occupantUsers, setOccupantUsers] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({});
    const [statuses, setStatuses] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [cardData, setCardData] = useState({
        totalUsers: 0,
        pending: 0,
        approved: 0,
        rejected: 0
    })
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current_page: 1,
        total_count: 0,
        total_pages: 0,
    });
    const pageSize = 10;

    const token = localStorage.getItem("access_token");

    useEffect(() => {
        const getOccupantUsers = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://app.gophygital.work/pms/users/occupant_users_with_entity.json`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const users = response.data.occupant_users;
                setOccupantUsers(users);

                const totalUsers = users.length;
                const pendingUsers = users.filter(
                    (user) => user.lock_user_permission?.status === "pending"
                ).length;
                const approvedUsers = users.filter(
                    (user) => user.lock_user_permission?.status === "approved"
                ).length;
                const rejectedUsers = users.filter(
                    (user) => user.lock_user_permission?.status === "rejected"
                ).length;

                setCardData({
                    totalUsers,
                    pending: pendingUsers,
                    approved: approvedUsers,
                    rejected: rejectedUsers
                })

                const statusMap = users.reduce((acc, user) => {
                    acc[user.lock_user_permission?.id] =
                        user.lock_user_permission?.active || false;
                    return acc;
                }, {});
                setStatuses(statusMap);
                setPagination((prev) => ({
                    ...prev,
                    total_count: response.data.occupant_users.length,
                    total_pages: Math.ceil(
                        response.data.occupant_users.length / pageSize
                    ),
                }));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getOccupantUsers();
    }, []);

    const handleStatusChange = async (id, status, index) => {
        console.log(id);
        try {
            await axios.put(
                `https://app.gophygital.work/pms/users/status_update.json?id=${id}&status=${status}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );
            setSelectedStatus((prev) => ({ ...prev, [index]: status }));
        } catch (error) {
            console.log(error);
        }
    };

    const toggelStatus = async (id) => {
        const newStatus = !statuses[id];
        setStatuses((prev) => ({ ...prev, [id]: newStatus }));

        try {
            await axios.put(
                `https://app.gophygital.work/pms/users/status_update.json?id=${id}&active=${newStatus}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );
        } catch (error) {
            console.log(error);
            setStatuses((prev) => ({ ...prev, [id]: !newStatus }));
        }
    };

    const handlePageChange = (page) => {
        setPagination((prev) => ({ ...prev, current_page: page }));
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setPagination((prev) => ({ ...prev, current_page: 1 }));
    }

    const searchedData = occupantUsers.filter((ticket) =>
        ticket.firstname.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const totalFiltered = searchedData.length;
    const totalPages = Math.ceil(totalFiltered / pageSize);

    const tableData = searchedData
        .slice(
            (pagination.current_page - 1) * pageSize,
            pagination.current_page * pageSize
        )
        .sort((a, b) => (a.id || 0) - (b.id || 0));

    return (
        <>
            <div className="row g-3">
                <div className="col-lg-3 col-md-6">
                    <div
                        className="card card-shadow card-border bg-card d-flex align-items-center justify-content-center gap-3 p-4"
                        style={{ height: "142px" }}
                    >
                        <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                            <span className="text-red text-24 fw-semibold">{cardData.totalUsers}</span>
                            <span className="text-secondary text-22 fw-medium">
                                Total Users
                            </span>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6">
                    <div
                        className="card card-shadow card-border bg-card d-flex align-items-center justify-content-center gap-3 p-4"
                        style={{ height: "142px" }}
                    >
                        <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                            <strong className="text-red text-24 fw-semibold">{cardData.pending}</strong>
                            <span className="text-secondary text-22 fw-medium">Pending</span>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6">
                    <div
                        className="card card-shadow card-border bg-card d-flex align-items-center justify-content-center gap-3 p-4"
                        style={{ height: "142px" }}
                    >
                        <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                            <strong className="text-red text-24 fw-semibold">{cardData.approved}</strong>
                            <span className="text-secondary text-22 fw-medium">Approved</span>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6">
                    <div
                        className="card card-shadow card-border bg-card d-flex align-items-center justify-content-center gap-3 p-4"
                        style={{ height: "142px" }}
                    >
                        <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                            <strong className="text-red text-24 fw-semibold">{cardData.rejected}</strong>
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
                            onChange={handleSearchChange}
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
                            <th className="text-center">View</th>
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
                        {loading ? (
                            <tr>
                                <td colSpan="9">Loading...</td>
                            </tr>
                        ) : (
                            tableData.map((data, index) => (
                                <tr key={data.id}>
                                    <td className="text-center">
                                        <Eye
                                            size={20}
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                                navigate(`/user/${data.spree_api_key}`);
                                            }}
                                        />
                                    </td>
                                    <td>{data.firstname}</td>
                                    <td>{data.email}</td>
                                    <td>{data.mobile}</td>
                                    <td style={{ padding: "10px 0" }}>
                                        <div className="dropdown">
                                            <button
                                                className="btn dropdown-toggle status-dropdown rounded-0"
                                                type="button"
                                                id={`dropdownMenuButton${index}`}
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                                style={{
                                                    backgroundColor:
                                                        statusBgColors[
                                                        selectedStatus[index] ||
                                                        data?.lock_user_permission?.status
                                                        ],
                                                    color:
                                                        statusTextColors[
                                                        selectedStatus[index] ||
                                                        data?.lock_user_permission?.status
                                                        ],
                                                }}
                                            >
                                                {(
                                                    selectedStatus[index] ||
                                                    data?.lock_user_permission?.status
                                                )
                                                    ?.charAt(0)
                                                    .toUpperCase() +
                                                    (
                                                        selectedStatus[index] ||
                                                        data?.lock_user_permission?.status
                                                    )?.slice(1)}
                                            </button>
                                            <ul
                                                className="dropdown-menu"
                                                aria-labelledby={`dropdownMenuButton${index}`}
                                            >
                                                {statusOptions.map((option) => (
                                                    <li key={option.value}>
                                                        <button
                                                            className="dropdown-item"
                                                            onClick={() =>
                                                                handleStatusChange(
                                                                    data.lock_user_permission?.id,
                                                                    option.value,
                                                                    index
                                                                )
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
                                    <td>{data?.lock_user_permission?.user_id}</td>
                                    <td>{data?.lock_user_permission?.user_type}</td>
                                    <td>{data.created_at}</td>
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
                                            onClick={() =>
                                                toggelStatus(data?.lock_user_permission?.id)
                                            }
                                        >
                                            {statuses[data?.lock_user_permission?.id] ? (
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
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="d-flex justify-content-between align-items-center px-3 mt-3">
                    <ul className="pagination justify-content-center d-flex">
                        {/* First Button */}
                        <li
                            className={`page-item ${pagination.current_page === 1 ? "disabled" : ""
                                }`}
                        >
                            <button className="page-link" onClick={() => handlePageChange(1)}>
                                First
                            </button>
                        </li>

                        {/* Previous Button */}
                        <li
                            className={`page-item ${pagination.current_page === 1 ? "disabled" : ""
                                }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(pagination.current_page - 1)}
                                disabled={pagination.current_page === 1}
                            >
                                Prev
                            </button>
                        </li>

                        {Array.from({ length: totalPages }, (_, index) => index + 1)
                            .filter((page) => page === 1 || page === totalPages || (page >= pagination.current_page - 1 && page <= pagination.current_page + 1))
                            .map((page, index, array) => (
                                <>
                                    {index > 0 && page !== array[index - 1] + 1 && <li className="page-item disabled"><span className="page-link">...</span></li>}
                                    <li key={page} className={`page-item ${pagination.current_page === page ? "active" : ""}`}>
                                        <button className="page-link" onClick={() => handlePageChange(page)}>
                                            {page}
                                        </button>
                                    </li>
                                </>
                            ))}

                        {/* Next Button */}
                        <li
                            className={`page-item ${pagination.current_page === totalPages
                                ? "disabled"
                                : ""
                                }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(pagination.current_page + 1)}
                                disabled={pagination.current_page === totalPages}
                            >
                                Next
                            </button>
                        </li>

                        {/* Last Button */}
                        <li
                            className={`page-item ${pagination.current_page === totalPages
                                ? "disabled"
                                : ""
                                }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(totalPages)}
                                disabled={pagination.current_page === totalPages}
                            >
                                Last
                            </button>
                        </li>
                    </ul>

                    {/* Showing entries count */}
                    <div>
                        <p>
                            Showing{" "}
                            {Math.min(
                                (pagination.current_page - 1) * pageSize + 1 || 1,
                                pagination.total_count
                            )}{" "}
                            to{" "}
                            {Math.min(
                                pagination.current_page * pageSize,
                                pagination.total_count
                            )}{" "}
                            of {pagination.total_count} entries
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default User;
