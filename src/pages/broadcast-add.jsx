import { Calendar, InfoIcon } from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { Link, useNavigate } from "react-router-dom";
import MultiSelectBox from "../components/MultiSelectBox";

const AddBroadcast = () => {
    const navigate = useNavigate();
    const [endDate, setEndDate] = useState();
    const [fileNames, setFileNames] = useState("No file chosen");
    const [selectedOption, setSelectedOption] = useState("all");
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const fileList = Array.from(files)
                .map((file) => file.name)
                .join(", ");
            setFileNames(fileList);
        } else {
            setFileNames("No file chosen");
        }
    };

    return (
        <>
            <span className="text-secondary text-18 fw-medium">
                <Link to="/broadcast" className="text-decoration-none text-secondary">
                    Broadcast List
                </Link>{" "}
                {">"} New Broadcast
            </span>

            <h5 className="my-2 text-red fw-semibold text-26">NEW BROADCAST</h5>

            <form>
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
                                />
                            </div>
                        </div>
                    </div>
                    <label className="mb-4">Expire On</label>
                    <div className="row">
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
                                            selectsEnd
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
                                    style={{ padding: "8px" }}
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
                        <div className="mt-3 w-25">
                            <label className="fw-medium mb-2" htmlFor="dropdown">
                                Select {selectedOption === "individuals" ? "Individuals" : "Groups"}
                            </label>
                            <MultiSelectBox
                                options={
                                    selectedOption === "individuals" ? [
                                        { label: "User 1", value: "user1" },
                                        { label: "User 2", value: "user2" },
                                        { label: "User 3", value: "user3" },
                                        { label: "User 4", value: "user4" },
                                        { label: "User 5", value: "user5" },
                                    ] : [
                                        { label: "Group 1", value: "group1" },
                                        { label: "Group 2", value: "group2" },
                                        { label: "Group 3", value: "group3" },
                                        { label: "Group 4", value: "group4" },
                                        { label: "Group 5", value: "group5" },
                                    ]
                                }
                                value={selectedOptions}
                                onChange={(selectedOptions) => {
                                    setSelectedOptions(selectedOptions);
                                }}
                                placeholder="Select an option"
                            />
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
