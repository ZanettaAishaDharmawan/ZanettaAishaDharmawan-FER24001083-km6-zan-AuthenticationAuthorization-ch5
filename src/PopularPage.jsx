import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function PopularPage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const API_KEY = "de1e0b98496c6434dd3e14f9554f5287";
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userData, setUserData] = useState(null);
  const searchTermFromURL = new URLSearchParams(location.search).get("query");
  const [searchTerm, setSearchTerm] = useState(searchTermFromURL || "");
  const [popularHoveredMovieId, setPopularHoveredMovieId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${currentPage}&include_adult=false&api_key=${API_KEY}`
        );
        setPopularMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching popular movies: ", error);
      }
    };

    // Fetch popular movies when currentPage changes
    fetchPopularMovies();
  }, [currentPage]); // Depend on currentPage

  const handlePaginationClick = (page) => {
    setCurrentPage(page);
  };

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
        console.log("User profle: ", userData);
        setUserData(userData);
      } catch (error) {
        if (error.response && error.response.status === 401) {
        } else {
        }
      }
    }
    fetchData();
  }, []);

  return (
    <div className="items-center justify-center self-center">
      {/* navbar */}
      <Navbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            user={userData}
          />

      {/* section results */}
      <div className="section bg-[#0E1118] pl-12 pt-12">
        <div className="flex flex-row justify-between">
          <div className="flex justify-center items-center">
            <h1 className="pt-2 sm:pt-9 text-[12px] sm:text-[32px] font-bold text-white">
              Popular Movies
            </h1>
          </div>
        </div>
        {popularMovies.length > 0 ? ( // Check if popularMovies array is not empty
          <div className="flex flex-wrap gap-8 pt-5">
            {popularMovies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => {
                  navigate("/movie-details", { state: { id: movie.id } });
                }}
                className="relative max-w-xs bg-slate-900 rounded-lg shadow hover:bg-gray-800 transition duration-300 hover:filter hover:scale-105 cursor-pointer mr-4"
                onMouseEnter={() => setPopularHoveredMovieId(movie.id)}
                onMouseLeave={() => setPopularHoveredMovieId(null)}              >
                {popularHoveredMovieId === movie.id && (
                          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-start bg-gradient-to-t from-red-600 to-transparent text-white p-5 h-[320px] w-auto text-wrap rounded-md flex-start ">
                            <div className="flex flex-col">
                              <h3 className="text-[20px] font-bold pb-2">
                                {movie.title}
                              </h3>
                              <div className="flex flex-row items-center gap-2 text-[14px]">
                                <div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="white"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                    />
                                  </svg>
                                </div>
                                <div className="pt-1">
                                  {movie?.vote_average?.toFixed(1)} / 10 |{" "}
                                  {movie.release_date}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                {/* Display movie poster */}
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="w-[220px] h-10 sm:h-[320px] object-cover rounded-md shadow-md"
                  />
                ) : (
                  <div className="w-[220px] h-[320px] bg-black flex flex-col items-center self-center justify-center text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mb-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    NO PICTURE
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-[500px] text-white text-2xl p-24 m-10">
            <h3 className="mt-3 font-extrabold">
              OOPS! THERE ARE NO POPULAR MOVIES!
            </h3>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center pt-5 pb-5">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageClick={handlePaginationClick}
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

const Pagination = ({ currentPage, totalPages, onPageClick }) => {
  // Calculate the start and end pages to display
  let startPage = Math.max(1, currentPage - 2); // Display 2 pages before the current page
  let endPage = Math.min(totalPages, startPage + 4); // Display 5 pages in total

  // Adjust startPage and endPage to display exactly 5 pages
  if (endPage - startPage + 1 < 5) {
    startPage = Math.max(1, endPage - 4);
  }

  // Generate an array of page numbers to display
  const pages = [...Array(endPage - startPage + 1)].map(
    (_, index) => startPage + index
  );

  return (
    <ul className="flex gap-2 mb-">
      {/* Previous button */}
      <li
        className={`cursor-pointer px-3 py-1 ${
          currentPage === 1 ? "bg-gray-700 text-white" : "bg-white text-black"
        } rounded-full`}
        onClick={() => onPageClick(Math.max(1, currentPage - 1))}
      >
        Previous
      </li>
      {/* Page buttons */}
      {pages.map((page) => (
        <li
          key={page}
          className={`cursor-pointer px-3 py-1 ${
            currentPage === page
              ? "bg-white text-black"
              : "bg-gray-700 text-white"
          } rounded-full`}
          onClick={() => onPageClick(page)}
        >
          {page}
        </li>
      ))}
      {/* Next button */}
      <li
        className={`cursor-pointer px-3 py-1 ${
          currentPage === totalPages
            ? "bg-gray-700 text-white"
            : "bg-white text-black"
        } rounded-full`}
        onClick={() => onPageClick(Math.min(totalPages, currentPage + 1))}
      >
        Next
      </li>
    </ul>
  );
};

export default PopularPage;
