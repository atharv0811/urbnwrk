import { ArrowUp, Calendar, Clock, Download, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Line,
} from "recharts";

const weeklyGraphData = [
    { day: "Monday", amount: 4000, change: 0 },
    { day: "Tuesday", amount: 8500, change: 400 },
    { day: "Wednesday", amount: 3200, change: -440 },
    { day: "Thursday", amount: 7200, change: 300 },
    { day: "Friday", amount: 9800, change: 350 },
    { day: "Saturday", amount: 3600, change: -450 },
    { day: "Sunday", amount: 9700, change: 400 },
];

const monthlyGraphData = [
    { name: "Week 1", amount: 5000, change: 0 },
    { name: "Week 2", amount: 9000, change: 4000 },
    { name: "Week 3", amount: 4600, change: -4400 },
    { name: "Week 4", amount: 8100, change: 3500 },
    { name: "Week 5", amount: 3600, change: -4500 },
];

const data = [
    { name: "Pending Tickets", value: 20, color: "#F4C08D" }, // Light Orange
    { name: "Closed Tickets", value: 80, color: "#C4B79A" }, // Light Brown
];

const userData = {
    Pending: [
        { name: "Shubh J", email: "shubhjj@gmail.com", status: "Pending" },
        { name: "Abdul G", email: "abdulgfr@gmail.com", status: "Pending" },
    ],
    Rejected: [
        { name: "John D", email: "johnd@gmail.com", status: "Rejected" },
        { name: "Alice B", email: "aliceb@gmail.com", status: "Rejected" },
    ],
    Accepted: [
        { name: "Mike K", email: "mikek@gmail.com", status: "Approved" },
        { name: "Emma W", email: "emmaw@gmail.com", status: "Approved" },
        { name: "Mike K", email: "mikek@gmail.com", status: "Approved" },
        { name: "Emma W", email: "emmaw@gmail.com", status: "Approved" },
        { name: "Mike K", email: "mikek@gmail.com", status: "Approved" },
        { name: "Emma W", email: "emmaw@gmail.com", status: "Approved" },
        { name: "Mike K", email: "mikek@gmail.com", status: "Approved" },
        { name: "Emma W", email: "emmaw@gmail.com", status: "Approved" },
    ],
};

const statusOptions = [
    { value: "Approved", label: "Approve", color: "green" },
    { value: "Rejected", label: "Reject", color: "red" },
];

const CustomLegend = () => (
    <div className="custom-legend">
        <p className="total-tickets">
            <strong>
                Total Tickets : <span className="text-danger">100</span>
            </strong>
        </p>
        <div className="legend-item">
            <span
                className="legend-box"
                style={{ backgroundColor: data[0].color }}
            ></span>
            <span>Pending Tickets</span>
        </div>
        <div className="legend-item">
            <span
                className="legend-box"
                style={{ backgroundColor: data[1].color }}
            ></span>
            <span>Closed Tickets</span>
        </div>
    </div>
);

const CustomLabel = ({ x, y, value }) => {
    return (
        <text
            x={x}
            y={y}
            fill={value >= 0 ? "green" : "red"}
            fontSize={14}
            textAnchor="middle"
        >
            {value >= 0 ? `↑ ${value}` : `↓ ${Math.abs(value)}`}
        </text>
    );
};

