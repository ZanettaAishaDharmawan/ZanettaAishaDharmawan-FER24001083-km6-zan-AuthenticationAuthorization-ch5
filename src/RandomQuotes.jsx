import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css";
import { useNavigate } from "react-router-dom";

function Quotes() {
  const [randomQuote, setRandomQuote] = useState({});
  const navigate = useNavigate();
  const searchTermFromURL = new URLSearchParams(location.search).get("query");
  const [searchTerm, setSearchTerm] = useState(searchTermFromURL || "");
  const [user, setUser] = useState("");

  async function fetchQuotesRandom() {
    try {
      const response = await fetch("https://dummyjson.com/quotes/random", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log("data Quotes Random  :", data);
      setRandomQuote(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchQuotesRandom();
  }, []);

  async function getMe() {
    try {
      const response = await fetch("https://dummyjson.com/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log("data user :", data);
      setUser(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div className="bg-black ">
      <div className="">
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user}
        />
      </div>
      <div className="text-white  ">
        <div className="mb-20 text-2xl text-center  text-black">QUOTES</div>

        <div className="text-3xl flex justify-between mx-20">
          <h1 className="pt-2 sm:pt-9  text-[12px] sm:text-[32px] font-bold mb-10  text-white">
            Your Quotes
          </h1>
          <button onClick={() => navigate("/quotes")} className=" border-b-2">
            Back
          </button>
        </div>
        <div className="flex flex-wrap mx-24 mt-10 gap-y-10 px-16 justify-center">
          <div className="bg-gray-800 flex flex-col  w-[900px] h-[full] mb-96 mt-24 gap-8 pt-5 rounded-lg p-4">
            <p className="text-lg text-center">{randomQuote.quote}</p>
            <p className="italic text-gray-300 text-end ">
              - {randomQuote.author}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Quotes;
