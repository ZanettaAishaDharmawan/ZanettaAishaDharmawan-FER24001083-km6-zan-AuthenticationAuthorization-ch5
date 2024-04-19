import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function ProfileUSer() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check if user is authenticated, if not, redirect to login page
    if (!localStorage.getItem("token")) {
      navigate("/register");
    }
  }, [navigate]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://shy-cloud-3319.fly.dev/api/v1/auth/me",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const userData = response.data;
        console.log("User profile: ", userData);
        setUserData(userData);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Token expired or user not logged in
        } else {
          // An error occurred while fetching user data
          console.error("Error: ", error);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <section>
      <div className="mt-60 text-left">
        <div className="absolute top-0 left-0 w-full h-screen flex">
          
          <div className="absolute top-0 left-0 w-full h-screen bg-black/80 flex items-center">
            <div className="container">
              <div className="flex gap-6 mt-12 border-2 border-white rounded-lg items-center bg-slate-800 p-8">
              
                <div className="w-3/4 flex flex-col justify-between text-white">
                  <div className="flex flex-col">
                  <h1 className="text-3xl">Profile</h1>
                    <p className="my-2">Name: {userData?.data?.name}</p>
                    <p className="my-2">Email: {userData?.data?.email}</p>
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
