import { Eye, SlidersHorizontal } from "lucide-react"
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

const Events = () => {
    const navigate = useNavigate();

    return (
        <>
            <span className="text-secondary">
                <Link to="" className="text-decoration-none text-secondary">Events</Link> {">"} Event List
            </span>

            <h5 className="my-2 text-red fw-semibold">EVENT LIST</h5>

            <div className="d-flex align-items-center justify-content-between my-4">
                <Link to="add-event">
                    <button className="btn-red fw-light" style={{ padding: "4px 18px" }}>
                        + Add
                    </button>
                </Link>
                <button className="btn-red fw-light d-flex align-items-center gap-2" style={{ padding: "4px 18px" }}>
                    <SlidersHorizontal size={12} /> Filter
                </button>
            </div>

            <div className="table-responsive">
                <table className="text-start custom-table w-100">
                    <thead className="text-nowrap">
                        <tr>
                            <th>View</th>
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
                            tableData.map((data, idx) => (
                                <tr key={idx}>
                                    <td>
                                        <Eye size={20} style={{ cursor: "pointer" }} onClick={
                                            () => navigate(`/events/${idx}`)
                                        } />
                                    </td>
                                    <td>{data.title}</td>
                                    <td>{data.startDate}</td>
                                    <td>{data.endDate}</td>
                                    <td>
                                        <span className="capsule capsule-primary">
                                            {data.eventType}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`capsule ${data.status === 'Published' ? "capsule-success" : "capsule-danger"}`}>
                                            {data.status}
                                        </span>
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