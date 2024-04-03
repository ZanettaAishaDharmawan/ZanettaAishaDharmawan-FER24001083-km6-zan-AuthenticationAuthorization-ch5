import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const searchTermFromURL = new URLSearchParams(location.search).get("query");
  const [searchTerm, setSearchTerm] = useState(searchTermFromURL || "");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        user={user}
      />

      <div className="flex flex-row justify-center items-center h-screen p-10">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden flex p-5">
          <div className="p-4">
            <img
              src={user.image}
              alt="User"
              className="w-60 h-50 rounded-md items-center self-center"
            />
          </div>
          <div className="px-6 py-4 flex-grow">
            <div className="font-bold text-xl mb-2">
              {user.firstName} {user.lastName} {user.maidenName}
            </div>

            <div className="flex flex-row">
              <div className="flex flex-col">
                <p className="text-gray-700 text-base">Email:</p>
                <p className="text-gray-700 text-base pb-3">{user.email}</p>
                <p className="text-gray-700 text-base ">Phone:</p>
                <p className="text-gray-700 text-base pb-3">{user.phone}</p>
                <p className="text-gray-700 text-base">Username:</p>
                <p className="text-gray-700 text-base pb-3">{user.username}</p>
                <p className="text-gray-700 text-base">Birthdate:</p>
                <p className="text-gray-700 text-base pb-3">{user.birthDate}</p>
              </div>
              <div className="flex flex-col ml-4">
                <p className="text-gray-700 text-base">Blood type:</p>
                <p className="text-gray-700 text-base pb-3">
                  {user.bloodGroup}
                </p>
                <p className="text-gray-700 text-base">Height: </p>
                <p className="text-gray-700 text-base pb-3">{user.height}</p>
                <p className="text-gray-700 text-base">Weight: </p>
                <p className="text-gray-700 text-base pb-3">{user.weight}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserDetail;
