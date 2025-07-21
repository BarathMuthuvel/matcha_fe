import { useState } from "react";
import UserCard from "./UserCard";
import { PROFILE_EDIT_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const EditProfile = ({ user }) => {
  console.log("EditProfile received user prop:", user);

  const [firstName, setFirstName] = useState(user?.user?.firstName || "");
  const [lastName, setLastName] = useState(user?.user?.lastName || "");
  const [age, setAge] = useState(user?.user?.age || "");
  const [bio, setBio] = useState(user?.user?.bio || "");
  const [skills, setSkills] = useState(user?.user?.skills || []);
  const [profilePicture, setProfilePicture] = useState(
    user?.user?.profilePicture || ""
  );
  const [gender, setGender] = useState(user?.user?.gender || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const dispatch = useDispatch();

  // Add safety check for user object
  if (!user || !user.user) {
    console.log("User object is missing or invalid:", user);
    return <div className="text-center p-4">Loading user data...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate and prepare the data
    const ageNumber = parseInt(age);
    if (isNaN(ageNumber) || ageNumber < 0) {
      setErrorMessage("Please enter a valid age");
      return;
    }

    // Log the data being sent
    const requestData = {
      firstName,
      lastName,
      age: ageNumber,
      bio,
      skills,
      profilePicture,
      gender,
    };

    console.log("Sending request data:", requestData);

    try {
      const response = await axios.put(PROFILE_EDIT_URL, requestData, {
        withCredentials: true,
      });

      console.log("API Response:", response);
      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      // Check if the response is successful (2xx status codes)
      if (response.status >= 200 && response.status < 300) {
        setErrorMessage(""); // Clear any previous error messages

        // Check if response.data.user exists before dispatching
        if (response.data && response.data.user) {
          // Merge the returned user data with the current form data
          // to preserve fields that might not be returned by the API
          const updatedUser = {
            ...response.data.user,
            age: age || response.data.user.age,
            bio: bio || response.data.user.bio,
            gender: gender || response.data.user.gender,
            skills: skills || response.data.user.skills || [],
            profilePicture: profilePicture || response.data.user.profilePicture,
          };

          console.log("Updated user data:", updatedUser);

          // Wrap the user object in the expected structure
          dispatch(addUser({ user: updatedUser }));
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
          }, 3000);
        } else {
          console.warn("Unexpected response structure:", response.data);
          dispatch(addUser(response.data));
        }
      } else {
        throw new Error(`Failed to update profile. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to update profile"
      );
    }
  };

  return (
    <div className="flex items-center justify-center">
      {isSuccess && (
        <div className="toast toast-top toast-end mt-20">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
      <div className="card bg-base-300 w-96 shadow-sm flex-shrink-0 mx-10 my-10">
        <div className="card-body">
          <h2 className="card-title text-2xl">Edit Profile</h2>
          <form className="space-y-4">
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
            <div className="form-control space-y-1">
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <input
                type="number"
                placeholder="Age"
                className="input input-bordered"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="form-control space-y-1">
              <label className="label">
                <span className="label-text">Gender</span>
              </label>

              <input
                type="text"
                placeholder="Gender"
                className="input input-bordered"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>

            <div className="form-control space-y-1">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                placeholder="Tell us about yourself"
                className="textarea textarea-bordered"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
            <div className="form-control space-y-1">
              <label className="label">
                <span className="label-text">Skills</span>
              </label>
              <input
                type="text"
                placeholder="Skills (comma separated)"
                className="input input-bordered"
                value={Array.isArray(skills) ? skills.join(", ") : ""}
                onChange={(e) =>
                  setSkills(
                    e.target.value
                      .split(",")
                      .map((skill) => skill.trim())
                      .filter((skill) => skill.length > 0)
                  )
                }
              />
            </div>
            <div className="form-control space-y-1">
              <label className="label">
                <span className="label-text">Profile Picture URL</span>
              </label>
              <input
                type="text"
                placeholder="Profile Picture URL"
                className="input input-bordered"
                value={profilePicture}
                onChange={(e) => setProfilePicture(e.target.value)}
              />
            </div>
            <p className="text-red-500">{errorMessage}</p>
            <div className="form-control mt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      <UserCard
        user={{
          user: {
            firstName,
            lastName,
            age: parseInt(age) || 0,
            gender,
            bio,
            skills,
            profilePicture,
          },
        }}
        onStatusUpdate={null} // No status updates needed for profile preview
      />
    </div>
  );
};

export default EditProfile;
