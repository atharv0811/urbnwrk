import { CircleChevronDownIcon, Download, Edit, File } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const tableData = [
    {
        transactionId: "47833",
        date: "12/02/24",
        tranactionType: "Credit",
        transactionPoints: "900",
    },
    {
        transactionId: "47833",
        date: "12/02/24",
        tranactionType: "Debit",
        transactionPoints: "900",
    },
    {
        transactionId: "47833",
        date: "12/02/24",
        tranactionType: "Credit",
        transactionPoints: "900",
    },
    {
        transactionId: "47833",
        date: "12/02/24",
        tranactionType: "Debit",
        transactionPoints: "900",
    },
    {
        transactionId: "47833",
        date: "12/02/24",
        tranactionType: "Credit",
        transactionPoints: "900",
    },
];

const timelineData = [
    { date: "23rd February 2025", time: "6:30PM", text: "User Created" },
    { date: "22nd February 2025", time: "6:30PM", text: "User Profile Updated" },
    {
        date: "21st February 2025",
        time: "6:30PM",
        text: "Shubh Approved Sign Up Request",
    },
    { yearChange: true, text: "Change in a Year" },
    { date: "21st December 2024", time: "6:30PM", text: "User Created" },
    { date: "20th December 2024", time: "6:30PM", text: "User Profile Updated" },
    {
        date: "19th December 2024",
        time: "6:30PM",
        text: "Shubh Approved Sign Up Request",
    },
];

