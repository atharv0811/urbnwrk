import { Eye, Search } from "lucide-react";
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
        createdOn: "09/11/24"
    },
    {
        bookingId: 1234,
        bookedBy: "Abdul G",
        facultyName: "Pepper",
        scheduledDate: "09/11/24",
        scheduledTime: "11:00 AM to 12:00 PM",
        bookingStatus: "Confirmed",
        paymentStatus: "Wallet",
        createdOn: "09/11/24"
    },
    {
        bookingId: 1234,
        bookedBy: "Abdul G",
        facultyName: "Pepper",
        scheduledDate: "09/11/24",
        scheduledTime: "11:00 AM to 12:00 PM",
        bookingStatus: "Confirmed",
        paymentStatus: "Wallet",
        createdOn: "09/11/24"
    },
    {
        bookingId: 1234,
        bookedBy: "Abdul G",
        facultyName: "Pepper",
        scheduledDate: "09/11/24",
        scheduledTime: "11:00 AM to 12:00 PM",
        bookingStatus: "Confirmed",
        paymentStatus: "Wallet",
        createdOn: "09/11/24"
    },
    {
        bookingId: 1234,
        bookedBy: "Abdul G",
        facultyName: "Pepper",
        scheduledDate: "09/11/24",
        scheduledTime: "11:00 AM to 12:00 PM",
        bookingStatus: "Confirmed",
        paymentStatus: "Wallet",
        createdOn: "09/11/24"
    },
    {
        bookingId: 1234,
        bookedBy: "Abdul G",
        facultyName: "Pepper",
        scheduledDate: "09/11/24",
        scheduledTime: "11:00 AM to 12:00 PM",
        bookingStatus: "Confirmed",
        paymentStatus: "Wallet",
        createdOn: "09/11/24"
    },
]

const Bookings = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-3">
                <div className="card card-shadow card-border bg-card d-flex flex-row align-items-start justify-content-between gap-3" style={{ padding: "1rem 2rem" }}>
                    <div className="d-flex flex-column gap-2">
                        <strong className="text-red">10,000</strong>
                        <span className="text-secondary" style={{ width: "8rem" }}>Total Confirmed Amount</span>
                    </div>
                    <div className="d-flex flex-column gap-2">
                        <strong className="text-red">100</strong>
                        <span className="text-secondary" style={{ width: "8rem" }}>Total Confirmed</span>
                    </div>
                </div>
                <div className="card card-shadow card-border bg-card d-flex flex-row align-items-start justify-content-between gap-3" style={{ padding: "1rem 2rem" }}>
                    <div className="d-flex flex-column gap-2">
                        <strong className="text-red">10,000</strong>
                        <span className="text-secondary" style={{ width: "8rem" }}>Total Refund Amount</span>
                    </div>
                    <div className="d-flex flex-column gap-2">
                        <strong className="text-red">100</strong>
                        <span className="text-secondary" style={{ width: "8rem" }}>Total Refund</span>
                    </div>
                </div>
                <div className="card card-shadow card-border bg-card d-flex flex-row align-items-start justify-content-between gap-3" style={{ padding: "1rem 2rem" }}>
                    <div className="d-flex flex-column gap-2">
                        <strong className="text-red">10,000</strong>
                        <span className="text-secondary" style={{ width: "8rem" }}>Total Cancelled Amount</span>
                    </div>
                    <div className="d-flex flex-column gap-2">
                        <strong className="text-red">100</strong>
                        <span className="text-secondary" style={{ width: "8rem" }}>Total Cancelled</span>
                    </div>
                </div>
            </div>

            <div className="my-4 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                    <div className="position-relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="form-control rounded-0 text-secondary"
                            style={{ paddingLeft: "30px" }} // Ensures text doesn't overlap icon
                        />
                        <Search
                            size={15}
                            className="text-secondary2 position-absolute top-50 translate-middle-y"
                            style={{ left: "10px" }} // Adjust icon position
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
                            <th>
                                View
                            </th>
                            <th>
                                Booking Id
                            </th>
                            <th>
                                Booked By
                            </th>
                            <th>
                                Faculty Name
                            </th>
                            <th>
                                Scheduled Date
                            </th>
                            <th>
                                Scheduled Time
                            </th>
                            <th>
                                Booking Status
                            </th>
                            <th>
                                Payment Status
                            </th>
                            <th>
                                Created On
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-nowrap">
                        {
                            tableData.map((data, idx) => (
                                <tr key={idx}>
                                    <td>
                                        <Eye size={20} style={{ cursor: "pointer" }} onClick={() => {
                                            navigate(`/bookings/${data.bookingId}`)
                                        }} />
                                    </td>
                                    <td>{data.bookingId}</td>
                                    <td>{data.bookedBy}</td>
                                    <td>{data.facultyName}</td>
                                    <td>{data.scheduledDate}</td>
                                    <td>{data.scheduledTime}</td>
                                    <td>{data.bookingStatus}</td>
                                    <td>{data.paymentStatus}</td>
                                    <td>{data.createdOn}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Bookings;
