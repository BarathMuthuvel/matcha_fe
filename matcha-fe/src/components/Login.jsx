import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL, SIGNUP_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("@example.com");
  const [password, setPassword] = useState("password@123");
  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSignup, setIsSignup] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields for signup
    if (isSignup && (!firstName || !lastName)) {
      setErrorMessage("First name and last name are required for signup");
      return;
    }

    try {
      const url = isSignup ? SIGNUP_URL : LOGIN_URL;
      const requestData = isSignup
        ? {
            firstName,
            lastName,
            emailId,
            password,
          }
        : {
            emailId,
            password,
          };

      const res = await axios.post(url, requestData, { withCredentials: true });

      console.log(res.data.User);

      // Dispatch the user data to the Redux store
      dispatch(addUser(res.data.User));
      navigate("/"); // Redirect to home page on successful login

      if (isSignup) {
        navigate("/profile");
      }
    } catch (error) {
      console.error(isSignup ? "Signup failed:" : "Login failed:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      setErrorMessage(
        error.response?.data?.message ||
          (isSignup
            ? "Signup failed. Please try again."
            : "Invalid email or password")
      );
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm flex-shrink-0 mx-auto my-10">
      <div className="card-body">
        <h2 className="card-title text-2xl">{isSignup ? "Signup" : "Login"}</h2>
        <form className="space-y-4">
          {isSignup && (
            <>
              <div className="form-control space-y-1">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="input input-bordered"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-control space-y-1">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input input-bordered"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </>
          )}
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
          <div className="form-control mt-6 flex justify-between">
            <button onClick={handleSubmit} className="btn btn-primary">
              {isSignup ? "Signup" : "Login"}
            </button>

            <button
              type="button"
              className="btn btn-neutral text-sm"
              onClick={() => {
                setIsSignup(!isSignup);
                setErrorMessage("");
                if (isSignup) {
                  setFirstName("");
                  setLastName("");
                }
              }}
            >
              {isSignup
                ? "Already have an account? Login"
                : "Don't have an account? Signup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
