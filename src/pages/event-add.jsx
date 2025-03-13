import { Calendar, InfoIcon } from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { Link, useNavigate } from "react-router-dom";

const AddEvent = () => {
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [isChecked, setIsChecked] = useState(false);
    const [selectedOption, setSelectedOption] = useState("all");
    const [isImportant, setIsImportant] = useState(false);
    const [sendEmail, setSendEmail] = useState(false);
    const [fileNames, setFileNames] = useState("No file chosen");

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

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    return (
        <>
            <span className="text-secondary text-18 fw-medium">
                <Link to="/events" className="text-decoration-none text-secondary">
                    Event List
                </Link>{" "}
                {">"} New Event
            </span>

            <h5 className="my-2 text-red fw-semibold text-26">NEW EVENT</h5>

            <form>
                <div className="card card-shadow bg-card3 p-3 my-4">
                    <span className="fw-medium">EVENT INFORMATION</span>
                    <span className="divider-horizontal"></span>

                    <div className="row mt-4">
                        <div className="col-md-6 col-lg-3 mb-4">
                            <div className="position-relative form-group w-100">
                                <label
                                    className="position-absolute bg-card3 px-1 text-secondary"
                                    style={{ top: "-15px", left: "5px" }}
                                >
                                    Title
                                </label>
                                <input
                                    type="text"
                                    className="bg-card3 w-100"
                                    style={{ padding: "8px" }}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 mb-4">
                            <div className="position-relative form-group w-100">
                                <label
                                    className="position-absolute bg-card3 px-1 text-secondary"
                                    style={{ top: "-15px", left: "5px" }}
                                >
                                    Venue
                                </label>
                                <input
                                    type="text"
                                    className="bg-card3 w-100"
                                    style={{ padding: "8px" }}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 mb-4">
                            <div className="position-relative form-group w-100">
                                <label
                                    className="position-absolute bg-card3 px-1 text-secondary z-1"
                                    style={{ top: "-15px", left: "5px" }}
                                >
                                    Start Date
                                </label>
                                <div className="position-relative">
                                    <Calendar className="calendar-icon" />
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
                                    className="position-absolute bg-card3 px-1 text-secondary z-1"
                                    style={{ top: "-15px", left: "5px" }}
                                >
                                    End Date
                                </label>
                                <div className="position-relative">
                                    <Calendar className="calendar-icon" />
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
                                    className="position-absolute bg-card3 px-1 text-secondary"
                                    style={{ top: "-15px", left: "5px" }}
                                >
                                    Start Time
                                </label>
                                <input
                                    type="time"
                                    className="bg-card3 w-100"
                                    style={{ padding: "8px" }}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 mb-4">
                            <div className="position-relative form-group w-100">
                                <label
                                    className="position-absolute bg-card3 px-1 text-secondary"
                                    style={{ top: "-15px", left: "5px" }}
                                >
                                    End Time
                                </label>
                                <input
                                    type="time"
                                    className="bg-card3 w-100"
                                    style={{ padding: "8px" }}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="position-relative form-group w-100">
                                <label
                                    className="position-absolute bg-card3 px-1 text-secondary"
                                    style={{ top: "-15px", left: "5px" }}
                                >
                                    Description
                                </label>
                                <textarea
                                    rows={1}
                                    className="bg-card3 w-100"
                                    style={{ padding: "8px" }}
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
                                        checked={isChecked}
                                        onChange={handleToggle}
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
