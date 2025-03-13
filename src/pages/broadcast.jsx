import { Eye, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const tableData = [
    {
        title: "Test",
        type: "Personal",
        createdOn: "17/09/2024",
        createdBy: "Shubham Khopade",
        status: "Published",
        expiredOn: "30/09/2024",
        expired: "Yes",
        attachment: null,
    },
    {
        title: "Test",
        type: "Personal",
        createdOn: "17/09/2024",
        createdBy: "Shubham Khopade",
        status: "Published",
        expiredOn: "30/09/2024",
        expired: "Yes",
        attachment: null,
    },
    {
        title: "Test",
        type: "Personal",
        createdOn: "17/09/2024",
        createdBy: "Shubham Khopade",
        status: "Published",
        expiredOn: "30/09/2024",
        expired: "Yes",
        attachment: null,
    },
    {
        title: "Test",
        type: "Personal",
        createdOn: "17/09/2024",
        createdBy: "Shubham Khopade",
        status: "Published",
        expiredOn: "30/09/2024",
        expired: "Yes",
        attachment: null,
    },
    {
        title: "Test",
        type: "Personal",
        createdOn: "17/09/2024",
        createdBy: "Shubham Khopade",
        status: "Published",
        expiredOn: "30/09/2024",
        expired: "Yes",
        attachment: null,
    },
    {
        title: "Test",
        type: "Personal",
        createdOn: "17/09/2024",
        createdBy: "Shubham Khopade",
        status: "Published",
        expiredOn: "30/09/2024",
        expired: "Yes",
        attachment: null,
    },
    {
        title: "Test",
        type: "Personal",
        createdOn: "17/09/2024",
        createdBy: "Shubham Khopade",
        status: "Published",
        expiredOn: "30/09/2024",
        expired: "Yes",
        attachment: null,
    },
    {
        title: "Test",
        type: "Personal",
        createdOn: "17/09/2024",
        createdBy: "Shubham Khopade",
        status: "Published",
        expiredOn: "30/09/2024",
        expired: "Yes",
        attachment: null,
    },
];

const Broadcats = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <>
            <span className="text-secondary text-18 fw-medium">
                <Link to="" className="text-decoration-none text-secondary">
                    Broadcasts
                </Link>{" "}
                {">"} Broadcast List
            </span>

            <h5 className="my-2 text-red fw-semibold text-26">BROADCAST LIST</h5>

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
                    <Link to="add-broadcast" className="text-decoration-none">
                        <button
                            className="btn-red fw-normal d-flex align-items-center gap-2"
                            style={{ padding: "8px 30px" }}
                        >
                            + <span className="d-none d-lg-block">Add</span>
                        </button>
                    </Link>
                    <button
                        className="btn-red fw-normal d-flex align-items-center gap-2"
                        style={{ padding: "8px 30px" }}
                    >
                        <SlidersHorizontal size={15} className="my-1 my-lg-0" /> <span className="d-none d-lg-block">Filter</span>
                    </button>
                </div>
            </div>

            <div className="table-responsive">
                <table className="text-start custom-table w-100">
                    <thead className="text-nowrap">
                        <tr>
                            <th>View</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Created On</th>
                            <th>Created By</th>
                            <th>Status</th>
                            <th>Expired On</th>
                            <th>Expired</th>
                            <th>Attachment</th>
                        </tr>
                    </thead>
                    <tbody className="text-nowrap">
                        {tableData.map((data, idx) => (
                            <tr key={idx}>
                                <td>
                                    <Eye
                                        size={20}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            navigate(`/broadcast/${idx}`);
                                        }}
                                    />
                                </td>
                                <td>{data.title}</td>
                                <td>{data.type}</td>
                                <td className="text-end">{data.createdOn}</td>
                                <td>{data.createdBy}</td>
                                <td>{data.status}</td>
                                <td className="text-end">{data.expiredOn}</td>
                                <td>{data.expired}</td>
                                <td>{data.attachment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Broadcats;
