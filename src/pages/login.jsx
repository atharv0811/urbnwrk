import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `https://app.gophygital.work/oauth/token?email=${email}&password=${password}&client_id=sAc9cRLrmMrlzGwTkq9KIJCaSc09RG6CptB91hrrryg&client_secret=IuJij4Wu7xDfx9XF8F0MSwF_7hrzm6bU9NPRugedbkM&grant_type=password`
            );
            localStorage.setItem("access_token", response.data.access_token);
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <div className="d-flex align-items-center justify-content-center">
            <div className="login-container d-flex flex-column align-items-center">
                <img src="/logo.jpg" alt="" />
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
