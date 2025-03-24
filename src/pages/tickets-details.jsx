import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const TicketsDetails = () => {
    const { id } = useParams();
    const [ticketDetails, setTicketDetails] = useState({})

    const token = localStorage.getItem("access_token");

    const fetchTicketDetails = async () => {
        try {
            const response = await axios.get(`https://app.gophygital.work/pms/complaints/${id}.json`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log(response.data)
            setTicketDetails(response.data)
        } catch (error) {
            console.log(error)
        }
    };

    console.log(ticketDetails)

    useEffect(() => {
        fetchTicketDetails();
    }, []);

    return (
        <>
            <span className="text-secondary text-18 fw-medium">
                <Link to="/events" className="text-decoration-none text-secondary">
                    Tickets
                </Link>{" "}
                {">"} Ticket Details
            </span>

            <h5 className="my-2 text-red fw-medium text-26">TICKET DETAILS</h5>

            <div className="card bg-card3 card-shadow my-4 p-3">
                <div className="row px-3">
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Title
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.heading}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Created On
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {(ticketDetails.created_at)?.split("T")[0]}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Ticket No.
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.ticket_number}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Status
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.issue_status}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Category
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.category_type}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Admin Priority
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.priority}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Subcategory
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.sub_category_type}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Reference Number
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.reference_number}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <h5 className="my-2 text-red fw-medium text-26">
                CREATOR'S INFORMATION
            </h5>

            <div className="card bg-card3 card-shadow my-4 p-3">
                <div className="row px-3">
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Created By
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.updated_by}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Department
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.department_name}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Site
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.site_name}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Unit
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.unit_name}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <h5 className="my-2 text-red fw-medium text-26">
                LOCATION INFORMATION
            </h5>

            <div className="card bg-card3 card-shadow my-4 p-3">
                <div className="row px-3">
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Region
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.region}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Zone
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.zone}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                City
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.city}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                District
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.district}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                State
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.state}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Address
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.address}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Building
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.building_name}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Floor
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.floor_name}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Room
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.room_name}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <h5 className="my-2 text-red fw-medium text-26">
                ADDITIONAL INFORMATION
            </h5>

            <div className="card bg-card3 card-shadow my-4 p-3">
                <div className="row px-3">
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Assigned To
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.assigned_to}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                External Priority
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.external_priority}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Proactive/Reactive
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.proactive_reactive}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Review(Tracking)
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.review_tracking}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Service Type
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.service_type}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Corrective Action
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.corrective_action}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Complaint Mode
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.complaint_mode}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Preventive Action
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.preventive_action}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Responsible Person
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.responsible_person}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Impact
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.impact}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Correction
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.correction}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Root Cause
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.root_cause}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Asset/Service
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.asset_service}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Task ID
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.task_id}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Asset/Service Location
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.service_location}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 row px-2 my-2 ">
                        <div className="col-6 ">
                            <label
                                className="text-18 fw-normal"
                                style={{ color: "rgba(26, 26, 26, 0.54)" }}
                            >
                                Notes
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="text">
                                <span className="me-3">
                                    <span className="text-dark fw-normal text-18">
                                        : {ticketDetails.notes}
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <h5 className="my-2 text-red fw-medium text-26">
                ATTACHMENTS
            </h5>

            <div className="card card-shadow bg-card3 p-3 my-4">
                <div>
                    {ticketDetails.documents?.length > 0 && (
                        <img src={ticketDetails.documents[0].document} alt="" className="rounded-2 w-25" />
                    )}
                </div>
            </div>
        </>
    );
};

export default TicketsDetails;
