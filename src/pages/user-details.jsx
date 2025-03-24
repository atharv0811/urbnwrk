import axios from "axios";
import {
    CircleChevronDownIcon,
    Download,
    Edit,
    File,
    SlidersHorizontal,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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

const statusOptions = [
    { value: "approved", label: "Approve", color: "green" },
    { value: "rejected", label: "Reject", color: "red" },
];

const UserDetails = () => {
    const { id } = useParams();
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("Pending");
    const [userId, setUserId] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [isActive, setIsActive] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        mobileNo: "",
        accessLevel: "",
        userType: "",
        employeeId: "",
        dob: "",
        address: "",
        alternateMobile: "",
        alternateEmail: "",
        aadharNo: "",
        designation: ""
    })

    const token = id;

    const statusBgColors = {
        approved: "#3A8E5C",
        rejected: "#B71C1C",
        pending: "#F9A825",
    };

    const statusTextColors = {
        approved: "#fff",
        rejected: "#fff",
        pending: "#1a1a1a",
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(
                    `https://app.gophygital.work/api/users/account?token=${token}`
                );
                const data = response.data;
                setFormData({
                    firstName: data?.firstname,
                    lastName: data?.lastname,
                    gender: data?.gender,
                    email: data?.email,
                    mobileNo: data?.mobile,
                    accessLevel: data?.access_level,
                    userType: data?.user_type,
                    employeeId: data?.current_lock_user_permission?.id,
                    dob: data?.birth_date,
                    address: data?.addresses[0],
                    alternateMobile: "",
                    alternateEmail: "",
                    aadharNo: "",
                    designation: data?.designation
                })
                setSelectedStatus(response.data?.current_lock_user_permission?.status);
                setAvatarUrl(response.data?.avatar?.url)
                setIsActive(data?.current_lock_user_permission?.active)
                setUserId(data.current_lock_user_permission?.id);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserDetails();
    }, []);

    const handleStatusChange = async (status) => {
        try {
            await axios.put(
                `https://app.gophygital.work/pms/users/status_update.json?id=${userId}&status=${status}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );
            setSelectedStatus(status);
        } catch (error) {
            console.log(error);
        }
    };

    const toggelStatus = async () => {
        const newStatus = !isActive;
        setIsActive(newStatus);
        try {
            await axios.put(
                `https://app.gophygital.work/pms/users/status_update.json?id=${userId}&active=${newStatus}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );
        } catch (error) {
            console.log(error);
            setIsActive(!newStatus);
        }
    }

    return (
        <>
            <span className="text-secondary text-18 fw-medium">
                <Link to="/user" className="text-decoration-none text-secondary">
                    My User
                </Link>{" "}
                {">"} My User details
            </span>

            <h5 className="my-2 text-red fw-semibold text-26">MY USERS DETAILS</h5>

            <div
                className="card card-shadow bg-card3 my-4 position-relative"
                style={{ padding: "15px 50px" }}
            >
                <div
                    className="d-flex align-items-center position-absolute"
                    style={{ top: "2rem", right: "3rem" }}
                >
                    {
                        isActive ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="25"
                                fill="#40bd16"
                                className="bi bi-toggle-on cursor-pointer"
                                viewBox="0 0 16 16"
                                onClick={toggelStatus}
                            >
                                <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="25"
                                fill="#667085"
                                className="bi bi-toggle-off cursor-pointer"
                                viewBox="0 0 16 16"
                                onClick={toggelStatus}
                            >
                                <path d="M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5" />
                            </svg>
                        )
                    }
                    Active User
                </div>

                <div className="d-flex flex-column align-items-center gap-3 mt-4">
                    <div className="position-relative">
                        <div className="profile-image">
                            <img
                                height={240}
                                width={240}
                                className="rounded-circle"
                                src={avatarUrl}
                                alt="profile-image"
                            />
                        </div>
                        <Edit
                            size={35}
                            className="position-absolute rounded-circle bg-white p-2"
                            style={{ bottom: "15px", right: "15px", cursor: "pointer" }}
                        />
                    </div>
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
                            {selectedStatus?.charAt(0).toUpperCase() +
                                selectedStatus?.slice(1)}
                        </button>
                        <ul
                            className="dropdown-menu"
                            aria-labelledby={`dropdownMenuButton`}
                        >
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

                <div className="mt-5">
                    <form>
                        <div className="row">
                            <div className="col-md-6 col-lg-4 mb-4">
                                <div className="position-relative form-group w-100">
                                    <label
                                        className="position-absolute bg-label px-1 text-secondary"
                                        style={{ top: "-15px", left: "5px" }}
                                    >
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="bg-label w-100"
                                        style={{ padding: "8px" }}
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ firstName: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4">
                                <div className="position-relative form-group w-100">
                                    <label
                                        className="position-absolute bg-label px-1 text-secondary"
                                        style={{ top: "-15px", left: "5px" }}
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        className="bg-label w-100"
                                        style={{ padding: "8px" }}
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ lastName: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4">
                                <div className="position-relative form-group w-100">
                                    <label
                                        className="position-absolute bg-label px-1 text-secondary"
                                        style={{ top: "-15px", left: "5px" }}
                                    >
                                        Gender
                                    </label>
                                    <select
                                        className="bg-label w-100"
                                        style={{ padding: "10px" }}
                                        value={formData.gender}
                                        onChange={(e) => setFormData({ gender: e.target.value })}
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4">
                                <div className="position-relative form-group w-100">
                                    <label
                                        className="position-absolute bg-label px-1 text-secondary"
                                        style={{ top: "-15px", left: "5px" }}
                                    >
                                        E-mail ID
                                    </label>
                                    <input
                                        type="email"
                                        className="bg-label w-100"
                                        style={{ padding: "8px" }}
                                        value={formData.email}
                                        onChange={(e) => setFormData({ email: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4">
                                <div className="position-relative form-group w-100">
                                    <label
                                        className="position-absolute bg-label px-1 text-secondary"
                                        style={{ top: "-15px", left: "5px" }}
                                    >
                                        Mobile Number
                                    </label>
                                    <input
                                        type="number"
                                        className="bg-label w-100"
                                        style={{ padding: "8px" }}
                                        value={formData.mobileNo}
                                        onChange={(e) => setFormData({ mobileNo: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4">
                                <div className="position-relative form-group w-100">
                                    <label
                                        className="position-absolute bg-label px-1 text-secondary"
                                        style={{ top: "-15px", left: "5px" }}
                                    >
                                        Access Level
                                    </label>
                                    <select
                                        className="bg-label w-100"
                                        style={{ padding: "10px" }}
                                        value={formData.accessLevel}
                                        onChange={(e) => setFormData({ accessLevel: e.target.value })}
                                    >
                                        <option value="male">Site</option>
                                        <option value="female">Office</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4">
                                <div className="position-relative form-group w-100">
                                    <label
                                        className="position-absolute bg-label px-1 text-secondary"
                                        style={{ top: "-15px", left: "5px" }}
                                    >
                                        User Type
                                    </label>
                                    <select
                                        className="bg-label w-100"
                                        style={{ padding: "10px" }}
                                        value={formData.userType}
                                        onChange={(e) => setFormData({ userType: e.target.value })}
                                    >
                                        <option value="male">Admin</option>
                                        <option value="female">User</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 mb-4">
                                <div className="position-relative form-group w-100">
                                    <label
                                        className="position-absolute bg-label px-1 text-secondary"
                                        style={{ top: "-15px", left: "5px" }}
                                    >
                                        Employee ID
                                    </label>
                                    <input
                                        type="number"
                                        className="bg-label w-100"
                                        style={{ padding: "8px" }}
                                        value={formData.employeeId}
                                        onChange={(e) => setFormData({ employeeId: e.target.value })}
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
                                            className="position-absolute bg-label px-1 text-secondary"
                                            style={{ top: "-15px", left: "5px" }}
                                        >
                                            Birth Date
                                        </label>
                                        <input
                                            type="date"
                                            className="bg-label w-100"
                                            style={{ padding: "8px" }}
                                            value={formData.dob}
                                            onChange={(e) => setFormData({ dob: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 mb-4">
                                    <div className="position-relative form-group w-100">
                                        <label
                                            className="position-absolute bg-label px-1 text-secondary"
                                            style={{ top: "-15px", left: "5px" }}
                                        >
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            className="bg-label w-100"
                                            style={{ padding: "8px" }}
                                            value={formData.address}
                                            onChange={(e) => setFormData({ address: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 mb-4">
                                    <div className="position-relative form-group w-100">
                                        <label
                                            className="position-absolute bg-label px-1 text-secondary"
                                            style={{ top: "-15px", left: "5px" }}
                                        >
                                            Alternate Mobile Number
                                        </label>
                                        <input
                                            type="number"
                                            className="bg-label w-100"
                                            style={{ padding: "8px" }}
                                            value={formData.alternateMobile}
                                            onChange={(e) => setFormData({ alternateMobile: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 mb-4">
                                    <div className="position-relative form-group w-100">
                                        <label
                                            className="position-absolute bg-label px-1 text-secondary"
                                            style={{ top: "-15px", left: "5px" }}
                                        >
                                            Alternate Email
                                        </label>
                                        <input
                                            type="email"
                                            className="bg-label w-100"
                                            style={{ padding: "8px" }}
                                            value={formData.alternateEmail}
                                            onChange={(e) => setFormData({ alternateEmail: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 mb-4">
                                    <div className="position-relative form-group w-100">
                                        <label
                                            className="position-absolute bg-label px-1 text-secondary"
                                            style={{ top: "-15px", left: "5px" }}
                                        >
                                            Aadhar Number
                                        </label>
                                        <input
                                            type="number"
                                            className="bg-label w-100"
                                            style={{ padding: "8px" }}
                                            value={formData.aadharNo}
                                            onChange={(e) => setFormData({ aadharNo: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 mb-4">
                                    <div className="position-relative form-group w-100">
                                        <label
                                            className="position-absolute bg-label px-1 text-secondary"
                                            style={{ top: "-15px", left: "5px" }}
                                        >
                                            Designation
                                        </label>
                                        <input
                                            type="text"
                                            className="bg-label w-100"
                                            style={{ padding: "8px" }}
                                            value={formData.designation}
                                            onChange={(e) => setFormData({ designation: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="mt-4 d-flex align-items-center justify-content-between">
                    <span className="text-red text-20 fw-semibold">
                        TRANSACTION HISTORY
                    </span>
                    <div className="d-flex align-items-center gap-2">
                        <button className="btn-red" style={{ padding: "8px 10px" }}>
                            <Download size={20} color="#fff" />
                        </button>
                        <button
                            className="btn-red fw-normal d-flex align-items-center gap-2"
                            style={{ padding: "8px 30px" }}
                        >
                            <SlidersHorizontal
                                size={15}
                                color="#fff"
                                className="my-1 my-lg-0"
                            />{" "}
                            <span className="d-none d-lg-block text-white">Filter</span>
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

            <div className="card card-shadow bg-card3 my-4 py-4 px-5">
                <h4 className="text-red fw-semibold mb-0">
                    <img src="/logs.svg" alt="" /> Logs
                </h4>

                {/* Timeline */}
                <div className="timeline">
                    {timelineData.map((item, index) =>
                        item.yearChange ? (
                            <div key={index} className="timeline-item year-change">
                                <div className="timeline-icon year-icon"></div>
                                <div className="timeline-content text-danger fst-italic">
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
                        <CircleChevronDownIcon size={15} color="#fff" /> View More
                    </button>
                </div>
            </div>
        </>
    );
};

export default UserDetails;
