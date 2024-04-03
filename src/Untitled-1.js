import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Login from "./assets/Login.png";
import ErrorModal from "./ErrorModal";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate to get the navigate function

  const handleCloseModal = () => {
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
      });

      // Redirect to response page upon successful login
      navigate("/");
    } catch (error) {
      setError(error.message);
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
            <button
              className="w-[500px] h-[50px]  bg-[#e73939] hover:bg-[#9a0101] rounded-md text-white text-lg"
              type="submit"
            >
              Login
            </button>
          </form>
          {error && <ErrorModal message={error} onClose={handleCloseModal} />}
          {/* <Modal>
      <div>
        <h1>JSON Response</h1>
        <div>
          <p>ID: {response.id}</p>
          <p>Username: {response.username}</p>
          <p>Email: {response.email}</p>
          <p>First Name: {response.firstName}</p>
          <p>Last Name: {response.lastName}</p>
          <p>Gender: {response.gender}</p>
          <p>
            Image: <img src={response.image} alt="Profile" />
          </p>
          <p>Token: {response.token}</p>
        </div>
      </div>
    </Modal> */}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
