import axios from "axios";
import { useState, useEffect } from "react";

const SiteSelector = () => {
    const [showModal, setShowModal] = useState(false);

    const [currentUser, setCurrentUser] = useState({})
    const [sites, setSites] = useState([])

    const token = localStorage.getItem("access_token");

    useEffect(() => {
        if (!localStorage.getItem("site_id")) {
            setShowModal(true)
        }
    }, [])

    useEffect(() => {
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
        fetchCurrentUser()
    }, [])

    useEffect(() => {
        if (!currentUser?.id) return;

        const fetchSites = async () => {
            try {
                const response = await axios.get(`https://app.gophygital.work/pms/sites/allowed_sites.json?user_id=${currentUser.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                console.log(response)
                setSites(response.data.sites)
            } catch (error) {
                console.log(error)
            }
        }

        fetchSites();
    }, [currentUser?.id])

    const handleStatusChange = async (id) => {
        try {
            const response = await axios.get(
                `https://app.gophygital.work/change_site.json?site_id=${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const newSite = response.data["pms/site"];

            localStorage.setItem("site_id", newSite.id);
            localStorage.setItem("site_name", newSite.name);

            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {showModal && (
                <div className="modal-backdrop-custom">
                    <div className="modal show d-block custom-modal" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content shadow-lg rounded-4">
                                <div className="modal-header">
                                    <h5 className="modal-title">Select Site</h5>
                                </div>
                                <div className="modal-body">
                                    <select
                                        className="form-select"
                                        onChange={(e) => handleStatusChange(e.target.value)}
                                    >
                                        <option value="">Select a site</option>
                                        {sites.map((site) => (
                                            <option key={site.id} value={site.id}>
                                                {site.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SiteSelector;
