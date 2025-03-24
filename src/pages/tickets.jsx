import axios from "axios";
import { Eye, Search, SlidersHorizontal } from "lucide-react"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"

const Tickets = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false)
    const [tickets, setTickets] = useState([]);
    const [cardData, setCardData] = useState({
        closed: 0,
        open: 0,
        complaints: 0,
        suggestions: 0,
        requests: 0
    })
    const [pagination, setPagination] = useState({
        current_page: 1,
        total_count: 0,
        total_pages: 0,
    });
    const pageSize = 10;

    const token = localStorage.getItem("access_token");

    const fetchTickets = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`https://app.gophygital.work/pms/admin/complaints.json`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response)
            setTickets(response.data.complaints)

            const closedTickets = response.data.complaints.filter(ticket => ticket.issue_status === "Completed" || ticket.issue_status === "Closed").length;
            const openTickets = response.data.complaints.filter(ticket => ticket.issue_status === "Pending" || ticket.issue_status === "In Progress").length;
            const complaints = response.data.complaints.filter(ticket => ticket.issue_type === "Complaint").length;
            const suggestion = response.data.complaints.filter(ticket => ticket.issue_type === "Suggestion").length;
            const requests = response.data.complaints.filter(ticket => ticket.issue_type === "Request").length;

            setCardData({
                closed: closedTickets,
                open: openTickets,
                complaints: complaints,
                suggestions: suggestion,
                requests: requests
            })

            setPagination((prev) => ({
                ...prev,
                total_count: response.data.complaints.length,
                total_pages: Math.ceil(
                    response.data.complaints.length / pageSize
                ),
            }));
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTickets();
    }, [])

    const handlePageChange = (page) => {
        setPagination((prev) => ({ ...prev, current_page: page }));
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setPagination((prev) => ({ ...prev, current_page: 1 }));
    }

    const searchedData = tickets.filter((ticket) =>
        ticket.category_type.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const totalFiltered = searchedData.length;
    const totalPages = Math.ceil(totalFiltered / pageSize);

    const tableData = searchedData
        ?.slice(
            (pagination.current_page - 1) * pageSize,
            pagination.current_page * pageSize
        )
        ?.sort((a, b) => (a.id || 0) - (b.id || 0));


    return (
        <>
            <div className="d-flex align-items-center justify-content-between gap-3">
                <div className="card card-shadow card-border bg-card d-flex align-items-center justify-content-center gap-3 p-4" style={{ height: "142px" }}>
                    <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                        <span className="text-red text-24 fw-semibold">{cardData.closed}</span>
                        <span className="text-secondary text-22 fw-medium">Closed Tickets</span>
                    </div>
                </div>
                <div className="card card-shadow card-border bg-card d-flex align-items-center justify-content-center gap-3 p-4" style={{ height: "142px" }}>
                    <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                        <span className="text-red text-24 fw-semibold">{cardData.open}</span>
                        <span className="text-secondary text-22 fw-medium">Open Tickets</span>
                    </div>
                </div>
                <div className="card card-shadow card-border bg-card d-flex align-items-center justify-content-center gap-3 p-4" style={{ height: "142px" }}>
                    <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                        <span className="text-red text-24 fw-semibold">{cardData.complaints}</span>
                        <span className="text-secondary text-22 fw-medium">Complaints</span>
                    </div>
                </div>
                <div className="card card-shadow card-border bg-card d-flex align-items-center justify-content-center gap-3 p-4" style={{ height: "142px" }}>
                    <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                        <span className="text-red text-24 fw-semibold">{cardData.suggestions}</span>
                        <span className="text-secondary text-22 fw-medium">Suggestions</span>
                    </div>
                </div>
                <div className="card card-shadow card-border bg-card d-flex align-items-center justify-content-center gap-3 p-4" style={{ height: "142px" }}>
                    <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                        <span className="text-red text-24 fw-semibold">{cardData.requests}</span>
                        <span className="text-secondary text-22 fw-medium">Requests</span>
                    </div>
                </div>
            </div>

            <div className="d-flex align-items-center justify-content-between mt-4">
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
                    <Link to="add-ticket" className="text-decoration-none">
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
                        <SlidersHorizontal size={15} color="#fff" className="my-1 my-lg-0" /> <span className="d-none d-lg-block text-white">Filter</span>
                    </button>
                </div>
            </div>

            <div className="table-responsive">
                <table className="text-start custom-table w-100">
                    <thead className="text-nowrap">
                        <tr>
                            <th className="text-center">View</th>
                            <th>Ticket Number</th>
                            <th style={{ width: "500px" }}>Description</th>
                            <th style={{ width: "300px" }}>Category</th>
                            <th>Sub Category</th>
                            <th>Created By</th>
                            <th>Assigned To</th>
                        </tr>
                    </thead>
                    <tbody className="text-nowrap">
                        {loading ? (
                            <tr>
                                <td colSpan="9">Loading...</td>
                            </tr>
                        ) : (
                            tableData.map((data) => (
                                <tr key={data.id}>
                                    <td className="text-center">
                                        <Eye size={20} style={{ cursor: "pointer" }} onClick={() => navigate(`/tickets/${data.id}`)} />
                                    </td>
                                    <td>{data.ticket_number}</td>
                                    <td className="description-column">{data.heading}</td>
                                    <td>{data.category_type}</td>
                                    <td className="description-column">{data.sub_category_type}</td>
                                    <td>{data.updated_by}</td>
                                    <td>{data.assigned_to}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {
                totalPages > 1 && (
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
                )
            }
        </>
    )
}

export default Tickets