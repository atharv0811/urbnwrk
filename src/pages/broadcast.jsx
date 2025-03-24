import axios from "axios";
import { Eye, Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Broadcats = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [broadcasts, setBroadcasts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current_page: 1,
        total_count: 0,
        total_pages: 0,
    });
    const pageSize = 10;

    const token = localStorage.getItem("access_token");

    const fetchBroadcasts = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`https://app.gophygital.work/pms/admin/noticeboards.json`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setBroadcasts(response.data.noticeboards)
            setPagination((prev) => ({
                ...prev,
                total_count: response.data.noticeboards.length,
                total_pages: Math.ceil(
                    response.data.noticeboards.length / pageSize
                ),
            }));
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchBroadcasts();
    }, []);

    const handlePageChange = (page) => {
        setPagination((prev) => ({ ...prev, current_page: page }));
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setPagination((prev) => ({ ...prev, current_page: 1 }));
    }

    const searchedData = broadcasts.filter((ticket) =>
        ticket.notice_heading.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const totalFiltered = searchedData.length;
    const totalPages = Math.ceil(totalFiltered / pageSize);

    const tableData = searchedData
        .slice(
            (pagination.current_page - 1) * pageSize,
            pagination.current_page * pageSize
        )
        .sort((a, b) => (a.id || 0) - (b.id || 0));

    console.log(broadcasts)

    return (
        <>
            <span className="text-secondary text-18 fw-medium">
                <Link to="" className="text-decoration-none text-secondary">
                    Broadcasts
                </Link>{" "}
                {">"} Broadcast List
            </span>

            <h5 className="my-2 text-red fw-semibold text-26">BROADCAST LIST</h5>

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
                    <Link to="add-broadcast" className="text-decoration-none">
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
                            <th>Title</th>
                            <th>Type</th>
                            <th>Created On</th>
                            <th>Created By</th>
                            <th>Status</th>
                            <th>Expired On</th>
                            <th>Expired</th>
                            <th>Attachment</th>
                        </tr>
                    </thead>
                    <tbody className="text-nowrap">
                        {
                            loading ? (
                                <tr>
                                    <td colSpan="9">Loading...</td>
                                </tr>
                            ) : (
                                tableData.map((data) => (
                                    <tr key={data.id}>
                                        <td className="text-center">
                                            <Eye
                                                size={20}
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    navigate(`/broadcast/${data.id}`);
                                                }}
                                            />
                                        </td>
                                        <td>{data.notice_heading}</td>
                                        <td>{data.shared === 1 ? "Personal" : "General"}</td>
                                        <td>{(data.created_at)?.split("T")[0]}</td>
                                        <td>{data.created_by}</td>
                                        <td>{data.status}</td>
                                        <td>{(data.expire_time)?.split("T")[0]}</td>
                                        <td>{data.is_expired ? "Yes" : "No"}</td> {/* Replace with actual expiration status */}
                                        <td><img src={data.attachments[0]?.document_url} alt="" style={{ width: "100%", height: "50px" }} /></td>
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
    );
};

export default Broadcats;
