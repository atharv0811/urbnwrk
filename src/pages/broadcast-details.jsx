import axios from "axios";
import { Printer } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const statusOptions = [
    { value: "Disable", label: "Disable", color: "gray" },
];

const statusBgColors = {
    Published: "#3A8E5C",
    Disable: "#D5DBDB"
};

const statusTextColors = {
    Published: "white",
    Disable: "black"
};

const BroadcastDetails = () => {
    const { id } = useParams();

    const [broadcastDetails, setBroadcastDetails] = useState({});
    const [selectedStatus, setSelectedStatus] = useState();

    const token = localStorage.getItem("access_token");

    const fetchDetails = async () => {
        try {
            const response = await axios.get(`https://app.gophygital.work/pms/admin/noticeboards/${id}.json`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log(response)
            setBroadcastDetails(response.data)
            setSelectedStatus(response.data.status)
        } catch (error) {
            console.log(error)
        }
    };
    console.log(selectedStatus)

    useEffect(() => {
        fetchDetails();
    }, [])

    const handleStatusChange = async (status) => {
        const newStatus = status === 'Published' ? 1 : 2
        try {
            await axios.put(`https://app.gophygital.work/pms/admin/noticeboards/${id}.json`, {
                "noticeboard": {
                    "publish": newStatus
                }
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setSelectedStatus(status);
        } catch (error) {
            console.log(error)
        }
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
                            disabled={selectedStatus === "Disable"}
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
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label className="text-18 text-secondary2 fw-normal">Status</label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="fw-normal text-18">
                                        : {broadcastDetails.shared === 1 ? "Personal" : "General"}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label className="text-18 text-secondary2 fw-normal">Created On</label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="fw-normal text-18">
                                        : {(broadcastDetails.created_at)?.split("T")[0]}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label className="text-18 text-secondary2 fw-normal">End Date & Time</label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="fw-normal text-18">
                                        : {broadcastDetails.expire_time
                                            ? (() => {
                                                const dateObj = new Date(broadcastDetails.expire_time);
                                                const date = dateObj.toISOString().split("T")[0]; // YYYY-MM-DD

                                                // Convert time to 12-hour format
                                                const hours = dateObj.getHours();
                                                const minutes = dateObj.getMinutes().toString().padStart(2, "0");
                                                const ampm = hours >= 12 ? "PM" : "AM";
                                                const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format
                                                const time = `${formattedHours}:${minutes} ${ampm}`;

                                                return `${date} ${time}`;
                                            })()
                                            : "N/A"}
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

                <p className="text-18 fw-normal">
                    {broadcastDetails.notice_text}
                </p>
            </div>

            <div className="card card-shadow bg-card3 p-3 my-4">
                <span className="fw-medium">ATTACHMENTS</span>
                <span className="divider-horizontal"></span>

                <div>
                    {
                        broadcastDetails.attachments?.length > 0 && (
                            <img src={broadcastDetails?.attachments[0]?.document_url} alt="" className="rounded-2 w-25" />

                        )}
                </div>
            </div>

            <div className="card card-shadow bg-card3 p-3 my-4">
                <span className="fw-medium">SHARED WITH</span>
                <span className="divider-horizontal"></span>

                <ol>
                    {
                        broadcastDetails.shared_notices?.map(((data, idx) => (
                            <li key={idx}>
                                <span className="fw-medium">{data}</span>
                            </li>
                        )))
                    }

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
