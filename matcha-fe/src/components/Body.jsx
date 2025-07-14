import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { PROFILE_VIEW_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(PROFILE_VIEW_URL, {
        withCredentials: true,
      });
      dispatch(addUser(response.data));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // If unauthorized, redirect to login
        navigate("/login");
        return;
      }
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      // If user is not logged in, fetch profile
      fetchProfile();
    }
  }, []);

  return (
    <div>
      <NavBar />
      <div className="min-h-[calc(100vh-64px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
