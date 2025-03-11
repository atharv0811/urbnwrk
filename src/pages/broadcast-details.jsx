import { Pen, Printer } from "lucide-react";
import React from "react";
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
    },
    {
        label: "Description",
        value: "Testing",
    },
];

const BroadcastDetails = () => {
    return (
        <>
            <span className="text-secondary">
                <Link to="/events" className="text-decoration-none text-secondary">
                    Broadcast List
                </Link>{" "}
                {">"} Broadcast Details
            </span>

            <div className="d-flex align-items-center justify-content-between">
                <h5 className="my-2 text-red fw-semibold">Broadcast Details</h5>
                <button className="btn-red fw-light" style={{ padding: "4px 18px" }}>
                    <Printer size={15} /> Print
                </button>
            </div>

            <div className="card bg-card card-shadow my-4 p-3">
                <span className="fw-medium">BROADCAST DETAILS</span>
                <span className="divider-horizontal"></span>

                <div className="mb-3 d-flex align-items-center gap-2">
                    <span className="fw-semibold">Status Type</span>{" "}
                    <span className="d-flex align-items-center gap-2">
                        : Published <Pen size={15} style={{ cursor: "pointer" }} />
                    </span>
                </div>
                <div className="row px-3">
                    {broadcastDetails.map((data, idx) => (
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

            <div className="card card-shadow bg-card p-3 my-4">
                <span className="fw-medium">ATTACHMENTS</span>
                <span className="divider-horizontal"></span>

                <div>
                    <img src="/image.png" alt="" className="rounded-2" />
                </div>
            </div>

            <div className="card card-shadow bg-card p-3 my-4">
                <span className="fw-medium">SHARED WITH</span>
                <span className="divider-horizontal"></span>

                <ol>
                    <li>
                        <span className="fw-semibold">Shubham Khopade</span>
                    </li>
                </ol>
            </div>

            <div className="card card-shadow bg-card p-3 my-4">
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
