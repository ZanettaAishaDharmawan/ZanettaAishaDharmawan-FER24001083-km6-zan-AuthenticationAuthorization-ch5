import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Navbar({ searchTerm, setSearchTerm, user }) {
  const location = useLocation();
  const [navbarBackground, setNavbarBackground] = useState("bg-background");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [userData, setUserData] = useState(null);

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

  const handleSearch = () => {
    // Navigate to the search results page with the search term as a query parameter
    window.location.href = `/search-results?query=${searchTerm}`;
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setNavbarBackground("bg-black bg-opacity-75");
    } else {
      setNavbarBackground("bg-background");
    }
  };

  window.addEventListener("scroll", handleScroll);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    // Perform logout logic here
    // For example, clearing local storage and redirecting to login page
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className={`py-5 fixed top-0 w-full z-10 px-12 ${navbarBackground}`}>
      <div className="flex justify-between items-center">
        <a href="/" className="text-red-500 text-xl font-bold">
          MOFLIX
        </a>
        <div className="hidden md:flex items-center gap-5">
          {/* Search Bar */}
          {user && (
            <div className="flex items-center gap-4">
              <div className="relative w-[600px]">
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  className="bg-transparent text-white px-4 py-2 rounded-ld w-full focus:outline-none focus:ring focus:border-blue-200"
                />
                <button
                  onClick={handleSearch}
                  className="absolute inset-y-0 right-0 text-white px-4 py-2 rounded-r-md hover:bg-gray-700 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
          {/* Menu Items */}
          <div className="flex gap-4">
            
            {/* User Dropdown */}
            {user ? (
              <div className="relative flex gap-4">
                <a href="/popular">
              <p className="text-sm font-normal text-white cursor-pointer hover:text-primary hover:font-semibold">
                Popular
              </p>
            </a>
            <a href="/now-playing">
              <p className="text-sm font-normal text-white cursor-pointer hover:text-primary hover:font-semibold">
                Now Playing
              </p>
            </a>
            <a href="/top-rated">
              <p className="text-sm font-normal text-white cursor-pointer hover:text-primary hover:font-semibold">
                Top Rated
              </p>
            </a>
                <a
                  onClick={toggleDropdown}
                  className="text-white cursor-pointer hover:text-primary"
                >
                  <p className="text-sm font-normal text-white cursor-pointer hover:text-primary hover:font-semibold">
                    Hello, {userData?.data?.name}
                  </p>
                </a>
                {dropdownVisible && (
                  <div className="absolute right-0 mt-10 w-48 bg-white rounded-md shadow-lg z-10">
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 rounded-md  hover:bg-gray-100"
                    >
                      Profile
                    </a>
                    
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm  rounded-md  text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Login and Register Links
              <div className="flex gap-4">
                <a href="/login">
                  <p className="text-sm font-normal text-white cursor-pointer hover:text-primary hover:font-semibold p-3">
                    Login
                  </p>
                </a>
                <a href="/register">
                  <p className="text-sm font-normal text-white cursor-pointer hover:text-primary hover:font-semibold border rounded-md p-3">
                    Register
                  </p>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
