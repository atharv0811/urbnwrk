import axios from "axios";
import { Eye, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [bookings, setBookings] = useState([]);
    const [cardData, setCardData] = useState({})
    const [loading, setLoading] = useState(false)
    const [pagination, setPagination] = useState({
        current_page: 1,
        total_count: 0,
        total_pages: 0,
    });
    const pageSize = 10;

    const token = localStorage.getItem("access_token");

    const fetchBookings = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`https://app.gophygital.work/pms/admin/facility_bookings.json`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBookings(response.data.facility_bookings)
            setPagination((prev) => ({
                ...prev,
                total_count: response.data.facility_bookings.length,
                total_pages: Math.ceil(
                    response.data.facility_bookings.length / pageSize
                ),
            }));
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    };

    const fetchCardData = async () => {
        try {
            const response = await axios.get(`https://app.gophygital.work/facility_booking_data.json`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log(response)
            setCardData(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBookings();
        fetchCardData();
    }, []);

    const handlePageChange = (page) => {
        setPagination((prev) => ({ ...prev, current_page: page }));
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setPagination((prev) => ({ ...prev, current_page: 1 }));
    }

    const searchedData = bookings.filter((ticket) =>
        ticket.facility_name.toLowerCase().includes(searchQuery.toLowerCase())
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
            <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-3">
                <div
                    className="card card-shadow card-border bg-card d-flex flex-row align-items-start justify-content-between"
                    style={{ height: "160px", padding: "30px 50px", gap: "10px" }}
                >
                    <div className="d-flex flex-column gap-2 w-50">
                        <strong className="text-red text-24 fw-semibold">{cardData.confirmed_amount}</strong>
                        <span className="text-secondary text-18">
                            Total Confirmed Amount
                        </span>
                    </div>
                    <div className="d-flex flex-column gap-2 w-50">
                        <strong className="text-red text-24 fw-semibold">{cardData.confirmed_count}</strong>
                        <span className="text-secondary text-18">
                            Total Confirmed
                        </span>
                    </div>
                </div>
                <div
                    className="card card-shadow card-border bg-card d-flex flex-row align-items-start justify-content-between"
                    style={{ height: "160px", padding: "30px 50px", gap: "10px" }}
                >
                    <div className="d-flex flex-column gap-2 w-50">
                        <strong className="text-red text-24 fw-semibold">{cardData.refund_amount}</strong>
                        <span className="text-secondary text-18">
                            Total Refund Amount
                        </span>
                    </div>
                    <div className="d-flex flex-column gap-2 w-50">
                        <strong className="text-red text-24 fw-semibold">{cardData.refund_count}</strong>
                        <span className="text-secondary text-18">
                            Total Refund
                        </span>
                    </div>
                </div>
                <div
                    className="card card-shadow card-border bg-card d-flex flex-row align-items-start justify-content-between"
                    style={{ height: "160px", padding: "30px 50px", gap: "10px" }}
                >
                    <div className="d-flex flex-column gap-2 w-50">
                        <strong className="text-red text-24 fw-semibold">{cardData.cancelled_amount}</strong>
                        <span className="text-secondary text-18">
                            Total Cancelled Amount
                        </span>
                    </div>
                    <div className="d-flex flex-column gap-2 w-50">
                        <strong className="text-red text-24 fw-semibold">{cardData.cancelled_count}</strong>
                        <span className="text-secondary text-18">
                            Total Cancelled
                        </span>
                    </div>
                </div>
            </div>

            <div className="my-4 d-flex align-items-center justify-content-between">
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
                <button className="btn-red fw-normal" style={{ padding: "8px 30px" }}>
                    + Filter
                </button>
            </div>

            <div className="table-responsive">
                <table className="text-start custom-table w-100">
                    <thead className="text-nowrap">
                        <tr>
                            <th className="text-center">View</th>
                            <th>Booking Id</th>
                            <th>Booked By</th>
                            <th>Facility Name</th>
                            <th>Scheduled Date</th>
                            <th>Scheduled Time</th>
                            <th>Booking Status</th>
                            <th>Payment Status</th>
                            <th>Created On</th>
                        </tr>
                    </thead>
                    <tbody className="text-nowrap">
                        {
                            loading ? (
                                <tr>
                                    <td colSpan="9">Loading...</td>
                                </tr>
                            ) : (
                                tableData.map((data, idx) => (
                                    <tr key={idx}>
                                        <td className="text-center">
                                            <Eye
                                                size={20}
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    navigate(`/bookings/${data.id}`);
                                                }}
                                            />
                                        </td>
                                        <td>{data.id}</td>
                                        <td>{data.placed_by}</td>
                                        <td>{data.facility_name}</td>
                                        <td>{(data.startdate)?.split("T")[0]}</td>
                                        <td>
                                            {(() => {
                                                const startTime = data.show_schedule_arr[0]?.split(" to ")[0]; // First start time
                                                const endTime = data.show_schedule_arr[data.show_schedule_arr.length - 1]?.split(" to ")[1]; // Last end time
                                                return `${startTime} to ${endTime}`;
                                            })()}
                                        </td>
                                        <td>{data.current_status}</td>
                                        <td>{data.payment_status}</td>
                                        <td>{(data.created_at).split("T")[0]}</td>
                                    </tr>
                                ))
                            )}
                    </tbody>
                </table>
            </div>

            {
                pagination.total_pages > 1 && (
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
                                className={`page-item ${pagination.current_page === pagination.total_pages
                                    ? "disabled"
                                    : ""
                                    }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(pagination.current_page + 1)}
                                    disabled={pagination.current_page === pagination.total_pages}
                                >
                                    Next
                                </button>
                            </li>

                            {/* Last Button */}
                            <li
                                className={`page-item ${pagination.current_page === pagination.total_pages
                                    ? "disabled"
                                    : ""
                                    }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(pagination.total_pages)}
                                    disabled={pagination.current_page === pagination.total_pages}
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

export default Bookings;
