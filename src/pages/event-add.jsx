import axios from "axios";
import { Calendar, InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import MultiSelectBox from "../components/MultiSelectBox";
import toast from "react-hot-toast";

const AddEvent = () => {
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [isRSVPChecked, setIsRSVPChecked] = useState(false);
    const [selectedOption, setSelectedOption] = useState("all");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState();
    const [users, setUsers] = useState([]);
    const [isImportant, setIsImportant] = useState(false);
    const [sendEmail, setSendEmail] = useState(false);
    const [fileNames, setFileNames] = useState("No file chosen");
    const [attachments, setAttachments] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        venue: "",
        start_datetime: null,
        end_datetime: null,
        description: "",
        rsvp: false,
        share_with: "all",
        is_important: false,
        send_email: false,
        attachments: [],
    })

    const token = localStorage.getItem("access_token");

    const fetchIndividuals = async () => {
        try {
            const response = await axios.get(
                `https://app.gophygital.work/pms/users/occupant_users_with_entity.json`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            console.log(response.data.occupant_users)
            setUsers(response.data.occupant_users)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (selectedOption === "individuals") {
            fetchIndividuals();
        }
    }, [selectedOption]);

    const formatDateTime = (date, time) => {
        if (!date || !time) return null; // Avoid errors if either is missing

        const formattedDate = date.toISOString().split("T")[0]; // Extracts YYYY-MM-DD
        return `${formattedDate}T${time}`; // Combines with HH:mm
    };

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            start_datetime: formatDateTime(startDate, startTime),
            end_datetime: formatDateTime(endDate, endTime),
            rsvp: isRSVPChecked ? 1 : 0,
            share_with: selectedOption === "all" ? 2 : 1,
            is_important: isImportant,
            send_email: sendEmail,
            attachments: attachments,
        }));
    }, [startDate, endDate, isRSVPChecked, selectedOption, isImportant, sendEmail, attachments]);

    const handleFileChange = (event) => {
        const files = event.target.files;
        setFileNames(files.length > 0 ? Array.from(files).map((file) => file.name).join(", ") : "No file chosen");
        setAttachments(Array.from(files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        formDataToSend.append('event[event_name]', formData.title);
        formDataToSend.append("event[event_at]", formData.venue);
        formDataToSend.append("event[from_time]", formData.start_datetime);
        formDataToSend.append("event[to_time]", formData.end_datetime);
        formDataToSend.append("event[description]", formData.description);
        formDataToSend.append("event[rsvp_action]", formData.rsvp);
        formDataToSend.append("event[shared]", formData.share_with);
        formDataToSend.append("event[is_important]", formData.is_important);
        formDataToSend.append("event[email_trigger_enabled]", formData.send_email);

        if (formData.share_with === 1) {
            formDataToSend.append("event[swusers][]", JSON.stringify(selectedUsers.map(user => user.value)));
        }

        attachments.forEach((file) => {
            formDataToSend.append("noticeboard[files_attached][]", file);
        })

        console.log("FormData contents:");
        for (let pair of formDataToSend.entries()) {
            console.log(pair[0] + ": ", pair[1]);
        }

        try {
            const response = await axios.post(`https://app.gophygital.work/pms/admin/events.json`, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                }
            })
            console.log(response)
            if (response.status === 200) {
                toast.success("Event added successfully")
                navigate("/events")
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to add event")
        }
    }

    return (
        <>
            <span className="text-secondary text-18 fw-medium">
                <Link to="/events" className="text-decoration-none text-secondary">
                    Event List
                </Link>{" "}
                {">"} New Event
            </span>

            <h5 className="my-2 text-red fw-semibold text-26">NEW EVENT</h5>

            <form onSubmit={handleSubmit}>
                <div className="card card-shadow bg-card3 p-3 my-4">
                    <span className="fw-medium">EVENT INFORMATION</span>
                    <span className="divider-horizontal"></span>

                    <div className="row mt-4">
                        <div className="col-md-6 col-lg-3 mb-4">
                            <div className="position-relative form-group w-100">
                                <label
                                    className="position-absolute bg-label px-1 text-secondary"
                                    style={{ top: "-15px", left: "5px" }}
                                >
                                    Title
                                </label>
                                <input
                                    type="text"
                                    className="bg-label w-100"
                                    style={{ padding: "8px" }}
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 mb-4">
                            <div className="position-relative form-group w-100">
                                <label
                                    className="position-absolute bg-label px-1 text-secondary"
                                    style={{ top: "-15px", left: "5px" }}
                                >
                                    Venue
                                </label>
                                <input
                                    type="text"
                                    className="bg-label w-100"
                                    style={{ padding: "8px" }}
                                    value={formData.venue}
                                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 mb-4">
                            <div className="position-relative form-group w-100">
                                <label
                                    className="position-absolute bg-label px-1 text-secondary z-1"
                                    style={{ top: "-15px", left: "5px" }}
                                >
                                    Start Date
                                </label>
                                <div className="position-relative">
                                    <Calendar className="calendar-icon" color="#c72030" />
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="dd/mm/yyyy"
                                        className="form-control date-input-lg rounded-0"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 mb-4">
                            <div className="position-relative form-group w-100">
                                <label
                                    className="position-absolute bg-label px-1 text-secondary z-1"
                                    style={{ top: "-15px", left: "5px" }}
                                >
                                    End Date
                                </label>
                                <div className="position-relative">
                                    <Calendar className="calendar-icon" color="#c72030" />
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="dd/mm/yyyy"
                                        className="form-control date-input-lg rounded-0"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3 mb-4">
                            <div className="position-relative form-group w-100">
                                <label
                                    className="position-absolute bg-label px-1 text-secondary"
                                    style={{ top: "-15px", left: "5px" }}
                                >
                                    Start Time
                                </label>
                                <input
                                    type="time"
                                    className="bg-label w-100"
                                    style={{ padding: "8px" }}
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 mb-4">
                            <div className="position-relative form-group w-100">
                                <label
                                    className="position-absolute bg-label px-1 text-secondary"
                                    style={{ top: "-15px", left: "5px" }}
                                >
                                    End Time
                                </label>
                                <input
                                    type="time"
                                    className="bg-label w-100"
                                    style={{ padding: "8px" }}
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="position-relative form-group w-100">
                                <label
                                    className="position-absolute bg-label px-1 text-secondary"
                                    style={{ top: "-15px", left: "5px" }}
                                >
                                    Description
                                </label>
                                <textarea
                                    rows={1}
                                    className="bg-label w-100"
                                    style={{ padding: "8px" }}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <label className="mb-2">RSVP</label>
                            <div className="d-flex align-items-center">
                                <span className="me-2">NO</span>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input custom-switch"
                                        type="checkbox"
                                        role="switch"
                                        id="toggleSwitch"
                                        checked={isRSVPChecked}
                                        onChange={() => setIsRSVPChecked(!isRSVPChecked)}
                                        style={{ cursor: "pointer" }}
                                    />
                                </div>
                                <span className="ms-2">Yes</span>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <label className="mb-2">Share With</label>
                            <div className="d-flex align-items-center gap-3">
                                <div className="form-check me-3">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="shareOptions"
                                        id="all"
                                        value="all"
                                        checked={selectedOption === "all"}
                                        onChange={() => setSelectedOption("all")}
                                    />
                                    <label className="form-check-label" htmlFor="all">
                                        All
                                    </label>
                                </div>
                                <div className="form-check me-3">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="shareOptions"
                                        id="individuals"
                                        value="individuals"
                                        checked={selectedOption === "individuals"}
                                        onChange={() => setSelectedOption("individuals")}
                                    />
                                    <label className="form-check-label" htmlFor="individuals">
                                        Individuals
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="shareOptions"
                                        id="groups"
                                        value="groups"
                                        checked={selectedOption === "groups"}
                                        onChange={() => setSelectedOption("groups")}
                                    />
                                    <label className="form-check-label" htmlFor="groups">
                                        Groups
                                    </label>
                                </div>
                            </div>
                            {selectedOption !== "all" && (
                                <div className="mt-3">
                                    <label className="fw-medium mb-2" htmlFor="dropdown">
                                        Select {selectedOption === "individuals" ? "Individuals" : "Groups"}
                                    </label>
                                    {
                                        selectedOption === "individuals" ? (
                                            <MultiSelectBox
                                                options={
                                                    users.map(user => ({
                                                        value: user.id,
                                                        label: `${user.firstname}  ${user.lastname}`
                                                    }))
                                                }
                                                value={selectedUsers}
                                                onChange={(selectedUser) => {
                                                    setSelectedUsers(selectedUser);
                                                }}
                                                placeholder="Select Users"
                                            />
                                        ) : (<MultiSelectBox
                                            options={[]}
                                            value={selectedGroups}
                                            onChange={(selectedGroup) => {
                                                setSelectedGroups(selectedGroup);
                                            }}
                                            placeholder="Select Groups"
                                        />)
                                    }
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="d-flex align-items-center mt-3">
                        <div className="form-check me-3">
                            <input
                                className="form-check-input border-1 border-secondary"
                                type="checkbox"
                                id="important"
                                checked={isImportant}
                                onChange={() => setIsImportant(!isImportant)}
                            />
                            <label className="form-check-label" htmlFor="important">
                                Mark as Important
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input border-1 border-secondary"
                                type="checkbox"
                                id="sendEmail"
                                checked={sendEmail}
                                onChange={() => setSendEmail(!sendEmail)}
                            />
                            <label className="form-check-label" htmlFor="sendEmail">
                                Send Email
                            </label>
                        </div>
                    </div>
                </div>

                <div className="card card-shadow bg-card3 p-3 my-4">
                    <span className="fw-medium">ATTACHMENTS</span>
                    <span className="divider-horizontal"></span>

                    <div className="custom-file-input">
                        <input
                            type="file"
                            id="fileUpload"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="fileUpload">{fileNames}</label>
                        <InfoIcon
                            className="cursor-pointer text-red"
                            color="#c72030"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Allowed file types: JPG, PNG, PDF. Max size: 5MB."
                        />
                    </div>
                </div>

                <div className="d-flex align-items-center justify-content-center gap-2">
                    <button className="btn-red px-4 py-2" type="submit">
                        Create Event
                    </button>
                    <button
                        className="rounded-0 fw-normal text-red bg-transparent border-red px-4 py-2"
                        type="button"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </>
    );
};

export default AddEvent;
