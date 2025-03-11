import { Link } from "react-router-dom";

const eventDetails = [
    {
        label: "Title",
        value: "Event 1",
    },
    {
        label: "Venue",
        value: "Jax",
    },
    {
        label: "Start Date",
        value: "01/01/2023",
    },
    {
        label: "End Date",
        value: "01/01/2023",
    },
    {
        label: "RSPV",
        value: "Yes",
    },
    {
        label: "Event Type",
        value: "Personal",
    },
    {
        label: "Event Status",
        value: "Published",
    },
    {
        label: "Expired",
        value: "Expired",
    },
    {
        label: "Feedback",
        value: "",
    },
    {
        label: "Description",
        value: "dlkfsajlkdahksdlsdafk",
    },
];

const EventDetails = () => {
    return (
        <>
            <span className="text-secondary">
                <Link to="/events" className="text-decoration-none text-secondary">
                    Event List
                </Link>{" "}
                {">"} Event Details
            </span>

            <h5 className="my-2 text-red fw-semibold">Event Details</h5>

            <div className="card bg-card card-shadow my-4 p-3">
                <span className="fw-medium">EVENT DETAILS</span>
                <span className="divider-horizontal"></span>

                <div className="row px-3">
                    {eventDetails.map((data, idx) => (
                        <div key={idx} className="col-lg-6 col-sm-12 row px-2 my-2 ">
                            <div className="col-6 ">
                                <label>{data.label}</label>
                            </div>
                            <div className="col-6">
                                <label className="text">
                                    <span className="me-3">
                                        <span className="text-dark fw-semibold">
                                            : {data.value}
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card card-shadow bg-card p-3">
                <span className="fw-medium">ATTACHMENTS</span>
                <span className="divider-horizontal"></span>

                <div>
                    <img src="/image.png" alt="" className="rounded-2" />
                </div>
            </div>
        </>
    );
};

export default EventDetails;
