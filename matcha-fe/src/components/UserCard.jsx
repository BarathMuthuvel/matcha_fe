import React, { useState } from "react";
import axios from "axios";
import { REQUEST_SEND_STATUS_URL } from "../utils/constants";

const UserCard = ({ user, onStatusUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'interested', 'ignored', or null

  console.log("UserCard received user:", user);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Handle different possible data structures
  let userData = user;

  // If user has a nested 'user' property, use that
  if (user.user && typeof user.user === "object") {
    userData = user.user;
  }

  // If user is an array, take the first element
  if (Array.isArray(user)) {
    userData = user[0];
  }

  // Destructure user data for use in JSX with fallbacks
  const {
    firstName = "Unknown",
    lastName = "User",
    profilePicture,
    bio = "No bio available",
    skills = [],
    gender = "Other",
    age = "N/A",
    github,
    linkedin,
    _id: userId,
  } = userData || {};

  const handleStatusUpdate = async (newStatus) => {
    if (!userId || isLoading) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${REQUEST_SEND_STATUS_URL}/${newStatus}/${userId}`,
        {},
        { withCredentials: true }
      );

      // Check if the response indicates success
      if (response.data && (response.data.success || response.status === 200)) {
        setStatus(newStatus);
        // Call the parent callback if provided
        if (onStatusUpdate) {
          onStatusUpdate(userId, newStatus);
        }
      } else {
        console.error("API response indicates failure:", response.data);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
      }
      // You might want to show a toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="relative">
        {/* Code icon background */}
        <div className="absolute -inset-1 flex items-center justify-center z-0">
          <svg
            width="340"
            height="420"
            viewBox="0 0 340 420"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-10"
          >
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              fill="#fff"
              fontSize="120"
              fontFamily="monospace"
              dy=".3em"
            >
              {"</>"}
            </text>
          </svg>
        </div>
        <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/40 via-purple-500/40 to-pink-500/40 rounded-3xl blur-2xl opacity-70"></div>
        <div className="card w-96 bg-base-200 shadow-2xl border-0 rounded-3xl overflow-hidden relative z-10 hover:scale-105 transition-transform duration-300 ease-in-out backdrop-blur-md">
          <figure className="pt-8 pb-2 bg-gradient-to-t from-blue-800/40 to-purple-800/40">
            <div className="avatar mx-auto">
              <div className="w-32 h-32 rounded-full ring-4 ring-blue-400 ring-offset-base-100 ring-offset-2 shadow-lg overflow-hidden">
                <img
                  src={profilePicture || "https://via.placeholder.com/150"}
                  alt="User"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </figure>
          <div className="card-body items-center text-center px-6 pb-6 pt-2">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="card-title text-3xl font-extrabold text-blue-400 drop-shadow flex items-center gap-2">
                <span className="inline-block align-middle">
                  {firstName} {lastName}
                </span>
                <span className="text-xl align-middle">
                  {gender === "Female" ? "👩‍💻" : gender === "Male" ? "👨‍💻" : "🧑‍💻"}
                </span>
              </h2>
            </div>
            <div className="mb-2 text-xs text-base-content/60 tracking-wide">
              Looking to connect with devs!
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-lg badge-accent text-white px-4 py-2 text-base font-semibold shadow">
                {age} yrs
              </span>
            </div>
            <p className="mb-3 text-base-content/80 italic max-w-xs">{bio}</p>
            {skills && skills.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="badge badge-info badge-lg text-xs font-mono px-3 py-2 shadow"
                  >
                    <span className="mr-1">💻</span>
                    {skill}
                  </span>
                ))}
              </div>
            )}
            {/* Socials row (GitHub/LinkedIn if available) */}
            {(github || linkedin) && (
              <div className="flex gap-4 justify-center mb-4">
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tooltip"
                    data-tip="GitHub"
                  >
                    <svg
                      className="w-7 h-7 text-base-content hover:text-blue-400 transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 2.92-.39c.99 0 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
                    </svg>
                  </a>
                )}
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tooltip"
                    data-tip="LinkedIn"
                  >
                    <svg
                      className="w-7 h-7 text-base-content hover:text-blue-400 transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
                    </svg>
                  </a>
                )}
              </div>
            )}

            {/* Status Display */}
            {status && (
              <div className="mb-4">
                <span
                  className={`badge badge-lg ${
                    status === "interested" ? "badge-success" : "badge-error"
                  } text-white px-4 py-2 text-sm font-semibold`}
                >
                  {status === "interested" ? "✅ Interested" : "❌ Ignored"}
                </span>
              </div>
            )}

            {/* Loading indicator */}
            {isLoading && (
              <div className="mb-4">
                <span className="loading loading-spinner loading-md text-primary"></span>
                <span className="ml-2 text-sm text-base-content/70">
                  Processing...
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="card-actions mt-2 w-full flex justify-center gap-4">
              {!status || status === "ignored" ? (
                <button
                  className={`btn btn-lg ${
                    status === "ignored" ? "btn-success" : "btn-primary"
                  } text-white px-6 py-3 shadow-lg hover:scale-105 transition-transform ${
                    isLoading ? "loading" : ""
                  }`}
                  onClick={() => handleStatusUpdate("interested")}
                  disabled={isLoading}
                  title="Interested"
                >
                  {!isLoading && <span className="mr-2">👍</span>}
                  Interested
                </button>
              ) : null}

              {!status || status === "interested" ? (
                <button
                  className={`btn btn-lg ${
                    status === "interested"
                      ? "btn-error"
                      : "btn-outline btn-error"
                  } text-white px-6 py-3 shadow-lg hover:scale-105 transition-transform ${
                    isLoading ? "loading" : ""
                  }`}
                  onClick={() => handleStatusUpdate("ignored")}
                  disabled={isLoading}
                  title="Ignore"
                >
                  {!isLoading && <span className="mr-2">👎</span>}
                  Ignore
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
