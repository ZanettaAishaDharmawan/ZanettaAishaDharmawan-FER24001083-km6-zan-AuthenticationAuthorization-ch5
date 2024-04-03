import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "./assets/Login.png";
import ErrorModal from "./ErrorModal";
import Modal from "./Modal";
import "./Modal.css";
import { Link } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [expiresInMins, setExpiresInMins] = useState(30);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  // Set expiresInMins to 30 when component mounts
  useEffect(() => {
    setExpiresInMins(30);
  }, []);

  const handleCloseModal = () => {
    setError(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   const res = await axios.post("https://dummyjson.com/auth/login", {
    //     username,
    //     password,
    //     expiresInMins,
    //   });

    //   setResponse(res.data);
    // } catch (error) {
    //   setError(error.message);
    // }

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
                  expiresInMins,

        }),
      });
      if (!response.ok) {
        throw new Error("Failed to login");
      }
      const data = await response.json();
      console.log("Logged in user data: ", data);
      const { token } = data;
      localStorage.setItem("token", token);
      window.location.href = "/";
    } catch (error) {
      console.error("Login error: ", error);
      setError("Your Username and password is wrong");
    }
  };

  return (
    <div className="flex flex-row">
      <div>
        <div className="container w-[90vh] bg-[#e73939] h-screen flex justify-center items-center">
          <div className="text-center">
            <img
              src={Login}
              alt="Hero"
              className="px-8 py-4 md:px-32 md:py-10 mx-auto"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-2 md:mb-4 text-white">
              MOFLIX
            </h1>
            <h3 className="text-lg md:text-xl font-medium text-white">
              Step into a world of entertainment with Moflix at your fingertips.
            </h3>
          </div>
        </div>
      </div>
      <div className="container flex flex-col justify-center items-center h-screen self-center">
        <div>
          <h1 className="text-5xl font-bold mb-4 text-black">Welcome Back</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label className=" pb-3 pt-4">Username: </label>
            <input
              type="text"
              value={username}
              className="container w-[500px] h-[50px] bg-slate-100 rounded-md p-4"
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <label className=" pb-3">Password: </label>

            <input
              type="password"
              value={password}
              className="container w-[500px] h-[50px] bg-slate-100 rounded-md p-4"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            {/* <label>
              Expires In (Minutes):
              <input
                type="number"
                value={expiresInMins}
                onChange={(e) => setExpiresInMins(e.target.value)}
              />
            </label> */}
            <br />
            <button
              className="w-[500px] h-[50px]  bg-[#e73939] hover:bg-[#9a0101] rounded-md text-white text-lg"
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="container">
            {response && (
              <div className="modal-container">
                <pre>
                  <div className="modal-content">
                    <div>
                      <p>
                        <img
                          src={response.image}
                          alt="Profile"
                          className="self-center"
                        />
                      </p>
                      <h1 className="text-xl md:text-5xl font-bold mb-2 md:mb-4 pt-4 text-black text-wrap">
                        Welcome back {response.firstName} {response.lastName}!
                      </h1>
                      <Link
                        to="/"
                        className="inline-block px-6 py-3 pt-4 bg-[#b939e7] hover:bg-[#9a018b] rounded-md text-white text-lg"
                      >
                        Let's Start Journey!
                      </Link>
                    </div>
                  </div>
                </pre>
              </div>
            )}
            {error && <ErrorModal message={error} onClose={handleCloseModal} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
