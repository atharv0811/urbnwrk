import { Link } from "react-router-dom";

const ticketDetails = [
    {
        label: "Title",
        value: "Test",
    },
    {
        label: "Created On",
        value: "24/01/2025 11:00 AM",
    },
    {
        label: "Ticket Number",
        value: "1234567890",
    },
    {
        label: "Status",
        value: "Closed",
    },
    {
        label: "Cateogory",
        value: "Cleaning Services",
    },
    {
        label: "Admin Priority",
        value: "P1",
    },
    {
        label: "Subcategory",
        value: "Common Lobby Area",
    },
    {
        label: "Reference Number",
        value: "20/01/2025 06:24 PM",
    },
];

const creatorDetails = [
    {
        label: "Created By",
        value: "Customer Cred",
    },
    {
        label: "Department",
        value: "Admin",
    },
    {
        label: "Site",
        value: "Panchashil Test",
    },
    {
        label: "Unit",
        value: "Closed",
    },
];

const locationDetails = [
    {
        label: "Region",
        value: "Panchashil Test",
    },
    {
        label: "Zone",
        value: "Admin",
    },
    {
        label: "City",
        value: "Panchashil Test",
    },
    {
        label: "District",
        value: "Panchashil Test",
    },
    {
        label: "State",
        value: "Panchashil Test",
    },
    {
        label: "Address",
        value: "Panchashil Test",
    },
    {
        label: "Building",
        value: "Panchashil Test",
    },
    {
        label: "Floor",
        value: "Panchashil Test",
    },
    {
        label: "Room",
        value: "Panchashil Test",
    },
];

const TicketsDetails = () => {
    return (
        <>
            <span className="text-secondary text-18 fw-medium">
                <Link to="/events" className="text-decoration-none text-secondary">
                    Tickets
                </Link>{" "}
                {">"} Ticket Details
            </span>

            <h5 className="my-2 text-red fw-semibold text-26">TICKET DETAILS</h5>

            <div className="card bg-card card-shadow my-4 p-3">
                <div className="row px-3">
                    {ticketDetails.map((data, idx) => (
                        <div key={idx} className="col-lg-6 col-sm-12 row px-2 my-2 ">
                            <div className="col-6 ">
                                <label
                                    className="text-18 fw-medium"
                                    style={{ color: "rgba(26, 26, 26, 0.54)" }}
                                >
                                    {data.label}
                                </label>
                            </div>
                            <div className="col-6">
                                <label className="text">
                                    <span className="me-3">
                                        <span className="text-dark fw-medium text-18">
                                            : {data.value}
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <h5 className="my-2 text-red fw-semibold text-26">
                CREATOR'S INFORMATION
            </h5>

            <div className="card bg-card card-shadow my-4 p-3">
                <div className="row px-3">
                    {creatorDetails.map((data, idx) => (
                        <div key={idx} className="col-lg-6 col-sm-12 row px-2 my-2 ">
                            <div className="col-6 ">
                                <label
                                    className="text-18 fw-medium"
                                    style={{ color: "rgba(26, 26, 26, 0.54)" }}
                                >
                                    {data.label}
                                </label>
                            </div>
                            <div className="col-6">
                                <label className="text">
                                    <span className="me-3">
                                        <span className="text-dark fw-medium text-18">
                                            : {data.value}
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <h5 className="my-2 text-red fw-semibold text-26">
                LOCATION INFORMATION
            </h5>

            <div className="card bg-card card-shadow my-4 p-3">
                <div className="row px-3">
                    {locationDetails.map((data, idx) => (
                        <div key={idx} className="col-lg-6 col-sm-12 row px-2 my-2 ">
                            <div className="col-6 ">
                                <label
                                    className="text-18 fw-medium"
                                    style={{ color: "rgba(26, 26, 26, 0.54)" }}
                                >
                                    {data.label}
                                </label>
                            </div>
                            <div className="col-6">
                                <label className="text">
                                    <span className="me-3">
                                        <span className="text-dark fw-medium text-18">
                                            : {data.value}
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <h5 className="my-2 text-red fw-semibold text-26">
                ADDITIONAL INFORMATION
            </h5>

            <div className="card bg-card card-shadow my-4 p-3">
                <div className="row px-3">
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-medium"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Assigned To
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-medium text-18">
                                        : Customer Cred
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-medium"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                External Priority
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-medium text-18">
                                        : Customer Cred
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-medium"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Proactive/Reactive
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-medium text-18">
                                        : Customer Cred
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-medium"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Review(Tracking)
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-medium text-18">
                                        : Customer Cred
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-medium"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Service Type
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-medium text-18">
                                        : Customer Cred
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-medium"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Corrective Action
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-medium text-18">
                                        : Customer Cred
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-medium"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Complaint Mode
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-medium text-18">
                                        : Customer Cred
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-medium"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Preventive Action
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-medium text-18">
                                        : Customer Cred
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-medium"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Responsible Person
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-medium text-18">
                                        : Customer Cred
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-medium"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Impact
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-medium text-18">
                                        : Customer Cred
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-medium"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Correction
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-medium text-18">
                                        : Customer Cred
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-medium"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Root Cause
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-medium text-18">
                                        : Customer Cred
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-medium"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Asset/Service
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-medium text-18">
                                        : Customer Cred
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-medium"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Task ID
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-medium text-18">
                                        : Customer Cred
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-medium"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Asset/Service Location
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-medium text-18">
                                        : Customer Cred
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-medium"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Notes
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-medium text-18">
                                        : Customer Cred
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <h5 className="my-2 text-red fw-semibold text-26">
                ATTACHMENTS
            </h5>

            <div className="card card-shadow bg-card p-3 my-4">
                <div>
                    <img src="/image.png" alt="" className="rounded-2" />
                </div>
            </div>
        </>
    );
};

export default TicketsDetails;
