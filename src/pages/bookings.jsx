import { Eye, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const tableData = [
    {
        bookingId: 1234,
        bookedBy: "Abdul G",
        facultyName: "Pepper",
        scheduledDate: "09/11/24",
        scheduledTime: "11:00 AM to 12:00 PM",
        bookingStatus: "Confirmed",
        paymentStatus: "Wallet",
        createdOn: "09/11/24",
    },
    {
        bookingId: 1234,
        bookedBy: "Abdul G",
        facultyName: "Pepper",
        scheduledDate: "09/11/24",
        scheduledTime: "11:00 AM to 12:00 PM",
        bookingStatus: "Confirmed",
        paymentStatus: "Wallet",
        createdOn: "09/11/24",
    },
    {
        bookingId: 1234,
        bookedBy: "Abdul G",
        facultyName: "Pepper",
        scheduledDate: "09/11/24",
        scheduledTime: "11:00 AM to 12:00 PM",
        bookingStatus: "Confirmed",
        paymentStatus: "Wallet",
        createdOn: "09/11/24",
    },
    {
        bookingId: 1234,
        bookedBy: "Abdul G",
        facultyName: "Pepper",
        scheduledDate: "09/11/24",
        scheduledTime: "11:00 AM to 12:00 PM",
        bookingStatus: "Confirmed",
        paymentStatus: "Wallet",
        createdOn: "09/11/24",
    },
    {
        bookingId: 1234,
        bookedBy: "Abdul G",
        facultyName: "Pepper",
        scheduledDate: "09/11/24",
        scheduledTime: "11:00 AM to 12:00 PM",
        bookingStatus: "Confirmed",
        paymentStatus: "Wallet",
        createdOn: "09/11/24",
    },
    {
        bookingId: 1234,
        bookedBy: "Abdul G",
        facultyName: "Pepper",
        scheduledDate: "09/11/24",
        scheduledTime: "11:00 AM to 12:00 PM",
        bookingStatus: "Confirmed",
        paymentStatus: "Wallet",
        createdOn: "09/11/24",
    },
];

const Bookings = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <>
            <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-3">
                <div
                    className="card card-shadow card-border bg-card3 d-flex flex-row align-items-start justify-content-between"
                    style={{ height: "160px", padding: "25px 50px" }}
                >
                    <div className="d-flex flex-column gap-2 w-50">
                        <strong className="text-red text-24 fw-semibold">10,000</strong>
                        <span className="text-secondary text-18">
                            Total Confirmed Amount
                        </span>
                    </div>
                    <div className="d-flex flex-column gap-2 w-50">
                        <strong className="text-red text-24 fw-semibold">100</strong>
                        <span className="text-secondary text-18">
                            Total Confirmed
                        </span>
                    </div>
                </div>
                <div
                    className="card card-shadow card-border bg-card3 d-flex flex-row align-items-start justify-content-between gap-3"
                    style={{ height: "160px", padding: "25px 50px" }}
                >
                    <div className="d-flex flex-column gap-2 w-50">
                        <strong className="text-red text-24 fw-semibold">10,000</strong>
                        <span className="text-secondary text-18">
                            Total Refund Amount
                        </span>
                    </div>
                    <div className="d-flex flex-column gap-2 w-50">
                        <strong className="text-red text-24 fw-semibold">100</strong>
                        <span className="text-secondary text-18">
                            Total Refund
                        </span>
                    </div>
                </div>
                <div
                    className="card card-shadow card-border bg-card3 d-flex flex-row align-items-start justify-content-between gap-3"
                    style={{ height: "160px", padding: "25px 50px" }}
                >
                    <div className="d-flex flex-column gap-2 w-50">
                        <strong className="text-red text-24 fw-semibold">10,000</strong>
                        <span className="text-secondary text-18">
                            Total Cancelled Amount
                        </span>
                    </div>
                    <div className="d-flex flex-column gap-2 w-50">
                        <strong className="text-red text-24 fw-semibold">100</strong>
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
                <button className="btn-red fw-normal" style={{ padding: "8px 30px" }}>
                    + Filter
                </button>
            </div>

            <div className="table-responsive">
                <table className="text-start custom-table w-100">
                    <thead className="text-nowrap">
                        <tr>
                            <th>View</th>
                            <th>Booking Id</th>
                            <th>Booked By</th>
                            <th>Faculty Name</th>
                            <th>Scheduled Date</th>
                            <th>Scheduled Time</th>
                            <th>Booking Status</th>
                            <th>Payment Status</th>
                            <th>Created On</th>
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
                                            navigate(`/bookings/${data.bookingId}`);
                                        }}
                                    />
                                </td>
                                <td className="text-end">{data.bookingId}</td>
                                <td>{data.bookedBy}</td>
                                <td>{data.facultyName}</td>
                                <td className="text-end">{data.scheduledDate}</td>
                                <td className="text-end">{data.scheduledTime}</td>
                                <td>{data.bookingStatus}</td>
                                <td>{data.paymentStatus}</td>
                                <td className="text-end">{data.createdOn}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Bookings;
