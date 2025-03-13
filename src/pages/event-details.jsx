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
];

const EventDetails = () => {
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
                    {eventDetails.map((data, idx) => (
                        <div key={idx} className="col-lg-6 col-sm-12 row px-2 my-2 ">
                            <div className="col-6 ">
                                <label className="text-18 text-secondary2 fw-normal">{data.label}</label>
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
                    ))}
                </div>
            </div>

            <div className="card card-shadow bg-card3 p-3 my-4">
                <span className="fw-medium">DESCRIPTION</span>
                <span className="divider-horizontal"></span>

                <p className="text-18 fw-normal">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum assumenda nihil in laboriosam. Quos labore velit vero? Aliquam, incidunt laudantium.
                </p>
            </div>

            <div className="card card-shadow bg-card3 p-3">
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
