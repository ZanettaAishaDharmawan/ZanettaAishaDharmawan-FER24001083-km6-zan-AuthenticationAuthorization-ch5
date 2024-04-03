import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function ProfileUSer() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  async function getMe() {
    try {
      const response = await axios.get("https://dummyjson.com/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch data");
      }

      const data = response.data;
      console.log("data user:", data);
      setUser(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getMe();
  }, []);

  return (
    <section>
      <div className="mt-60 text-left" key={user?.firstName}>
        <div className="absolute top-0 left-0 w-full h-screen flex">
          <img
            src={user?.image}
            className="w-full h-screen object-cover"
            alt=""
          />
          <div className="absolute top-0 left-0 w-full h-screen bg-black/80 flex items-center">
            <div className="container">
              <div className="flex gap-6 mt-12 border-2 border-white rounded-lg items-center bg-slate-800">
                <div className="w-1/4">
                  <img
                    src={user?.image}
                    className="w-full object-cover rounded-lg shadow-slate-800 shadow-lg text-left"
                    alt=""
                  />
                </div>
                <div className="w-3/4 flex flex-col justify-between text-white">
                  <div className="flex flex-col">
                    <p className="text-6xl font-bold mb-8 ">
                      {user?.firstName}
                    </p>
                    <div className="w-full h-0.5 bg-gradient-to-r from-white mb-4"></div>
                    <p className="my-2">Gender: {user?.gender}</p>
                    <p className="mb-4">Age: {user?.age}</p>
                    <p className="my-2">Email: {user?.email}</p>
                    <p className="mb-4">Phone: {user?.phone}</p>
                    <button
                      className="bg-red-500 rounded-xl w-20 py-1"
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileUSer;
