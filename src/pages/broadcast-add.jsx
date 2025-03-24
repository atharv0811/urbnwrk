import { Calendar, InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Link, useNavigate } from "react-router-dom";
import MultiSelectBox from "../components/MultiSelectBox";
import axios from "axios";
import toast from "react-hot-toast";

const AddBroadcast = () => {
    const navigate = useNavigate();
    const [endDate, setEndDate] = useState();
    const [endTime, setEndTime] = useState("");
    const [fileNames, setFileNames] = useState("No file chosen");
    const [selectedOption, setSelectedOption] = useState("all");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState();
    const [users, setUsers] = useState([]);
    const [attachments, setAttachments] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        end_datetime: null,
        description: "",
        share_with: "all",
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
            end_datetime: formatDateTime(endDate, endTime),
            share_with: selectedOption === "all" ? 2 : 1,
            attachments: attachments,
        }));
    }, [endDate, endTime, selectedOption, attachments]);

    const handleFileChange = (event) => {
        const files = event.target.files;
        setFileNames(files.length > 0 ? Array.from(files).map((file) => file.name).join(", ") : "No file chosen");
        setAttachments(Array.from(files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        formDataToSend.append('noticeboard[notice_heading]', formData.title);
        formDataToSend.append("noticeboard[expire_time]", formData.end_datetime);
        formDataToSend.append("noticeboard[notice_text]", formData.description);
        formDataToSend.append("noticeboard[shared]", formData.share_with);
        formDataToSend.append('noticeboard[of_phase]', 'pms');
        formDataToSend.append('noticeboard[of_atype]', 'Pms::Site');
        formDataToSend.append('noticeboard[of_atype_id]', localStorage.getItem("site_id"));

        if (formData.share_with === 1) {
            formDataToSend.append("noticeboard[swusers]", JSON.stringify(selectedUsers.map(user => user.value)));
        }

        attachments.forEach((file) => {
            formDataToSend.append("noticeboard[files_attached][]", file);
        })

        console.log("FormData contents:");
        for (let pair of formDataToSend.entries()) {
            console.log(pair[0] + ": ", pair[1]);
        }

        try {
            const response = await axios.post(`https://app.gophygital.work/pms/admin/noticeboards.json`, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                }
            })
            console.log(response)
            if (response.status === 201) {
                toast.success("Broadcast added successfully")
                navigate("/broadcast")
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to add broadcast")
        }
    }

    return (
        <>
            <span className="text-secondary text-18 fw-medium">
                <Link to="/broadcast" className="text-decoration-none text-secondary">
                    Broadcast List
                </Link>{" "}
                {">"} New Broadcast
            </span>

            <h5 className="my-2 text-red fw-semibold text-26">NEW BROADCAST</h5>

            <form onSubmit={handleSubmit}>
                <div className="card card-shadow bg-card3 p-3 my-4">
                    <span className="fw-medium">COMMUNICATION INFORMATION</span>
                    <span className="divider-horizontal"></span>

                    <div className="row mt-4">
                        <div className="col-md-6 col-lg-4 mb-4">
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

                        <div className="col-md-6 col-lg-8 mb-4">
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
                    <label className="mb-4">Expire On</label>
                    <div className="row gap-md-0 gap-4">
                        <div className="col-md-4">
                            <div className="d-flex align-items-center">
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
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="dd/mm/yyyy"
                                            className="form-control date-input-lg rounded-0"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
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
                                    style={{ padding: "10px 8px" }}
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card card-shadow bg-card3 p-3 my-4">
                    <span className="fw-medium">ATTACHMENTS</span>
                    <span className="divider-horizontal"></span>

                    <div className="custom-file-input">
                        <input type="file" id="fileUpload" onChange={handleFileChange} />
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

                <div className="card card-shadow bg-card3 p-3 my-4">
                    <span className="fw-medium">SHARE WITH</span>
                    <span className="divider-horizontal"></span>

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
                        <div className="mt-3 w-100-w-md-25">
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

                <div className="d-flex align-items-center justify-content-center gap-2">
                    <button className="btn-red px-4 py-2 fw-normal" type="submit">
                        Create Broadcast
                    </button>
                    <button
                        className="px-4 py-2 rounded-0 fw-normal text-red bg-transparent border-red"
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

export default AddBroadcast;
