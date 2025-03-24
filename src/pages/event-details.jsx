import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const statusOptions = [
    { value: "Published", label: "Publish", color: "green" },
    { value: "Pending", label: "Disable", color: "gray" },
];

const statusBgColors = {
    Published: "#3A8E5C",
    Pending: "#D5DBDB",
    Disabled: "#D5DBDB",
};

const statusTextColors = {
    Published: "white",
    Pending: "black",
    Disabled: "black",
};

const EventDetails = () => {
    const { id } = useParams();

    const [eventDetails, setEventDetails] = useState({});
    const [selectedStatus, setSelectedStatus] = useState();

    const token = localStorage.getItem("access_token");

    const fetchEventDetails = async () => {
        try {
            const response = await axios.get(
                `https://app.gophygital.work/pms/admin/events/${id}.json`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);
            setEventDetails(response.data);
            setSelectedStatus(response.data.status === "Pending" ? "Disabled" : "Published");
        } catch (error) {
            console.log(error);
        }
    };

    console.log(selectedStatus)

    useEffect(() => {
        fetchEventDetails();
    }, []);

    const handleStatusChange = async (status) => {
        console.log(status);
        const newStatus = status === "Pending" ? 2 : 1;
        try {
            await axios.put(
                `https://app.gophygital.work/pms/admin/events/${id}.json?event[publish]=${newStatus}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSelectedStatus(status === "Pending" ? "Disabled" : "Published");
        } catch (error) {
            console.log(error);
        }
    };

    console.log(eventDetails)

    return (
        <>
            <span className="text-secondary text-18 fw-medium">
                <Link to="/events" className="text-decoration-none text-secondary">
                    Event List
                </Link>{" "}
                {">"} Event Details
            </span>

            <h5 className="my-2 text-red fw-medium text-26">EVENT DETAILS</h5>

            <div className="card bg-card3 card-shadow my-4 p-3">
                <span className="fw-medium">EVENT DETAILS</span>
                <span className="divider-horizontal"></span>

                <div className="row px-3">
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label className="text-18 text-secondary2 fw-normal">Title</label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="fw-normal text-18">
                                        : {eventDetails.event_name}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label className="text-18 text-secondary2 fw-normal">Venue</label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="fw-normal text-18">
                                        : {eventDetails.event_at}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label className="text-18 text-secondary2 fw-normal">
                                Start Date
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="fw-normal text-18">
                                        : {eventDetails.from_time?.split("T")[0]}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label className="text-18 text-secondary2 fw-normal">RSVP</label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="fw-normal text-18">
                                        {/* : {(eventDetails.to_time)?.split('T')[0]} */}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label className="text-18 text-secondary2 fw-normal">
                                Event Type
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="fw-normal text-18">
                                        : {eventDetails.event_type}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label className="text-18 text-secondary2 fw-normal">
                                Event Status
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="fw-normal text-18 d-flex align-items-center gap-2">
                                        {/* : {eventDetails.status} */}:{" "}
                                        <div className="dropdown">
                                            <button
                                                className="btn dropdown-toggle status-dropdown rounded-0"
                                                type="button"
                                                id={`dropdownMenuButton`}
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                                style={{
                                                    backgroundColor: statusBgColors[selectedStatus],
                                                    color: statusTextColors[selectedStatus],
                                                }}
                                            >
                                                {selectedStatus?.charAt(0).toUpperCase() +
                                                    selectedStatus?.slice(1)}
                                            </button>
                                            <ul
                                                className="dropdown-menu"
                                                aria-labelledby={`dropdownMenuButton`}
                                            >
                                                {statusOptions.map((option) => (
                                                    <li key={option.value}>
                                                        <button
                                                            className="dropdown-item"
                                                            onClick={() => handleStatusChange(option.value)}
                                                            style={{ color: option.color }}
                                                        >
                                                            {option.label}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label className="text-18 text-secondary2 fw-normal">
                                Expired
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="fw-normal text-18">
                                        : {eventDetails.is_expired ? "Expired" : "Not Expired"}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label className="text-18 text-secondary2 fw-normal">
                                Feedback
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="fw-normal text-18">
                                        : {eventDetails.feedbacks?.lenght}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card card-shadow bg-card3 p-3 my-4">
                <span className="fw-medium">DESCRIPTION</span>
                <span className="divider-horizontal"></span>

                <p className="text-18 fw-normal">{eventDetails.description}</p>
            </div>

            <div className="card card-shadow bg-card3 p-3">
                <span className="fw-medium">ATTACHMENTS</span>
                <span className="divider-horizontal"></span>

                <div>
                    {eventDetails.documents?.length > 0 && (
                        <img src={eventDetails.documents[0].document} alt="" className="rounded-2 w-25" />
                    )}
                </div>
            </div>
        </>
    );
};

export default EventDetails;
