import axios from "axios";
import { Eye, Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const statusOptions = [
    { value: "Published", label: "Publish", color: "green" },
    { value: "Pending", label: "Disable", color: "#5a5c5c" },
];

const statusBgColors = {
    Published: "#3A8E5C",
    Pending: "#D5DBDB",
};

const statusTextColors = {
    Published: "white",
    Pending: "black",
};

const Events = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState({});
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current_page: 1,
        total_count: 0,
        total_pages: 0,
    });
    const pageSize = 10;

    const token = localStorage.getItem("access_token");

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://app.gophygital.work/pms/admin/events.json`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setEvents(response.data.classifieds);
            setPagination((prev) => ({
                ...prev,
                total_count: response.data.classifieds?.length,
                total_pages: Math.ceil(response.data.classifieds?.length / pageSize),
            }));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleStatusChange = async (index, status, id) => {
        console.log(status)
        const newStatus = status === 'Pending' ? 2 : 1
        try {
            await axios.put(`https://app.gophygital.work/pms/admin/events/${id}.json?event[publish]=${newStatus}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setSelectedStatus((prev) => ({ ...prev, [index]: status }));
        } catch (error) {
            console.log(error)
        }
    };
    console.log(selectedStatus)

    const handlePageChange = (page) => {
        setPagination((prev) => ({ ...prev, current_page: page }));
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setPagination((prev) => ({ ...prev, current_page: 1 }));
    }

    const searchedData = events.filter((ticket) =>
        ticket.event_name.toLowerCase().includes(searchQuery.toLowerCase())
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
            <span className="text-secondary text-18 fw-medium">
                <Link to="" className="text-decoration-none text-secondary">
                    Events
                </Link>{" "}
                {">"} Event List
            </span>

            <h5 className="my-2 text-red fw-semibold text-26">EVENT LIST</h5>

            <div className="d-flex align-items-center justify-content-between">
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
                    <button className="btn-red fw-normal" style={{ padding: "8px 10px" }}>
                        Go !
                    </button>
                    <button
                        className="rounded-0 fw-normal text-red bg-transparent border-red"
                        style={{ padding: "8px 10px" }}
                        onClick={() => setSearchQuery("")}
                    >
                        Reset
                    </button>
                </div>
                <div className="d-flex align-items-center gap-2 my-4">
                    <Link to="add-event" className="text-decoration-none">
                        <button
                            className="btn-red fw-normal d-flex align-items-center gap-2"
                            style={{ padding: "8px 30px" }}
                        >
                            + <span className="d-none d-lg-block text-white">Add</span>
                        </button>
                    </Link>
                    <button
                        className="btn-red fw-normal d-flex align-items-center gap-2"
                        style={{ padding: "8px 30px" }}
                    >
                        <SlidersHorizontal
                            size={15}
                            color="#fff"
                            className="my-1 my-lg-0"
                        />{" "}
                        <span className="d-none d-lg-block text-white">Filter</span>
                    </button>
                </div>
            </div>

            <div className="table-responsive">
                <table className="text-start custom-table w-100">
                    <thead className="text-nowrap">
                        <tr>
                            <th className="text-center">View</th>
                            <th>Title</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Event Type</th>
                            <th>Status</th>
                            <th>Attachments</th>
                            <th>Created On</th>
                            <th>Created by</th>
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
                                            onClick={() => navigate(`/events/${data.id}`)}
                                        />
                                    </td>
                                    <td>{data.event_name}</td>
                                    <td>{data.from_time?.split("T")[0]}</td>
                                    <td>{data.to_time?.split("T")[0]}</td>
                                    <td>
                                        <span className="capsule">
                                            {data.shared === 1 ? "Personal" : "General"}
                                        </span>
                                    </td>
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
                                                        selectedStatus[index] || data.status
                                                        ],
                                                    color:
                                                        statusTextColors[
                                                        selectedStatus[index] || data.status
                                                        ],
                                                }}
                                            >
                                                {selectedStatus[index] || data.status === "Pending" ? "Disabled" : "Published"}
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
                                                                handleStatusChange(index, option.value,
                                                                    data.id)
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
                                    <td>
                                        <img style={{ width: "100%", height: "50px" }} src={data.documents[0]?.document} alt="Attachmenet" />
                                    </td>
                                    <td>{data.created_at?.split("T")[0]}</td>
                                    <td>{data.created_by}</td>
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

export default Events;
