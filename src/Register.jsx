import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterImage from "./assets/Register.svg";
import GoogleLogin from "./GoogleLogin";
import { Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  useEffect(() => {
    console.log("localStorage ", localStorage.getItem("token"));
    if (localStorage.getItem("token") !== null) {
      alert("You have already register");
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response_Register = await fetch(
      "https://shy-cloud-3319.fly.dev/api/v1/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          name: name,
          password: password,
        }),
      }
    );
    const json_Register = await response_Register.json();

    if (response_Register.ok) {
      const token = json_Register.data.token;
      alert("Successfully registered!")
      localStorage.setItem("Register", "Register");
      console.log("Berhasil Register, ini tokennya: ", token);
      navigate("/login", { state: { token: token } });
    } else {
      setError(json_Register?.message || "Register failed");
      console.log("Register failed:", json_Register);
    }
  };

  return (
    <div className="flex flex-row">
      <div>
        <div className="container w-[90vh] bg-[#e73939] h-screen flex justify-center items-center">
          <div className="text-center">
            <img
              src={RegisterImage}
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
          <h1 className="text-5xl font-bold mb-4 text-black">Register</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label className="pb-3 pt-4">Name: </label>
            <input
              placeholder="name"
              value={name}
              className="container w-[500px] h-[50px] bg-slate-100 rounded-md p-4"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <br />
            <label className="pb-3">Email: </label>
            <input
              placeholder="email"
              value={email}
              className="container w-[500px] h-[50px] bg-slate-100 rounded-md p-4"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <label className="pb-3">Password: </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                placeholder="password"
                value={password}
                className="container w-[500px] h-[50px] bg-slate-100 rounded-md p-4 pr-10" // Add extra padding for the icon
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Text to toggle password visibility */}
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            {error && <span className="text-red-500 pb-2">{error}</span>}
            <button
              className="mt-8 w-[500px] h-[50px] bg-[#e73939] hover:bg-[#9a0101] rounded-md text-white text-lg"
              type="submit"
            >
              Register
            </button>
          </form>
          <div className="border-b-2 pt-5"></div>
          <GoogleLogin buttonText="Sign Up with Google" />
          <div className="flex flex-row items-center justify-center pt-4">
            <h1>Already have an account?</h1>
            <Link to="/login" className="pl-1 font-bold">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
