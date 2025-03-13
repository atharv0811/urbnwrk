import { CircleChevronDownIcon, File } from "lucide-react";
import { Link } from "react-router-dom"

const bookingData = [
    {
        lable: "Meeting Room Name",
        value: "Zeus"
    },
    {
        lable: "Status",
        value: "Cancelled"
    },
    {
        lable: "Booking ID",
        value: "2789000"
    },
    {
        lable: "Created On",
        value: "21st January 2025"
    },
    {
        lable: "Booked by",
        value: "Abdul"
    },
    {
        lable: "Scheduled Date",
        value: "22nd January 2025"
    },
    {
        lable: "Scheduled Slot",
        value: "11:00 AM to 12:00 PM"
    },
    {
        lable: "Cancelled On",
        value: "20/01/2025 6:24 PM"
    },
    {
        lable: "Cancelled by",
        value: "Abdul"
    },
    {
        lable: "Payment Method",
        value: "UPI"
    },
    {
        lable: "Comment",
        value: "Test"
    },
    {
        lable: "Total Amount",
        value: "2000"
    },
    {
        lable: "GST",
        value: "1.0"
    },
    {
        lable: "Transaction ID",
        value: "12345678"
    },
    {
        lable: "SGST",
        value: "1.0"
    },

]

const timelineData = [
    { date: "23rd February 2025", time: "6:30PM", text: "Abdul booked the meeting room (Zeus)" },
    { date: "22nd February 2025", time: "6:30PM", text: "Abdul cancelled the meeting room (Zeus)" },
    { date: "21st February 2025", time: "6:30PM", text: "Refund Initiated" },
    { date: "21st February 2025", time: "6:30PM", text: "Amount successfully refunded" },
    { date: "21st February 2025", time: "6:30PM", text: "Abdul booked the meeting room (Zeus)" },
    { date: "21st February 2025", time: "6:30PM", text: "Abdul cancelled the meeting room (Zeus)" },
    { yearChange: true, text: "Change in a Year" },
    { date: "21st December 2024", time: "6:30PM", text: "Abdul booked the meeting room (Zeus)" },
    { date: "20th December 2024", time: "6:30PM", text: "Refund Initiated" },
    { date: "19th December 2024", time: "6:30PM", text: "Amount successfully refunded" }
];

const BookingDetails = () => {
    return (
        <>
            <span className="text-secondary text-18 fw-medium">
                <Link to="/bookings" className="text-decoration-none text-secondary">Booking</Link> {">"} Booking details
            </span>

            <h5 className="my-2 text-red fw-medium text-26">BOOKING DETAILS</h5>

            <div className="card bg-card3 card-shadow my-4" style={{ padding: "15px 40px" }}>
                <div className="row px-3">
                    {
                        bookingData.map((data, idx) => (
                            <div key={idx} className="col-lg-6 col-sm-12 row px-2 my-2 ">
                                <div className="col-6 ">
                                    <label className="text-18 text-secondary2 fw-normal">{data.lable}</label>
                                </div>
                                <div className="col-6">
                                    <label className="text">
                                        <span className="me-3">
                                            <span className="fw-normal text-18">
                                                : {data.value}
                                            </span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <h5 className="mt-5 mb-2 text-red fw-semibold">LOGS</h5>

            <div className="card card-shadow bg-card3 my-4 py-4 px-5">
                <h4 className="text-red fw-semibold mb-0">
                    <img src="/logs.svg" alt="" /> Logs
                </h4>

                {/* Timeline */}
                <div className="timeline">
                    {timelineData.map((item, index) =>
                        item.yearChange ? (
                            <div key={index} className="timeline-item year-change">
                                <div className="timeline-icon year-icon"></div>
                                <div className="timeline-content text-danger fst-italic">
                                    {item.text}
                                </div>
                            </div>
                        ) : (
                            <div key={index} className="timeline-item">
                                <div className="timeline-icon"></div>
                                <div className="timeline-content">
                                    <span className="date">
                                        {item.date} <span className="time">{item.time}</span>
                                    </span>
                                    <p className="mb-0">{item.text}</p>
                                </div>
                            </div>
                        )
                    )}
                </div>

                <div className="mt-4">
                    <button className="btn-red fw-light d-flex align-items-center gap-2" style={{ padding: "4px 20px" }}>
                        <CircleChevronDownIcon size={15} color="#fff" /> View More
                    </button>
                </div>
            </div>
        </>
    )
}

export default BookingDetails