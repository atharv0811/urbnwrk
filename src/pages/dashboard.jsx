import "react-datepicker/dist/react-datepicker.css";
import { ArrowUp, Calendar, Download, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
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
    LabelList,
} from "recharts";
import { format } from "date-fns";

const statusOptions = [
    { value: "approved", label: "Approve", color: "green" },
    { value: "rejected", label: "Reject", color: "red" },
];

const statusBgColors = {
    approved: "#3A8E5C",
    rejected: "#B71C1C",
    pending: "#F9A825",
};

const statusTextColors = {
    approved: "white",
    rejected: "white",
    pending: "black",
};

const Dashboard = () => {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    const [startDate, setStartDate] = useState(lastWeek);
    const [endDate, setEndDate] = useState(today);
    const [activeTab, setActiveTab] = useState("Pending");
    const [selectedStatus, setSelectedStatus] = useState({});
    const [graphActiveTab, setGraphActiveTab] = useState("weekly");
    const [greeting, setGreeting] = useState("");
    const [currentUser, setCurrentUser] = useState({})
    const [wallet, setWallet] = useState({});
    const [pieChartData, setPieChartData] = useState([
        { name: "Pending Tickets", value: 0, color: "#F4C08D" },
        { name: "Closed Tickets", value: 0, color: "#C4B79A" }
    ])
    const [weeklyGraphData, setWeeklyGraphData] = useState([])
    const [monthlyGraphData, setMonthlyGraphData] = useState([])
    const [totalTickets, setTotalTickets] = useState(0)
    const [userData, setUserData] = useState({
        Pending: [],
        Rejected: [],
        Accepted: [],
    })

    const token = localStorage.getItem("access_token");

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

    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get(`https://app.gophygital.work/pms/get_user_detail.json`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCurrentUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchWallet = async () => {
        try {
            const response = await axios.get(
                `https://app.gophygital.work/pms/facilty_bookings/get_wallet_data.json`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setWallet(response.data?.wallet)
        } catch (error) {
            console.log(error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`https://app.gophygital.work/pms/users/occupant_users_with_entity.json`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const pendingUsers = response.data?.occupant_users?.filter(user => user?.lock_user_permission?.status === 'pending');
            const approvedUsers = response.data?.occupant_users?.filter(user => user?.lock_user_permission?.status === 'approved');
            const rejectedUsers = response.data?.occupant_users?.filter(user => user?.lock_user_permission?.status === 'rejected');

            setUserData({
                Pending: pendingUsers || [],
                Accepted: approvedUsers || [],
                Rejected: rejectedUsers || [],
            });

        } catch (error) {
            console.log(error)
        }
    }

    const handleStatusChange = async (id, status, index) => {
        try {
            await axios.put(
                `https://app.gophygital.work/pms/users/status_update.json?id=${id}&status=${status}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSelectedStatus((prev) => ({ ...prev, [index]: status }));
        } catch (error) {
            console.log(error);
        }
    };

    const filterTickets = async () => {
        const formatedStartDate = format(startDate, "MM/dd/yyyy");
        const formatedLastDate = format(endDate, "MM/dd/yyyy")

        try {
            const response = await axios.get(`https://app.gophygital.work/pms/admin/complaints.json?q[date_range]=${formatedStartDate} - ${formatedLastDate}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response)

            if (response.data && response.data?.complaints) {
                const complaints = response.data.complaints;
                setTotalTickets(complaints.length)

                // Count pending and closed tickets
                const pendingTickets = complaints.filter(ticket => ticket.issue_status === "Pending").length;
                const closedTickets = complaints.filter(ticket => ticket.issue_status === "Completed").length;

                setPieChartData([
                    { name: "Pending Tickets", value: pendingTickets, color: "#F4C08D" },
                    { name: "Closed Tickets", value: closedTickets, color: "#C4B79A" }
                ]);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const CustomLegend = () => (
        <div className="custom-legend">
            <p className="total-tickets">
                <span className="text-red text-18">
                    Total Tickets : <span className="fw-semibold">{totalTickets}</span>
                </span>
            </p>
            <div className="legend-item">
                <span
                    className="legend-box"
                    style={{ backgroundColor: pieChartData[0].color }}
                ></span>
                <span>Pending Tickets</span>
            </div>
            <div className="legend-item">
                <span
                    className="legend-box"
                    style={{ backgroundColor: pieChartData[1].color }}
                ></span>
                <span>Closed Tickets</span>
            </div>
        </div>
    );

    const fetchGraphData = async () => {
        try {
            const response = await axios.get(`https://app.gophygital.work/uwdashboard.json`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data)
            setWeeklyGraphData(response.data.weekly_data)
            setMonthlyGraphData(response.data.monthly_data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCurrentUser();
        fetchWallet();
        fetchUsers();
        filterTickets();
        fetchGraphData();
    }, [])

    const graphData =
        graphActiveTab === "weekly" ? weeklyGraphData : monthlyGraphData;

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
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
                    AQI<span>{currentUser.aqi_value}</span>{currentUser.aqi_category}
                </div>
            </div>

            <div
                className="d-flex flex-column flex-lg-row justify-content-between my-4"
                style={{ gap: "2.2rem" }}
            >
                <div className="card dashboard-card2 d-flex flex-row align-items-center">
                    <div className="d-flex flex-column align-items-center text-24">
                        <span className="fw-semibold">30</span>
                        <span className="fw-normal">Oct</span>
                    </div>
                    <span className="divider"></span>
                    <div className="d-flex flex-column align-items-start text-20">
                        <span className="fw-semibold">Mock fire drill</span>
                        <span className="fw-normal" style={{ color: "#C4B89D" }}>
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
                        <span className="fw-normal" style={{ color: "#C4B89D" }}>
                            Expires On 31/10/2024
                        </span>
                    </div>
                </div>
            </div>

            <div
                className="d-flex flex-column flex-xl-row justify-content-between my-4"
                style={{ gap: "2.2rem" }}
            >
                <div className="card card-shadow p-3" style={{ height: "470px" }}>
                    <div className="d-flex flex-row align-items-center justify-content-between">
                        <span className="fw-medium text-20">Tickets</span>
                        <div className="d-flex align-items-center gap-2">
                            <div className="position-relative">
                                <Calendar className="calendar-icon" color="#c72030" />
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    dateFormat="MM/dd/yyyy"
                                    className="form-control date-input rounded-0"
                                />
                            </div>
                            <span className="to">TO</span>
                            <div className="position-relative">
                                <Calendar className="calendar-icon" color="#c72030" />
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    dateFormat="MM/dd/yyyy"
                                    className="form-control date-input rounded-0"
                                />
                            </div>
                            <button className="btn-red" style={{ padding: "7px 10px" }} onClick={filterTickets}>
                                <ArrowUp size={20} color="#fff" />
                            </button>
                            <button className="btn-red" style={{ padding: "7px 10px" }}>
                                <Download size={20} color="#fff" />
                            </button>
                        </div>
                    </div>

                    <span className="divider-horizontal"></span>

                    <div className="chart-container">
                        <PieChart width={315} height={315}>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                label={renderCustomizedLabel}
                                outerRadius={150}
                                dataKey="value"
                                labelLine={false}
                                isAnimationActive={true}
                            >
                                {pieChartData.map((entry, index) => (
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
                                    } px-2 w-100 fw-medium`}
                                style={{ fontSize: "15px", height: "50px" }}
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
                                    <th style={{ width: "30%" }}>Name</th>
                                    <th style={{ width: "40%" }}>E-mail ID</th>
                                    <th style={{ width: "30%" }}>Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-nowrap">
                                {userData[activeTab].length > 0 ? (
                                    userData[activeTab].map((user, index) => (
                                        <tr key={index}>
                                            <td className="description-column">{user.firstname + " " + user.lastname}</td>
                                            <td className="description-column">{user.email}</td>
                                            <td style={{ padding: "10px 0" }}>
                                                <div className="dropdown">
                                                    <button
                                                        className="btn dropdown-toggle status-dropdown rounded-0"
                                                        type="button"
                                                        id={`dropdownMenuButton${index}`}
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                        style={{
                                                            backgroundColor:
                                                                statusBgColors[
                                                                selectedStatus[index] || user?.lock_user_permission?.status
                                                                ],
                                                            color:
                                                                statusTextColors[
                                                                selectedStatus[index] || user?.lock_user_permission?.status
                                                                ],
                                                        }}
                                                    >
                                                        {(
                                                            selectedStatus[index] ||
                                                            user?.lock_user_permission?.status
                                                        )
                                                            ?.charAt(0)
                                                            .toUpperCase() +
                                                            (
                                                                selectedStatus[index] ||
                                                                user?.lock_user_permission?.status
                                                            )?.slice(1)}
                                                    </button>
                                                    <ul
                                                        className="dropdown-menu"
                                                        aria-labelledby={`dropdownMenuButton${index}`}
                                                    >
                                                        {statusOptions.map((option) => (
                                                            <li key={option.value}>
                                                                <button
                                                                    className="dropdown-item"
                                                                    onClick={() =>
                                                                        handleStatusChange(
                                                                            user.lock_user_permission?.id,
                                                                            option.value,
                                                                            index
                                                                        )
                                                                    }
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
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-3">
                                            No {activeTab.toLowerCase()} users
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div
                className="d-flex flex-column flex-xl-row my-4"
                style={{ gap: "2.2rem" }}
            >
                <div
                    className="card card-shadow p-3 wallet-card"
                    style={{ height: "242px", width: "378px" }}
                >
                    <span className="fw-medium text-20">Wallet</span>
                    <span className="divider-horizontal"></span>

                    <div
                        className="card bg-card2 d-flex flex-column justify-content-center gap-2"
                        style={{ height: "150px" }}
                    >
                        <span className="text-red text-24">
                            <Wallet size={18} color="#c72030" />{" "}
                            <span className="fw-semibold text-red">{wallet.available_amount}</span> INR
                        </span>
                        <span className="fw-medium text-20">Available Balance</span>
                    </div>
                </div>
                <div className="card card-shadow p-3" style={{ height: "242px" }}>
                    <div className="d-flex align-items-center justify-content-between">
                        <span className="fw-medium text-20">Financial Summary</span>
                        <button className="btn-red" style={{ padding: "2px 6px" }}>
                            <Download size={16} color="#fff" />
                        </button>
                    </div>
                    <span className="divider-horizontal"></span>

                    <div className="d-flex align-items-center gap-2">
                        <div
                            className="card bg-card2 d-flex flex-column justify-content-center gap-2"
                            style={{ height: "150px", padding: "33px 0 33px 46px" }}
                        >
                            <span className="text-red text-24">
                                <span className="fw-semibold text-red"> - {wallet.debited_amount}</span> INR
                            </span>
                            <span className="fw-medium text-20">Booked Amount</span>
                        </div>
                        <div
                            className="card bg-card2  d-flex flex-column justify-content-center gap-2"
                            style={{ height: "150px", padding: "33px 0 33px 46px" }}
                        >
                            <span className="text-success text-24">
                                <span className="fw-semibold text-success"> + {wallet.credited_amount}</span> INR
                            </span>
                            <span className="fw-medium text-20">Refund Amount</span>
                        </div>
                        <div
                            className="card bg-card2  d-flex flex-column justify-content-center gap-2"
                            style={{ height: "150px", padding: "33px 0 33px 46px" }}
                        >
                            <span className="text-secondary2 text-24 d-flex align-items-center gap-2">
                                <img src="/pending-refund-amount.svg" alt="" />{" "}
                                <span className="fw-semibold text-secondary2">15000</span> INR
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
                                } fw-medium`}
                            style={{ padding: "4px 18px", height: "50px", width: "150px" }}
                            onClick={() => setGraphActiveTab("weekly")}
                        >
                            Weekly
                        </button>
                        <button
                            className={`${graphActiveTab === "monthly" ? "btn-red" : "btn rounded-0"
                                } fw-medium`}
                            style={{ padding: "4px 18px", height: "50px", width: "150px" }}
                            onClick={() => setGraphActiveTab("monthly")}
                        >
                            Monthly
                        </button>
                    </div>
                    <button className="btn-red" style={{ padding: "7px 10px" }}>
                        <Download size={20} color="#fff" />
                    </button>
                </div>

                <ResponsiveContainer width="90%" height={450} className="my-3 mx-auto">
                    <LineChart
                        data={graphData}
                        margin={{ top: 20, right: 20, left: 40, bottom: 50 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey={graphActiveTab === "weekly" ? "day" : "name"}
                            label={{
                                value: "Meeting Expenses over Time",
                                position: "bottom",
                                offset: 30,
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
                                offset: 30,
                            }}
                        />
                        <Tooltip />
                        <Line
                            type="linear"
                            dataKey="amount"
                            stroke="#C4B79A"
                            strokeWidth={2}
                            dot={{ fill: "#C4B79A", r: 5 }}
                        >
                            <LabelList
                                dataKey="change"
                                position="top"
                                content={({ x, y, value, index }) =>
                                    index !== 0 && (
                                        <text
                                            x={x}
                                            y={value >= 0 ? y - 20 : y + 30}
                                            fill={value >= 0 ? "green" : "red"}
                                            fontSize={18}
                                            fontWeight={500}
                                            textAnchor="middle"
                                        >
                                            {value >= 0 ? `↑ ${value}` : `↓ ${Math.abs(value)}`}
                                        </text>
                                    )
                                }
                            />
                        </Line>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};

export default Dashboard;
