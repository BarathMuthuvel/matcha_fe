import axios from "axios";
import React, { useEffect } from "react";
import { REQUEST_REVIEW_URL, USER_REQUESTS_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../store/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request.requests);

  const handleAccept = async (status, _id) => {
    try {
      const response = await axios.post(
        `${REQUEST_REVIEW_URL}/${status}/${_id}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.data.success) {
        dispatch(removeRequest(_id));
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getRequests = async () => {
    try {
      const response = await axios.get(USER_REQUESTS_URL, {
        withCredentials: true,
      });
      console.log(response.data.requests);
      dispatch(addRequests(response.data.requests));
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (requests.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-4xl font-serif">No requests found</h1>
      </div>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-4xl font-serif">Requests</h1>

      <div className="flex flex-wrap gap-4 justify-center my-10">
        {requests.map((request) => {
          const {
            firstName,
            lastName,
            skills,
            bio,
            age,
            gender,
            profilePicture,
          } = request.fromUserId;
          return (
            <div key={request._id} className="card w-96 bg-base-100 shadow-xl">
              <div className="card card-side bg-base-100 shadow-sm">
                <figure>
                  <img
                    src={profilePicture}
                    alt="profile"
                    className="w-full h-96 object-cover"
                  />
                </figure>
                <div className="card-body p-4 flex flex-col justify-between w-full">
                  <h2 className="card-title text-2xl font-serif mb-4 text-center">
                    {firstName} {lastName}
                  </h2>
                  <p className="text-sm text-center mb-4">
                    {skills.join(", ")}
                  </p>
                  <p className="text-sm text-center  mb-4">{bio}</p>
                  <p className="text-sm text-center mb-4">{age}</p>
                  <p className="text-sm text-center mb-4">{gender}</p>
                  <div className="card-actions justify-end gap-4">
                    <button
                      onClick={() => handleAccept("accepted", request._id)}
                      className="btn btn-primary"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAccept("rejected", request._id)}
                      className="btn btn-error"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
