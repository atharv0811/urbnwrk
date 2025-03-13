import { Eye, Search, SlidersHorizontal } from "lucide-react"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"

const tableData = [
    {
        ticketNo: "123-9087",
        description: "Test",
        category: "Cleaning Service",
        subCategory: "COMMON LOBBY AREA",
        createdBy: "Customer Cred",
        assignedTo: "Abdul",
    },
    {
        ticketNo: "123-9087",
        description: "Test",
        category: "Cleaning Service",
        subCategory: "COMMON LOBBY AREA",
        createdBy: "Customer Cred",
        assignedTo: "Abdul",
    },
    {
        ticketNo: "123-9087",
        description: "Test",
        category: "Cleaning Service",
        subCategory: "COMMON LOBBY AREA",
        createdBy: "Customer Cred",
        assignedTo: "Abdul",
    },
    {
        ticketNo: "123-9087",
        description: "Test",
        category: "Cleaning Service",
        subCategory: "COMMON LOBBY AREA",
        createdBy: "Customer Cred",
        assignedTo: "Abdul",
    },
    {
        ticketNo: "123-9087",
        description: "Test",
        category: "Cleaning Service",
        subCategory: "COMMON LOBBY AREA",
        createdBy: "Customer Cred",
        assignedTo: "Abdul",
    },
    {
        ticketNo: "123-9087",
        description: "Test",
        category: "Cleaning Service",
        subCategory: "COMMON LOBBY AREA",
        createdBy: "Customer Cred",
        assignedTo: "Abdul",
    },
]

const Tickets = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <>
            <div className="d-flex align-items-center justify-content-between gap-3">
                <div className="card card-shadow card-border bg-card d-flex align-items-center justify-content-center gap-3 p-4" style={{ height: "142px" }}>
                    <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                        <span className="text-red text-24 fw-semibold">250</span>
                        <span className="text-secondary text-22 fw-medium">Closed Tickets</span>
                    </div>
                </div>
                <div className="card card-shadow card-border bg-card d-flex align-items-center justify-content-center gap-3 p-4" style={{ height: "142px" }}>
                    <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                        <span className="text-red text-24 fw-semibold">30</span>
                        <span className="text-secondary text-22 fw-medium">Open Tickets</span>
                    </div>
                </div>
                <div className="card card-shadow card-border bg-card d-flex align-items-center justify-content-center gap-3 p-4" style={{ height: "142px" }}>
                    <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                        <span className="text-red text-24 fw-semibold">25</span>
                        <span className="text-secondary text-22 fw-medium">Complaints</span>
                    </div>
                </div>
                <div className="card card-shadow card-border bg-card d-flex align-items-center justify-content-center gap-3 p-4" style={{ height: "142px" }}>
                    <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                        <span className="text-red text-24 fw-semibold">10</span>
                        <span className="text-secondary text-22 fw-medium">Suggestions</span>
                    </div>
                </div>
                <div className="card card-shadow card-border bg-card d-flex align-items-center justify-content-center gap-3 p-4" style={{ height: "142px" }}>
                    <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                        <span className="text-red text-24 fw-semibold">10</span>
                        <span className="text-secondary text-22 fw-medium">Requests</span>
                    </div>
                </div>
            </div>

            <div className="d-flex align-items-center justify-content-between mt-4">
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
                    <Link to="" className="text-decoration-none">
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
                            <th>Ticket Number</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Sub Category</th>
                            <th>Created By</th>
                            <th>Assigned To</th>
                        </tr>
                    </thead>
                    <tbody className="text-nowrap">
                        {
                            tableData.map((data, index) => (
                                <tr key={index}>
                                    <td className="text-center">
                                        <Eye size={20} style={{ cursor: "pointer" }} onClick={() => navigate(`/tickets/${index}`)} />
                                    </td>
                                    <td>{data.ticketNo}</td>
                                    <td>{data.description}</td>
                                    <td>{data.category}</td>
                                    <td>{data.subCategory}</td>
                                    <td>{data.createdBy}</td>
                                    <td>{data.assignedTo}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Tickets