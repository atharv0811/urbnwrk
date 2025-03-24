import axios from "axios";
import { InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const TicketsAdd = () => {
    const [selectedBehalfOption, setSelectedBehalfOption] = useState("self");
    const [selectedUser, setSelectedUser] = useState({});
    const [loggedInUser, setLoggedInUser] = useState()
    const [occupantUsers, setOccupantUsers] = useState([]);
    const [fmUsers, setFmUsers] = useState([]);
    const [ticketTypeOption, setTicketTypeOption] = useState("");
    const [helpdeskCategory, setHelpdeskCategory] = useState([]);
    const [categoryTypeId, setCategoryTypeId] = useState();
    const [helpdeskSubCategory, setHelpdeskSubCategory] = useState([]);
    const [assignedTo, setAssignedTo] = useState([]);
    const [fileNames, setFileNames] = useState("No file chosen");
    const [modes, setModes] = useState([]);
    const [attachments, setAttachments] = useState([]);
    const [formData, setFormData] = useState({
        on_behalf_of: "",
        selectedUser: null,
        ticketType: "",
        categoryType: null,
        subCategory: null,
        adminPriority: "",
        assignTo: null,
        proactive_reactive: "",
        referenceNo: "",
        description: "",
        mode: "",
        attachments: [],
    });

    const navigate = useNavigate()
    const token = localStorage.getItem("access_token");

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            on_behalf_of: selectedBehalfOption === "self" ? "admin" : "user",
            selectedUser: selectedUser.id,
            ticketType: ticketTypeOption,
            attachments: attachments,
        }));
    }, [selectedBehalfOption, selectedUser, ticketTypeOption, attachments]);

    const fetchSelf = async () => {
        try {
            const response = await axios.get(
                `https://app.gophygital.work/pms/get_user_detail.json`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSelectedUser(response.data);
            setLoggedInUser(response.data.id)
        } catch (error) {
            console.log(error);
        }
    };

    const fetchOccupantUsers = async () => {
        try {
            const response = await axios.get(
                `https://app.gophygital.work/pms/users/occupant_users_with_entity.json`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setOccupantUsers(response.data.occupant_users);
            setAssignedTo(response.data.occupant_users);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchFmUsers = async () => {
        try {
            const response = await axios.get(
                `https://app.gophygital.work/pms/users/fm_users.json`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setFmUsers(response.data.users);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCategoryTypes = async () => {
        try {
            const response = await axios.get(
                `https://app.gophygital.work/pms/admin/helpdesk_categories.json`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setHelpdeskCategory(response.data.helpdesk_categories);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchSubCategoryTypes = async () => {
        try {
            const response = await axios.get(
                `https://app.gophygital.work/pms/admin/get_sub_categories.json?category_type_id=${categoryTypeId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);
            setHelpdeskSubCategory(response.data.sub_categories);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchModes = async () => {
        try {
            const response = await axios.get(
                `https://app.gophygital.work/pms/admin/complaint_modes.json`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setModes(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        categoryTypeId && fetchSubCategoryTypes();
    }, [categoryTypeId]);

    useEffect(() => {
        fetchSelf();
        fetchOccupantUsers();
        fetchCategoryTypes();
        fetchModes();
    }, []);

    useEffect(() => {
        if (selectedBehalfOption === "self") {
            fetchSelf();
        }
        if (selectedBehalfOption === "fm") {
            fetchFmUsers();
        }
    }, [selectedBehalfOption]);

    const handleFileChange = (event) => {
        const files = event.target.files;
        setFileNames(
            files.length > 0
                ? Array.from(files)
                    .map((file) => file.name)
                    .join(", ")
                : "No file chosen"
        );
        setAttachments(Array.from(files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("of_phase", "pms");
        formDataToSend.append("site_id", localStorage.getItem("site_id"));
        formDataToSend.append("id_user", loggedInUser);
        formDataToSend.append("on_behalf_of", formData.on_behalf_of);
        formDataToSend.append("complaint_type", formData.ticketType)
        formDataToSend.append("category_type_id", formData.categoryType);
        formDataToSend.append("sub_category_id", formData.subCategory);
        formDataToSend.append("priority", formData.adminPriority);
        formDataToSend.append("society_staff_type", "Spree::User");
        formDataToSend.append("assigned_to", formData.assignTo);
        formDataToSend.append("proactive_reactive", formData.proactive_reactive);
        formDataToSend.append("reference_number", formData.referenceNo);
        formDataToSend.append("heading", formData.description);
        formDataToSend.append("complaint_mode_id", formData.mode);
        if (selectedBehalfOption === "occupant") {
            formDataToSend.append("sel_id_user", formData.selectedUser);
        }
        if (selectedBehalfOption === "fm") {
            formDataToSend.append("fm_user_id", formData.selectedUser);
        }
        attachments.forEach((file) => {
            formDataToSend.append("attachments[]", file);
        })

        try {
            const response = await axios.post(`https://app.gophygital.work/pms/admin/complaints.json`, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (response.status === 201) {
                toast.success("Ticket added successfully");
                navigate("/tickets")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <span className="text-secondary text-18 fw-medium">
                <Link to="/tickets" className="text-decoration-none text-secondary">
                    Tickets List
                </Link>{" "}
                {">"} New Ticket
            </span>

            <h5 className="my-2 text-red fw-semibold text-26">NEW TICKET</h5>

            <form onSubmit={handleSubmit}>
                <div className="card card-shadow bg-card3 p-3 my-4">
                    <span className="fw-medium">TICKET DETAILS</span>
                    <span className="divider-horizontal"></span>

                    <div className="d-flex align-items-center gap-4">
                        <span className="fw-semibold">On Behalf of</span>
                        <div className="d-flex align-items-center gap-3">
                            <div className="form-check me-3">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="behalfOptions"
                                    id="self"
                                    value="self"
                                    checked={selectedBehalfOption === "self"}
                                    onChange={() => setSelectedBehalfOption("self")}
                                />
                                <label className="form-check-label" htmlFor="self">
                                    Self
                                </label>
                            </div>
                            <div className="form-check me-3">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="behalfOptions"
                                    id="occupant"
                                    value="occupant"
                                    checked={selectedBehalfOption === "occupant"}
                                    onChange={() => setSelectedBehalfOption("occupant")}
                                />
                                <label className="form-check-label" htmlFor="occupant">
                                    Occupant User
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="behalfOptions"
                                    id="fm"
                                    value="fm"
                                    checked={selectedBehalfOption === "fm"}
                                    onChange={() => setSelectedBehalfOption("fm")}
                                />
                                <label className="form-check-label" htmlFor="fm">
                                    FM User
                                </label>
                            </div>
                        </div>
                    </div>

                    {selectedBehalfOption !== "self" &&
                        (selectedBehalfOption === "occupant" ? (
                            <div className="position-relative form-group w-100 mt-4">
                                <label
                                    className="position-absolute bg-label px-1 text-secondary"
                                    style={{ top: "-15px", left: "5px" }}
                                >
                                    User
                                </label>
                                <select
                                    className="bg-label w-100-w-md-25"
                                    style={{ padding: "10px" }}
                                    onChange={(e) => {
                                        const user = occupantUsers.find(
                                            (user) => user.id === Number(e.target.value)
                                        );
                                        setSelectedUser(user);
                                    }}
                                >
                                    <option value="">Select Occupant User</option>
                                    {occupantUsers.map((user) => (
                                        <option
                                            key={user.id}
                                            value={user.id}
                                        >{`${user?.firstname} ${user?.lastname}`}</option>
                                    ))}
                                </select>
                            </div>
                        ) : (
                            <div className="position-relative form-group w-100 mt-4">
                                <label
                                    className="position-absolute bg-label px-1 text-secondary"
                                    style={{ top: "-15px", left: "5px" }}
                                >
                                    User
                                </label>
                                <select
                                    className="bg-label w-100-w-md-25"
                                    style={{ padding: "10px" }}
                                    onChange={(e) => {
                                        const user = fmUsers.find(
                                            (user) => user.id === Number(e.target.value)
                                        );
                                        setSelectedUser(user);
                                    }}
                                >
                                    <option value="">Select FM User</option>
                                    {fmUsers.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.full_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}

                    <div className="my-3 py-3 card card-shadow bg-card">
                        <span className="fw-semibold">Requestor Details</span>

                        <div className="row px-3">
                            <div className="col-lg-4 col-sm-12 row px-2 my-2 ">
                                <div className="col-6 ">
                                    <label className="text-18 text-secondary2 fw-normal">
                                        Name
                                    </label>
                                </div>
                                <div className="col-6">
                                    <label className="text">
                                        <span className="me-3">
                                            <span className="fw-normal text-18">
                                                :{" "}
                                                {selectedBehalfOption === "self" ||
                                                    selectedBehalfOption === "occupant"
                                                    ? selectedUser?.firstname +
                                                    " " +
                                                    selectedUser?.lastname
                                                    : selectedUser?.full_name}
                                            </span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-12 row px-2 my-2 ">
                                <div className="col-6 ">
                                    <label className="text-18 text-secondary2 fw-normal">
                                        Contact Number
                                    </label>
                                </div>
                                <div className="col-6">
                                    <label className="text">
                                        <span className="me-3">
                                            <span className="fw-normal text-18">
                                                : {selectedUser?.mobile}
                                            </span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-12 row px-2 my-2 ">
                                <div className="col-6 ">
                                    <label className="text-18 text-secondary2 fw-normal">
                                        Site
                                    </label>
                                </div>
                                <div className="col-6">
                                    <label className="text">
                                        <span className="me-3">
                                            <span className="fw-normal text-18">
                                                : {localStorage.getItem("site_name")}
                                            </span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-12 row px-2 my-2 ">
                                <div className="col-6 ">
                                    <label className="text-18 text-secondary2 fw-normal">
                                        Department
                                    </label>
                                </div>
                                <div className="col-6">
                                    <label className="text">
                                        <span className="me-3">
                                            <span className="fw-normal text-18">
                                                : {selectedUser?.department_name}
                                            </span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-12 row px-2 my-2 ">
                                <div className="col-6 ">
                                    <label className="text-18 text-secondary2 fw-normal">
                                        Unit
                                    </label>
                                </div>
                                <div className="col-6">
                                    <label className="text">
                                        <span className="me-3">
                                            <span className="fw-normal text-18">
                                                : {selectedUser?.unit_name}
                                            </span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <span className="divider-horizontal"></span>

                    <div className="d-flex align-items-center gap-4">
                        <span className="fw-semibold">Ticket Type</span>
                        <div className="d-flex align-items-center gap-3">
                            <div className="form-check me-3">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="ticketType"
                                    id="request"
                                    value="request"
                                    checked={ticketTypeOption === "Request"}
                                    onChange={() => setTicketTypeOption("Request")}
                                />
                                <label className="form-check-label" htmlFor="request">
                                    Request
                                </label>
                            </div>
                            <div className="form-check me-3">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="ticketType"
                                    id="suggestion"
                                    value="suggestion"
                                    checked={ticketTypeOption === "Suggestion"}
                                    onChange={() => setTicketTypeOption("Suggestion")}
                                />
                                <label className="form-check-label" htmlFor="suggestion">
                                    Suggestion
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="ticketType"
                                    id="complaint"
                                    value="complaint"
                                    checked={ticketTypeOption === "Complaint"}
                                    onChange={() => setTicketTypeOption("Complaint")}
                                />
                                <label className="form-check-label" htmlFor="complaint">
                                    Complaint
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="position-relative form-group w-100">
                                <label
                                    className="position-absolute bg-label px-1 text-secondary"
                                    style={{ top: "-15px", left: "5px" }}
                                >
                                    Category Type
                                </label>
                                <select
                                    className="bg-label w-100"
                                    style={{ padding: "10px" }}
                                    onChange={(e) => {
                                        setCategoryTypeId(e.target.value);
                                        setFormData({ ...formData, categoryType: e.target.value });
                                    }}
                                >
                                    <option value="">Select Category</option>
                                    {helpdeskCategory.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="position-relative form-group w-100">
                                <label
                                    className="position-absolute bg-label px-1 text-secondary"
                                    style={{ top: "-15px", left: "5px" }}
                                >
                                    Sub Category Type
                                </label>
                                <select
                                    className="bg-label w-100"
                                    style={{ padding: "10px" }}
                                    onChange={(e) => {
                                        setFormData({ ...formData, subCategory: e.target.value });
                                    }}
                                >
                                    <option value="">Select Sub Category</option>
                                    {helpdeskSubCategory.map((subCategory) => (
                                        <option key={subCategory.id} value={subCategory.id}>
                                            {subCategory.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="position-relative form-group w-100">
                                <label
                                    className="position-absolute bg-label px-1 text-secondary"
                                    style={{ top: "-15px", left: "5px" }}
                                >
                                    Admin Priority
                                </label>
                                <select
                                    className="bg-label w-100"
                                    style={{ padding: "10px" }}
                                    onChange={(e) => {
                                        setFormData({ ...formData, adminPriority: e.target.value });
                                    }}
                                >
                                    <option value="">Select Priority</option>
                                    <option value="P1 - Critical">P1 - Critical</option>
                                    <option value="P2 - Very High">P2 - Very High</option>
                                    <option value="P3 - High">P3 - High</option>
                                    <option value="P4 - Medium">P4 - Medium</option>
                                    <option value="P5 - Low">P5 - Low</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="position-relative form-group w-100">
                                <label
                                    className="position-absolute bg-label px-1 text-secondary"
                                    style={{ top: "-15px", left: "5px" }}
                                >
                                    Assign To
                                </label>
                                <select
                                    className="bg-label w-100"
                                    style={{ padding: "10px" }}
                                    onChange={(e) => {
                                        setFormData({ ...formData, assignTo: e.target.value });
                                    }}
                                >
                                    <option value="">Select Assignee</option>
                                    {assignedTo.map((assignee) => (
                                        <option key={assignee.id} value={assignee.id}>
                                            {assignee.firstname + " " + assignee.lastname}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="position-relative form-group w-100">
                                <label
                                    className="position-absolute bg-label px-1 text-secondary"
                                    style={{ top: "-15px", left: "5px" }}
                                >
                                    Proactive/Reactive
                                </label>
                                <select
                                    className="bg-label w-100"
                                    style={{ padding: "10px" }}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            proactive_reactive: e.target.value,
                                        });
                                    }}
                                >
                                    <option value="">Select Proactive/Reactive</option>
                                    <option value="Proactive">Proactive</option>
                                    <option value="Reactive">Reactive</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="position-relative form-group w-100">
                                <label
                                    className="position-absolute bg-label px-1 text-secondary"
                                    style={{ top: "-15px", left: "5px" }}
                                >
                                    Reference Number
                                </label>
                                <input
                                    type="text"
                                    className="bg-label w-100"
                                    style={{ padding: "8px" }}
                                    placeholder="Enter Reference Number"
                                    value={formData.referenceNo}
                                    onChange={(e) =>
                                        setFormData({ ...formData, referenceNo: e.target.value })
                                    }
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
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-4">
                            <div className="position-relative form-group w-100">
                                <label
                                    className="position-absolute bg-label px-1 text-secondary"
                                    style={{ top: "-15px", left: "5px" }}
                                >
                                    Mode
                                </label>
                                <select
                                    className="bg-label w-100"
                                    style={{ padding: "10px" }}
                                    onChange={(e) =>
                                        setFormData({ ...formData, mode: e.target.value })
                                    }
                                >
                                    <option value="">Select Complaint Mode</option>
                                    {modes.map((mode) => (
                                        <option key={mode.id} value={mode.id}>
                                            {mode.name}
                                        </option>
                                    ))}
                                </select>
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

                <div className="d-flex align-items-center justify-content-center gap-2">
                    <button className="btn-red px-4 py-2 fw-normal" type="submit">
                        Create Ticket
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

export default TicketsAdd;
