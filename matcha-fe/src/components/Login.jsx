import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("john@example.com");
  const [password, setPassword] = useState("StrongPass123!");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        LOGIN_URL,
        {
          emailId,
          password,
        },
        { withCredentials: true }
      ); // Include credentials for CORS

      // Dispatch the user data to the Redux store
      dispatch(addUser(res.data));
      navigate("/"); // Redirect to home page on successful login
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage(
        error.response?.data?.message || "Invalid email or password"
      );
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm flex-shrink-0 mx-auto my-10">
      <div className="card-body">
        <h2 className="card-title text-2xl">Login</h2>
        <form className="space-y-4">
          <div className="form-control space-y-1">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>
          <div className="form-control space-y-1">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="text-red-500">{errorMessage}</p>
          <div className="form-control mt-6">
            <button onClick={handleSubmit} className="btn btn-primary">
              Login
            </button>
          </div>
          <p>Please enter your credentials to log in.</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
