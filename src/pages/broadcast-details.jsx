import { Printer } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const broadcastDetails = [
    {
        label: "Status",
        value: "Personal",
    },
    {
        label: "Created On",
        value: "17/09/2024 - 9:46 AM",
    },
    {
        label: "End Date & Time",
        value: "30/09/2024 - 12:00 PM",
    }
];

const statusOptions = [
    { value: "Published", label: "Publish", color: "green" },
    { value: "Expired", label: "Expire", color: "red" },
    { value: "Disabled", label: "Disable", color: "gray" },
];

const BroadcastDetails = () => {
    const [selectedStatus, setSelectedStatus] = useState("Published");

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
    };

    const statusBgColors = {
        Published: "#3A8E5C",
        Expired: "#B71C1C",
        Disabled: "#D5DBDB"
    };

    const statusTextColors = {
        Published: "white",
        Expired: "white",
        Disabled: "black"
    };

    return (
        <>
            <span className="text-secondary text-18 fw-medium">
                <Link to="/events" className="text-decoration-none text-secondary">
                    Broadcast List
                </Link>{" "}
                {">"} Broadcast Details
            </span>

            <div className="d-flex align-items-center justify-content-between">
                <h5 className="my-2 text-red fw-medium text-26">BROADCAST DETAILS</h5>
                <button className="btn-red fw-normal" style={{ padding: "8px 30px" }}>
                    <Printer size={18} color="#fff" /> Print
                </button>
            </div>

            <div className="card bg-card3 card-shadow my-4 p-3">
                <div className="mb-3 d-flex align-items-center gap-3">
                    <span className="fw-normal">Status Type : </span>{" "}
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
                            {selectedStatus}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton`}>
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
                </div>
                <div className="row px-3">
                    {broadcastDetails.map((data, idx) => (
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

            <div className="card card-shadow bg-card3 p-3 my-4">
                <span className="fw-medium">ATTACHMENTS</span>
                <span className="divider-horizontal"></span>

                <div>
                    <img src="/logo.jpg" alt="" className="rounded-2" />
                </div>
            </div>

            <div className="card card-shadow bg-card3 p-3 my-4">
                <span className="fw-medium">SHARED WITH</span>
                <span className="divider-horizontal"></span>

                <ol>
                    <li>
                        <span className="fw-medium">Shubham Khopade</span>
                    </li>
                </ol>
            </div>

            <div className="card card-shadow bg-card3 p-3 my-4">
                <span className="fw-medium">READ BY</span>
                <span className="divider-horizontal"></span>

                <div className="table-responsive">
                    <table className="text-start custom-table w-100">
                        <thead className="text-nowrap">
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Site
                                </th>
                                <th>
                                    Department
                                </th>
                                <th>
                                    Designation
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-nowrap">

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default BroadcastDetails;
