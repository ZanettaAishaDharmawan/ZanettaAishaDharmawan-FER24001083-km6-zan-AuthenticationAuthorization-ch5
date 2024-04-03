import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function NowPlayingPage() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const API_KEY = "de1e0b98496c6434dd3e14f9554f5287";
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${currentPage}`
        );
        setNowPlayingMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching now playing movies: ", error);
      }
    };

    // Fetch now playing movies when currentPage changes
    fetchNowPlayingMovies();
  }, [currentPage]); // Depend on currentPage

  const handlePaginationClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="items-center justify-center self-center">
      {/* navbar */}
      <Navbar />

      {/* section results */}
      <div className="section bg-[#0E1118] pl-12 pt-12">
        <div className="flex flex-row justify-between">
          <div className="flex justify-center items-center">
            <h1 className="pt-2 sm:pt-9 text-[12px] sm:text-[32px] font-bold text-white">
              Now Playing Movies
            </h1>
          </div>
        </div>
        {nowPlayingMovies.length > 0 ? ( // Check if nowPlayingMovies array is not empty
          <div className="flex flex-wrap gap-8 pt-5">
            {nowPlayingMovies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => {
                  navigate("/movie-details", { state: { id: movie.id } });
                }}
                className="relative max-w-xs bg-slate-900 rounded-lg shadow hover:bg-gray-800 transition duration-300 hover:filter hover:scale-105 cursor-pointer mr-4 mb-4"
              >
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
              {" "}
              OOPS! THERE ARE NO NOW PLAYING MOVIES!
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
export default NowPlayingPage;
