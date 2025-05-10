import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {

    const [email, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/login", {
                email,
                password
            },{
                withCredentials :  true
            });

            dispatch(addUser(res.data));

            return navigate("/");
        }catch (error) {
            setError(error?.response?.data || "Something went wrong"); 
        }
    };

    return (
        <div className="flex justify-center my-10">
            <div className="card card-border bg-base-200 w-96">
                <div className="card-body">
                    <h2 className="card-title flex justify-center">Login</h2>
                    <div className="mb-2">
                        <label className="form-control w-full max-w-xs">
                            <div className="label mb-1">
                                <span className="label-text"><b>Email </b></span>
                            </div>
                            <input type="text" placeholder="enter your email" 
                                className="input input-bordered w-full max-w-xs" 
                                onChange={(e) => setEmailId(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label className="form-control w-full max-w-xs">
                            <div className="label mb-1">
                                <span className="label-text"><b>Password</b></span>
                            </div>
                            <input type="password" placeholder="enter your password" 
                                className="input input-bordered w-full max-w-xs" 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                    </div>
                    <p className="text-red-600">{error}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;