const UserDetails = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <span className="text-secondary">
                <Link to="/user" className="text-decoration-none text-secondary">
                    My User
                </Link>{" "}
                {">"} My User details
            </span>

            <h5 className="my-2 text-red fw-semibold">MY USERS DETAILS</h5>

            <div
                className="card card-shadow bg-card my-4 position-relative"
                style={{ padding: "15px 50px" }}
            >
                <div
                    className="d-flex align-items-center position-absolute"
                    style={{ top: "2rem", right: "3rem" }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="25"
                        fill="#40bd16"
                        className="bi bi-toggle-on"
                        viewBox="0 0 16 16"
                        style={{ cursor: "pointer" }}
                    >
                        <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8" />
                    </svg>
                    Active User
                </div>

                <div className="d-flex flex-column align-items-center gap-3 mt-4">
                    <div className="position-relative">
                        <div className="profile-image"></div>
                        <Edit
                            size={35}
                            className="position-absolute rounded-circle bg-white p-2"
                            style={{ bottom: "15px", right: "5px", cursor: "pointer" }}
                        />
                    </div>
                    <span className="bg-secondary2 py-2 px-4 text-black fw-medium">
                        Pending
                    </span>
                </div>

                <div className="mt-5">
                    <form>
                        <div className="row">
                            <div className="col-md-6 col-lg-4 mb-4">
                                <div className="position-relative form-group w-100">
                                    <label
                                        className="position-absolute bg-card px-1 text-secondary"
                                        style={{ top: "-15px", left: "5px" }}
                                    >
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="bg-card w-100"
                                        style={{ padding: "8px" }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4">
                                <div className="position-relative form-group w-100">
                                    <label
                                        className="position-absolute bg-card px-1 text-secondary"
                                        style={{ top: "-15px", left: "5px" }}
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        className="bg-card w-100"
                                        style={{ padding: "8px" }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4">
                                <div className="position-relative form-group w-100">
                                    <label
                                        className="position-absolute bg-card px-1 text-secondary"
                                        style={{ top: "-15px", left: "5px" }}
                                    >
                                        Gender
                                    </label>
                                    <select className="bg-card w-100" style={{ padding: "10px" }}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4">
                                <div className="position-relative form-group w-100">
                                    <label
                                        className="position-absolute bg-card px-1 text-secondary"
                                        style={{ top: "-15px", left: "5px" }}
                                    >
                                        E-mail ID
                                    </label>
                                    <input
                                        type="email"
                                        className="bg-card w-100"
                                        style={{ padding: "8px" }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4">
                                <div className="position-relative form-group w-100">
                                    <label
                                        className="position-absolute bg-card px-1 text-secondary"
                                        style={{ top: "-15px", left: "5px" }}
                                    >
                                        Mobile Number
                                    </label>
                                    <input
                                        type="number"
                                        className="bg-card w-100"
                                        style={{ padding: "8px" }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4">
                                <div className="position-relative form-group w-100">
                                    <label
                                        className="position-absolute bg-card px-1 text-secondary"
                                        style={{ top: "-15px", left: "5px" }}
                                    >
                                        Access Level
                                    </label>
                                    <select className="bg-card w-100" style={{ padding: "10px" }}>
                                        <option value="male">Site</option>
                                        <option value="female">Office</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4">
                                <div className="position-relative form-group w-100">
                                    <label
                                        className="position-absolute bg-card px-1 text-secondary"
                                        style={{ top: "-15px", left: "5px" }}
                                    >
                                        User Type
                                    </label>
                                    <select className="bg-card w-100" style={{ padding: "10px" }}>
                                        <option value="male">Admin</option>
                                        <option value="female">User</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4">
                                <div className="position-relative form-group w-100">
                                    <label
                                        className="position-absolute bg-card px-1 text-secondary"
                                        style={{ top: "-15px", left: "5px" }}
                                    >
                                        Employee ID
                                    </label>
                                    <input
                                        type="number"
                                        className="bg-card w-100"
                                        style={{ padding: "8px" }}
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="btn-red py-2 px-4"
                            data-bs-toggle="collapse"
                            data-bs-target="#additionalFields"
                            aria-expanded={isExpanded}
                            aria-controls="additionalFields"
                            onClick={() => setIsExpanded(!isExpanded)}
                            style={{ marginBottom: "2rem" }}
                        >
                            {isExpanded ? "−" : "+"} Additional Feild
                        </button>

                        <div className="collapse" id="additionalFields">
                            <div className="row">
                                <div className="col-md-6 col-lg-4 mb-4">
                                    <div className="position-relative form-group w-100">
                                        <label
                                            className="position-absolute bg-card px-1 text-secondary"
                                            style={{ top: "-15px", left: "5px" }}
                                        >
                                            Birth Date
                                        </label>
                                        <input
                                            type="date"
                                            className="bg-card w-100"
                                            style={{ padding: "8px" }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 mb-4">
                                    <div className="position-relative form-group w-100">
                                        <label
                                            className="position-absolute bg-card px-1 text-secondary"
                                            style={{ top: "-15px", left: "5px" }}
                                        >
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            className="bg-card w-100"
                                            style={{ padding: "8px" }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 mb-4">
                                    <div className="position-relative form-group w-100">
                                        <label
                                            className="position-absolute bg-card px-1 text-secondary"
                                            style={{ top: "-15px", left: "5px" }}
                                        >
                                            Alternate Mobile Number
                                        </label>
                                        <input
                                            type="number"
                                            className="bg-card w-100"
                                            style={{ padding: "8px" }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 mb-4">
                                    <div className="position-relative form-group w-100">
                                        <label
                                            className="position-absolute bg-card px-1 text-secondary"
                                            style={{ top: "-15px", left: "5px" }}
                                        >
                                            Alternate Email
                                        </label>
                                        <input
                                            type="email"
                                            className="bg-card w-100"
                                            style={{ padding: "8px" }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 mb-4">
                                    <div className="position-relative form-group w-100">
                                        <label
                                            className="position-absolute bg-card px-1 text-secondary"
                                            style={{ top: "-15px", left: "5px" }}
                                        >
                                            Aadhar Number
                                        </label>
                                        <input
                                            type="number"
                                            className="bg-card w-100"
                                            style={{ padding: "8px" }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 mb-4">
                                    <div className="position-relative form-group w-100">
                                        <label
                                            className="position-absolute bg-card px-1 text-secondary"
                                            style={{ top: "-15px", left: "5px" }}
                                        >
                                            Designation
                                        </label>
                                        <input
                                            type="text"
                                            className="bg-card w-100"
                                            style={{ padding: "8px" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="mt-5 d-flex align-items-center justify-content-between">
                    <h5 className="text-red">TRANSACTION HISTORY</h5>
                    <div className="d-flex align-items-center gap-2">
                        <button className="btn-red" style={{ padding: "4px 6px" }}>
                            <Download size={20} />
                        </button>
                        <button
                            className="btn-red fw-light"
                            style={{ padding: "4px 20px" }}
                        >
                            + Filter
                        </button>
                    </div>
                </div>

                <div className="table-responsive custom-table-container my-3">
                    <table className="text-start custom-table w-100">
                        <thead className="text-nowrap">
                            <tr>
                                <th>Transaction ID</th>
                                <th>Date</th>
                                <th>Transaction Type</th>
                                <th>Transaction Points</th>
                            </tr>
                        </thead>
                        <tbody className="text-nowrap">
                            {tableData.map((data, idx) => (
                                <tr key={idx}>
                                    <td>{data.transactionId}</td>
                                    <td>{data.date}</td>
                                    <td>{data.tranactionType}</td>
                                    <td>{data.transactionPoints}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <h5 className="mt-5 mb-2 text-red fw-semibold">LOGS</h5>

            <div className="card card-shadow bg-card my-4 py-4 px-5">
                <h4 className="text-red fw-semibold mb-0">
                    <File className="me-2" /> Logs
                </h4>

                {/* Timeline */}
                <div className="timeline">
                    {timelineData.map((item, index) =>
                        item.yearChange ? (
                            <div key={index} className="timeline-item year-change">
                                <div className="timeline-icon year-icon"></div>
                                <div className="timeline-content text-danger fw-bold fst-italic">
                                    {item.text}
                                </div>
                            </div>
                        ) : (
                            <div key={index} className="timeline-item">
                                <div className="timeline-icon"></div>
                                <div className="timeline-content">
                                    <span className="date">
                                        {item.date} <span className="time">{item.time}</span>
                                    </span>
                                    <p className="mb-0">{item.text}</p>
                                </div>
                            </div>
                        )
                    )}
                </div>

                <div className="mt-4">
                    <button
                        className="btn-red fw-light d-flex align-items-center gap-2"
                        style={{ padding: "4px 20px" }}
                    >
                        <CircleChevronDownIcon size={15} /> View More
                    </button>
                </div>
            </div>
        </>
    );
};

export default UserDetails;
