import axios from "axios";
import { FEED_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);

  const getFeedData = async () => {
    if (Array.isArray(feed) && feed.length > 0) return; // If feed is already loaded, skip fetching

    try {
      const response = await axios.get(FEED_URL, { withCredentials: true });
      dispatch(addFeed(response.data));
    } catch (error) {
      console.error("Error fetching feed data:", error);
    }
  };

  useEffect(() => {
    getFeedData();
  }, []);

  return (
    <div>
      <UserCard user={feed} />
    </div>
  );
};

export default Feed;