const Dashboard = () => {
    const statusBgColors = {
        Approved: "#3A8E5C",
        Rejected: "#B71C1C",
        Pending: "#F9A825"
    };

    const statusTextColors = {
        Approved: "white",
        Rejected: "white",
        Pending: "black"
    };

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(tomorrow);
    const [activeTab, setActiveTab] = useState("Pending");
    const [selectedStatus, setSelectedStatus] = useState({});
    const [graphActiveTab, setGraphActiveTab] = useState("weekly");
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        const getGreeting = () => {
            const hour = new Date().getHours();
            if (hour < 12) {
                return "Good Morning";
            } else if (hour < 16) {
                return "Good Afternoon";
            } else {
                return "Good Evening";
            }
        };

        setGreeting(getGreeting());
    }, []);

    const graphData =
        graphActiveTab === "weekly" ? weeklyGraphData : monthlyGraphData;

    const handleStatusChange = (index, status) => {
        setSelectedStatus((prev) => ({ ...prev, [index]: status }));
    };

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <>
            <div className="card dashboard-card1 d-flex justify-content-between flex-row">
                <div>
                    <h4 className="mb-3 fw-bold text-26">{greeting} User!</h4>
                    <i className="text-22">
                        “We are UrbanWrk. Where your vision and creativity find their shape
                        and reality. ”
                    </i>
                </div>
                <div className="d-flex align-items-center right">
                    AQI<span>32</span>Good
                </div>
            </div>

            <div className="d-flex flex-column flex-lg-row justify-content-between my-4 gap-4">
                <div className="card dashboard-card2 d-flex flex-row align-items-center">
                    <div className="d-flex flex-column align-items-center text-24">
                        <span className="fw-semibold">30</span>
                        <span className="fw-normal">Oct</span>
                    </div>
                    <span className="divider"></span>
                    <div className="d-flex flex-column align-items-start text-20">
                        <span className="fw-semibold">Mock fire drill</span>
                        <span className="text-secondary2 fw-normal">
                            Expires On 31/10/2024
                        </span>
                    </div>
                </div>
                <div className="card dashboard-card2 d-flex flex-row align-items-center">
                    <div className="d-flex flex-column align-items-center text-24">
                        <span className="fw-semibold">30</span>
                        <span className="fw-normal">Oct</span>
                    </div>
                    <span className="divider"></span>
                    <div className="d-flex flex-column align-items-start text-20">
                        <span className="fw-semibold">Diwali Party</span>
                        <span className="text-secondary2 fw-normal">
                            Expires On 31/10/2024
                        </span>
                    </div>
                </div>
            </div>

            <div className="d-flex flex-column flex-xl-row justify-content-between my-4 gap-4">
                <div className="card card-shadow p-3" style={{ height: "470px" }}>
                    <div className="d-flex flex-row align-items-center justify-content-between">
                        <span className="fw-medium text-20">Tickets</span>
                        <div className="d-flex align-items-center gap-2">
                            <div className="position-relative">
                                <Calendar className="calendar-icon" />
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control date-input rounded-0"
                                />
                            </div>
                            <span className="to">TO</span>
                            <div className="position-relative">
                                <Calendar className="calendar-icon" />
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control date-input rounded-0"
                                />
                            </div>
                            <button className="btn-red" style={{ padding: "7px 10px" }}>
                                <ArrowUp size={20} />
                            </button>
                            <button className="btn-red" style={{ padding: "7px 10px" }}>
                                <Download size={20} />
                            </button>
                        </div>
                    </div>

                    <span className="divider-horizontal"></span>

                    <div className="chart-container">
                        <PieChart width={315} height={315}>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                label={renderCustomizedLabel}
                                outerRadius={150}
                                dataKey="value"
                                labelLine={false}
                                isAnimationActive={true}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                        <CustomLegend />
                    </div>
                </div>
                <div className="card card-shadow p-3" style={{ height: "470px" }}>
                    <div className="fw-medium text-20 my-1">My Users</div>
                    <span className="divider-horizontal mb-0"></span>

                    <div
                        className="d-flex align-items-center justify-content-between gap-3"
                        style={{ margin: "25px 0" }}
                    >
                        {["Pending", "Rejected", "Accepted"].map((tab) => (
                            <button
                                key={tab}
                                className={`${activeTab === tab ? "btn-red" : "btn rounded-0"
                                    } px-2 w-100 fw-semibold`}
                                style={{ fontSize: "16px", height: "50px" }}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab} Users : {userData[tab].length}
                            </button>
                        ))}
                    </div>

                    <div className="table-responsive custom-table-container">
                        <table className="text-start custom-table w-100">
                            <thead className="text-nowrap">
                                <tr>
                                    <th>Name</th>
                                    <th>E-mail ID</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-nowrap">
                                {userData[activeTab].map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <div className="dropdown">
                                                <button
                                                    className="btn dropdown-toggle status-dropdown rounded-0"
                                                    type="button"
                                                    id={`dropdownMenuButton${index}`}
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                    style={{
                                                        backgroundColor: statusBgColors[selectedStatus[index] || user.status],
                                                        color: statusTextColors[selectedStatus[index] || user.status],
                                                    }}
                                                >
                                                    {selectedStatus[index] || user.status}
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="d-flex flex-column flex-xl-row my-4 gap-4">
                <div
                    className="card card-shadow p-3 wallet-card"
                    style={{ height: "242px", width: "378px" }}
                >
                    <span className="fw-medium text-20">Wallet</span>
                    <span className="divider-horizontal"></span>

                    <div
                        className="card bg-card d-flex flex-column justify-content-center gap-2"
                        style={{ height: "150px" }}
                    >
                        <span className="text-red text-24">
                            <Wallet size={18} /> <span className="fw-semibold">15000</span>{" "}
                            INR
                        </span>
                        <span className="fw-medium text-20">Available Balance</span>
                    </div>
                </div>
                <div className="card card-shadow p-3" style={{ height: "242px" }}>
                    <div className="d-flex align-items-center justify-content-between">
                        <span className="fw-medium text-20">Financial Summary</span>
                        <button className="btn-red" style={{ padding: "2px 6px" }}>
                            <Download size={16} />
                        </button>
                    </div>
                    <span className="divider-horizontal"></span>

                    <div className="d-flex align-items-center gap-2">
                        <div
                            className="card bg-card d-flex flex-column justify-content-center gap-2"
                            style={{ height: "150px", padding: "33px 0 33px 46px" }}
                        >
                            <span className="text-red text-24">
                                <span className="fw-semibold"> - 6000</span> INR
                            </span>
                            <span className="fw-medium text-20">Booked Amount</span>
                        </div>
                        <div
                            className="card bg-card  d-flex flex-column justify-content-center gap-2"
                            style={{ height: "150px", padding: "33px 0 33px 46px" }}
                        >
                            <span className="text-success text-24">
                                <span className="fw-semibold"> + 15000</span> INR
                            </span>
                            <span className="fw-medium text-20">Refund Amount</span>
                        </div>
                        <div
                            className="card bg-card  d-flex flex-column justify-content-center gap-2"
                            style={{ height: "150px", padding: "33px 0 33px 46px" }}
                        >
                            <span className="text-secondary text-24">
                                <Clock size={18} /> <span className="fw-semibold">15000</span>{" "}
                                INR
                            </span>
                            <span className="fw-medium text-20">Pending Refund Amount</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card card-shadow px-3 pt-3 pb-4">
                <span className="fw-medium text-20">Meeting Room Expenses</span>
                <span className="divider-horizontal"></span>

                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                        <button
                            className={`${graphActiveTab === "weekly" ? "btn-red" : "btn rounded-0"
                                } fw-semibold`}
                            style={{ padding: "4px 18px", height: "50px", width: "150px" }}
                            onClick={() => setGraphActiveTab("weekly")}
                        >
                            Weekly
                        </button>
                        <button
                            className={`${graphActiveTab === "monthly" ? "btn-red" : "btn rounded-0"
                                } fw-semibold`}
                            style={{ padding: "4px 18px", height: "50px", width: "150px" }}
                            onClick={() => setGraphActiveTab("monthly")}
                        >
                            Monthly
                        </button>
                    </div>
                    <button className="btn-red" style={{ padding: "7px 10px" }}>
                        <Download size={20} />
                    </button>
                </div>

                <ResponsiveContainer width="90%" height={380} className="my-3 mx-auto">
                    <LineChart
                        data={graphData}
                        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey={graphActiveTab === "weekly" ? "day" : "name"}
                            label={{
                                value: "Meeting Expenses over Time",
                                position: "bottom",
                                offset: 10,
                                fontSize: 20,
                                fontStyle: "italic",
                            }}
                        />
                        <YAxis
                            label={{
                                value: "Amount",
                                angle: -90,
                                position: "left",
                                fontSize: 20,
                                fontStyle: "italic",
                            }}
                        />
                        <Tooltip />
                        <Line
                            type="linear"
                            dataKey="amount"
                            stroke="#C4B79A"
                            strokeWidth={2}
                            dot={{ fill: "#C4B79A", r: 5 }}
                        />
                        {graphData.map((entry, index) => (
                            <CustomLabel
                                key={index}
                                x={index * 60 + 50}
                                y={entry.amount / 15}
                                value={entry.change}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};

export default Dashboard;
