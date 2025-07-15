import React, { useEffect } from "react";
import { USER_CONNECTIONS_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection.connections);

  const getConnections = async () => {
    try {
      const response = await axios.get(USER_CONNECTIONS_URL, {
        withCredentials: true,
      });
      console.log(response.data.connections);
      dispatch(addConnections(response.data.connections));
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (connections.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-4xl font-serif">No connections found</h1>
      </div>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-4xl font-serif">Connections</h1>

      <div className="flex flex-wrap gap-4 justify-center my-10">
        {connections.map((connection) => {
          const {
            firstName,
            lastName,
            profilePicture,
            skills,
            bio,
            age,
            gender,
          } = connection;
          return (
            <div
              key={connection.id}
              className="card w-96 bg-base-100 shadow-xl"
            >
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
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">View Profile</button>
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

export default Connections;
