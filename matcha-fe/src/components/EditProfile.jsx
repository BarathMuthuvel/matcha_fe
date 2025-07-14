import { useState } from "react";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  console.log("user in EditProfile:", user);

  const [firstName, setFirstName] = useState(user.user.firstName || "");
  const [lastName, setLastName] = useState(user.user.lastName || "");
  const [age, setAge] = useState(user.user.age || "");
  const [bio, setBio] = useState(user.user.bio || "");
  const [skills, setSkills] = useState(user.user.skills || []);
  const [profilePicture, setProfilePicture] = useState(
    user.user.profilePicture || ""
  );
  const [gender, setGender] = useState(user.user.gender || "");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm flex-shrink-0 mx-auto my-10">
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
                value={skills.join(", ")}
                onChange={(e) =>
                  setSkills(
                    e.target.value.split(",").map((skill) => skill.trim())
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
              <button onClick={handleSubmit} className="btn btn-primary">
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
            age,
            gender,
            bio,
            skills,
            profilePicture,
          },
        }}
      />
    </div>
  );
};

export default EditProfile;
