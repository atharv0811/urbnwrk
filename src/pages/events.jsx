import { Eye, Search, SlidersHorizontal } from "lucide-react"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"

const tableData = [
    {
        title: "Event 1",
        unit: "Unit 1",
        createdBy: "John Doe",
        startDate: "01/01/2023 6:00 AM",
        endDate: "01/01/2023 6:00 PM",
        eventType: "Personal",
        status: "Published",

        attachments: null,
        createdOn: "01/01/2023"
    },
    {
        title: "Event 1",
        unit: "Unit 1",
        createdBy: "John Doe",
        startDate: "01/01/2023 6:00 AM",
        endDate: "01/01/2023 6:00 PM",
        eventType: "Personal",
        status: "Published",

        attachments: null,
        createdOn: "01/01/2023"
    },
    {
        title: "Event 1",
        unit: "Unit 1",
        createdBy: "John Doe",
        startDate: "01/01/2023 6:00 AM",
        endDate: "01/01/2023 6:00 PM",
        eventType: "Personal",
        status: "Published",

        attachments: null,
        createdOn: "01/01/2023"
    },
    {
        title: "Event 1",
        unit: "Unit 1",
        createdBy: "John Doe",
        startDate: "01/01/2023 6:00 AM",
        endDate: "01/01/2023 6:00 PM",
        eventType: "Personal",
        status: "Expired",

        attachments: null,
        createdOn: "01/01/2023"
    },
    {
        title: "Event 1",
        unit: "Unit 1",
        createdBy: "John Doe",
        startDate: "01/01/2023 6:00 AM",
        endDate: "01/01/2023 6:00 PM",
        eventType: "Personal",
        status: "Published",

        attachments: null,
        createdOn: "01/01/2023"
    },
    {
        title: "Event 1",
        unit: "Unit 1",
        createdBy: "John Doe",
        startDate: "01/01/2023 6:00 AM",
        endDate: "01/01/2023 6:00 PM",
        eventType: "Personal",
        status: "Published",

        attachments: null,
        createdOn: "01/01/2023"
    },
    {
        title: "Event 1",
        unit: "Unit 1",
        createdBy: "John Doe",
        startDate: "01/01/2023 6:00 AM",
        endDate: "01/01/2023 6:00 PM",
        eventType: "Personal",
        status: "Expired",

        attachments: null,
        createdOn: "01/01/2023"
    },
]

const statusOptions = [
    { value: "Published", label: "Publish", color: "green" },
    { value: "Expired", label: "Expire", color: "red" },
];

const Events = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState({});

    const handleStatusChange = (index, status) => {
        setSelectedStatus((prev) => ({ ...prev, [index]: status }));
    };

    const statusBgColors = {
        Published: "#3A8E5C",
        Expired: "#B71C1C",
    };

    const statusTextColors = {
        Published: "white",
        Expired: "white",
    };

    return (
        <>
            <span className="text-secondary text-18 fw-medium">
                <Link to="" className="text-decoration-none text-secondary">Events</Link> {">"} Event List
            </span>

            <h5 className="my-2 text-red fw-semibold text-26">EVENT LIST</h5>

            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                    <div className="position-relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search"
                            className="form-control rounded-0 text-secondary"
                            style={{ padding: "8px 3px 8px 30px", width: "230px" }}
                        />
                        <Search
                            size={15}
                            className="text-secondary2 position-absolute top-50 translate-middle-y"
                            style={{ left: "10px" }}
                        />
                    </div>
                    <button className="btn-red fw-normal" style={{ padding: "8px 10px" }}>
                        Go !
                    </button>
                    <button
                        className="rounded-0 fw-normal text-red bg-transparent border-red"
                        style={{ padding: "8px 10px" }}
                        onClick={() => setSearchQuery("")}
                    >
                        Reset
                    </button>
                </div>
                <div className="d-flex align-items-center gap-2 my-4">
                    <Link to="add-event" className="text-decoration-none">
                        <button
                            className="btn-red fw-normal d-flex align-items-center gap-2"
                            style={{ padding: "8px 30px" }}
                        >
                            + <span className="d-none d-lg-block text-white">Add</span>
                        </button>
                    </Link>
                    <button
                        className="btn-red fw-normal d-flex align-items-center gap-2"
                        style={{ padding: "8px 30px" }}
                    >
                        <SlidersHorizontal size={15} color="#fff" className="my-1 my-lg-0" /> <span className="d-none d-lg-block text-white">Filter</span>
                    </button>
                </div>
            </div>

            <div className="table-responsive">
                <table className="text-start custom-table w-100">
                    <thead className="text-nowrap">
                        <tr>
                            <th className="text-center">View</th>
                            <th>Title</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Event Type</th>
                            <th>Status</th>
                            <th>Attachments</th>
                            <th>Created On</th>
                            <th>Created by</th>
                        </tr>
                    </thead>
                    <tbody className="text-nowrap">
                        {
                            tableData.map((data, index) => (
                                <tr key={index}>
                                    <td className="text-center">
                                        <Eye size={20} style={{ cursor: "pointer" }} onClick={
                                            () => navigate(`/events/${index}`)
                                        } />
                                    </td>
                                    <td>{data.title}</td>
                                    <td>{data.startDate}</td>
                                    <td>{data.endDate}</td>
                                    <td>
                                        <span className="capsule">
                                            {data.eventType}
                                        </span>
                                    </td>
                                    <td style={{ padding: "10px 0" }}>
                                        <div className="dropdown">
                                            <button
                                                className="btn dropdown-toggle status-dropdown rounded-0"
                                                type="button"
                                                id={`dropdownMenuButton${index}`}
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                                style={{
                                                    backgroundColor: statusBgColors[selectedStatus[index] || data.status],
                                                    color: statusTextColors[selectedStatus[index] || data.status],
                                                }}
                                            >
                                                {selectedStatus[index] || data.status}
                                            </button>
                                            <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${index}`}>
                                                {statusOptions.map((option) => (
                                                    <li key={option.value}>
                                                        <button
                                                            className="dropdown-item"
                                                            onClick={() => handleStatusChange(index, option.value)}
                                                            style={{ color: option.color }}
                                                        >
                                                            {option.label}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </td>
                                    <td>{data.attachments}</td>
                                    <td>{data.createdOn}</td>
                                    <td>{data.createdBy}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Events