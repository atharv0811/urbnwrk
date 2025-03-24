import axios from "axios";
import { CircleChevronDownIcon, File } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const timelineData = [
    {
        date: "23rd February 2025",
        time: "6:30PM",
        text: "Abdul booked the meeting room (Zeus)",
    },
    {
        date: "22nd February 2025",
        time: "6:30PM",
        text: "Abdul cancelled the meeting room (Zeus)",
    },
    { date: "21st February 2025", time: "6:30PM", text: "Refund Initiated" },
    {
        date: "21st February 2025",
        time: "6:30PM",
        text: "Amount successfully refunded",
    },
    {
        date: "21st February 2025",
        time: "6:30PM",
        text: "Abdul booked the meeting room (Zeus)",
    },
    {
        date: "21st February 2025",
        time: "6:30PM",
        text: "Abdul cancelled the meeting room (Zeus)",
    },
    { yearChange: true, text: "Change in a Year" },
    {
        date: "21st December 2024",
        time: "6:30PM",
        text: "Abdul booked the meeting room (Zeus)",
    },
    { date: "20th December 2024", time: "6:30PM", text: "Refund Initiated" },
    {
        date: "19th December 2024",
        time: "6:30PM",
        text: "Amount successfully refunded",
    },
];

const BookingDetails = () => {
    const { id } = useParams();
    const [bookingDetails, setBookingDetails] = useState({});

    const token = localStorage.getItem("access_token");

    const fetchBookingDetails = async () => {
        try {
            const response = await axios.get(
                `https://app.gophygital.work/pms/admin/facility_bookings/${id}.json`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setBookingDetails(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchBookingDetails();
    }, []);

    return (
        <>
            <span className="text-secondary text-18 fw-medium">
                <Link to="/bookings" className="text-decoration-none text-secondary">
                    Booking
                </Link>{" "}
                {">"} Booking details
            </span>

            <h5 className="my-2 text-red fw-medium text-26">BOOKING DETAILS</h5>

            <div
                className="card bg-card3 card-shadow my-4"
                style={{ padding: "15px 40px" }}
            >
                <div className="row px-3">
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label className="text-18 text-secondary2 fw-normal">
                                Meeting Room Name
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="fw-normal text-18">
                                        : {bookingDetails.facility_name}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label className="text-18 text-secondary2 fw-normal">
                                Status
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="fw-normal text-18">
                                        : {bookingDetails.current_status}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label className="text-18 text-secondary2 fw-normal">
                                Booking ID
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="fw-normal text-18">
                                        : {bookingDetails.id}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label className="text-18 text-secondary2 fw-normal">
                                Created On
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="fw-normal text-18">
                                        : {bookingDetails.created_at?.split("T")[0]}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label className="text-18 text-secondary2 fw-normal">
                                Booked By
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="fw-normal text-18">
                                        : {bookingDetails.placed_by?.split("T")[0]}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label className="text-18 text-secondary2 fw-normal">
                                Scheduled Date
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="fw-normal text-18">
                                        : {bookingDetails.startdate?.split("T")[0]}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label className="text-18 text-secondary2 fw-normal">
                                Scheduled Slot
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="fw-normal text-18">
                                        :{" "}
                                        {(() => {
                                            const startTime = bookingDetails.show_schedule_arr?.length
                                                ? bookingDetails.show_schedule_arr[0].split(" to ")[0]
                                                : "N/A"; // First start time
                                            const endTime = bookingDetails.show_schedule_arr?.length
                                                ? bookingDetails.show_schedule_arr[
                                                    bookingDetails.show_schedule_arr.length - 1
                                                ].split(" to ")[1]
                                                : "N/A"; // Last end time
                                            return `${startTime} to ${endTime}`;
                                        })()}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label className="text-18 text-secondary2 fw-normal">
                                Cancelled On
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="fw-normal text-18">
                                        : {bookingDetails.cancelled_on}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label className="text-18 text-secondary2 fw-normal">
                                Cancelled By
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="fw-normal text-18">
                                        : {bookingDetails.cancel_by}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label className="text-18 text-secondary2 fw-normal">
                                Payment Method
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="fw-normal text-18">
                                        : {bookingDetails.payment_method}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label className="text-18 text-secondary2 fw-normal">
                                Comment
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="fw-normal text-18">
                                        : {bookingDetails.comment}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label className="text-18 text-secondary2 fw-normal">
                                Total Amount
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="fw-normal text-18">
                                        : {bookingDetails.amount_full}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label className="text-18 text-secondary2 fw-normal">GST</label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="fw-normal text-18">
                                        : {bookingDetails.gst}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label className="text-18 text-secondary2 fw-normal">
                                Transaction ID
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="fw-normal text-18">
                                        : {bookingDetails.pg_transaction_id}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label className="text-18 text-secondary2 fw-normal">SGST</label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="fw-normal text-18">
                                        : {bookingDetails.sgst}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
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
                    <button
                        className="btn-red fw-light d-flex align-items-center gap-2"
                        style={{ padding: "4px 20px" }}
                    >
                        <CircleChevronDownIcon size={15} color="#fff" /> View More
                    </button>
                </div>
            </div>
        </>
    );
};

export default BookingDetails;
