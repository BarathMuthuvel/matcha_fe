import axios from "axios";
import { FEED_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed.users);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  console.log("Feed state:", feed);
  console.log("Feed type:", typeof feed);
  console.log("Feed length:", feed ? feed.length : "feed is null/undefined");
  console.log("Current user:", user);

  const getFeedData = async () => {
    if (feed && feed.length > 0) return; // If feed is already loaded, skip fetching

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(FEED_URL, { withCredentials: true });

      if (response.data && response.data.users) {
        dispatch(addFeed(response.data.users));
      } else if (Array.isArray(response.data)) {
        dispatch(addFeed(response.data));
      } else {
        setError("Invalid data format received from server");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);

        if (error.response.status === 401) {
          setError("Please log in to view the feed");
        } else {
          setError(`Server error: ${error.response.status}`);
        }
      } else {
        setError("Network error - please check your connection");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = (userId, status) => {
    console.log(`User ${userId} status updated to: ${status}`);
    // Move to next user
    setCurrentUserIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (user) {
      getFeedData();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-base-content mb-4">
            Please log in to view the feed
          </h2>
          <p className="text-base-content/70">
            You need to be authenticated to see other users
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/70">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-error mb-4">Error</h2>
          <p className="text-base-content/70 mb-4">{error}</p>
          <button className="btn btn-primary" onClick={getFeedData}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Check if we have users and current index is valid
  if (!feed || feed.length === 0 || currentUserIndex >= feed.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-base-content mb-4">
            No more users to show
          </h2>
          <p className="text-base-content/70">
            Check back later for new connections!
          </p>
          <button
            className="btn btn-primary mt-4"
            onClick={() => {
              setCurrentUserIndex(0);
              getFeedData();
            }}
          >
            Refresh Feed
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <UserCard
        user={feed[currentUserIndex]}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
};

export default Feed;
