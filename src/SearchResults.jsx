import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function SearchResults() {
  const location = useLocation();
  const searchTermFromURL = new URLSearchParams(location.search).get("query");
  const [searchTerm, setSearchTerm] = useState(searchTermFromURL || "");
  const [searchResults, setSearchResults] = useState([]);
  const API_KEY = "de1e0b98496c6434dd3e14f9554f5287";
  const [HoveredMovieId, setHoveredMovieId] = useState(null);
  const [navbarBackground, setNavbarBackground] = useState("bg-background");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${currentPage}&include_adult=false`
        );
        setSearchResults(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching search results: ", error);
      }
    };

    // Fetch search results only if searchTerm or currentPage changes
    if (searchTerm || currentPage !== 1) {
      fetchSearchResults();
    }
  }, [searchTerm, currentPage]); // Depend on searchTerm and currentPage

  const handlePaginationClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="items-center justify-center self-center bg-[#0E1118] w-full">
      {/* navbar */}
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* section results */}
      <div className="section bg-[#0E1118] pl-12 pt-12">
        <div className="flex flex-row justify-between">
          <div className="flex justify-center items-center">
            <h1 className="pt-2 sm:pt-9 text-[12px] sm:text-[32px] font-bold text-white">
              Search Results for "{searchTerm}"
            </h1>
          </div>
        </div>
        {searchTerm && searchResults.length > 0 ? ( // Check if search term is not empty and search results exist
          <div className="flex flex-wrap gap-8 pt-5">
            {searchResults.map((movie2) => (
              <div
                key={movie2.id}
                onClick={() => {
                  navigate("/movie-details", { state: { id: movie2.id } });
                }}
                className="relative max-w-xs bg-slate-900 rounded-lg shadow hover:bg-gray-800 transition duration-300 hover:filter hover:scale-105 cursor-pointer mr-4 mb-4"
                onMouseEnter={() => setHoveredMovieId(movie2.id)}
                onMouseLeave={() => setHoveredMovieId(null)}
              >
                {movie2?.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie2.poster_path}`}
                    alt={movie2.title}
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
                {HoveredMovieId === movie2.id && (
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-start bg-gradient-to-t from-red-600 to-transparent text-white p-5 h-[320px] w-auto text-wrap rounded-md flex-start ">
                    <div className="flex flex-col">
                      <h3 className="text-[20px] font-bold pb-2">
                        {movie2.title}
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
                          {movie2?.vote_average?.toFixed(1)} / 10 |{" "}
                          {movie2.release_date}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-[500px] text-white text-2xl p-24 m-32">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              width="790"
              height="512.20805"
              viewBox="0 0 790 512.20805"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <path
                d="M925.56335,704.58909,903,636.49819s24.81818,24.81818,24.81818,45.18181l-4.45454-47.09091s12.72727,17.18182,11.45454,43.27273S925.56335,704.58909,925.56335,704.58909Z"
                transform="translate(-205 -193.89598)"
                fill="#e6e6e6"
              />
              <path
                d="M441.02093,642.58909,419,576.13509s24.22155,24.22155,24.22155,44.09565l-4.34745-45.95885s12.42131,16.76877,11.17917,42.23245S441.02093,642.58909,441.02093,642.58909Z"
                transform="translate(-205 -193.89598)"
                fill="#e6e6e6"
              />
              <path
                d="M784.72555,673.25478c.03773,43.71478-86.66489,30.26818-192.8092,30.35979s-191.53562,13.68671-191.57335-30.028,86.63317-53.29714,192.77748-53.38876S784.68782,629.54,784.72555,673.25478Z"
                transform="translate(-205 -193.89598)"
                fill="#e6e6e6"
              />
              <rect y="509.69312" width="790" height="2" fill="#3f3d56" />
              <polygon
                points="505.336 420.322 491.459 420.322 484.855 366.797 505.336 366.797 505.336 420.322"
                fill="#a0616a"
              />
              <path
                d="M480.00587,416.35743H508.3101a0,0,0,0,1,0,0V433.208a0,0,0,0,1,0,0H464.69674a0,0,0,0,1,0,0v-1.54149A15.30912,15.30912,0,0,1,480.00587,416.35743Z"
                fill="#2f2e41"
              />
              <polygon
                points="607.336 499.322 593.459 499.322 586.855 445.797 607.336 445.797 607.336 499.322"
                fill="#a0616a"
              />
              <path
                d="M582.00587,495.35743H610.3101a0,0,0,0,1,0,0V512.208a0,0,0,0,1,0,0H566.69674a0,0,0,0,1,0,0v-1.54149A15.30912,15.30912,0,0,1,582.00587,495.35743Z"
                fill="#2f2e41"
              />
              <path
                d="M876.34486,534.205A10.31591,10.31591,0,0,0,873.449,518.654l-32.23009-131.2928L820.6113,396.2276l38.33533,126.949a10.37185,10.37185,0,0,0,17.39823,11.0284Z"
                transform="translate(-205 -193.89598)"
                fill="#a0616a"
              />
              <path
                d="M851.20767,268.85955a11.38227,11.38227,0,0,0-17.41522,1.15247l-49.88538,5.72709,7.58861,19.24141,45.36779-8.49083a11.44393,11.44393,0,0,0,14.3442-17.63014Z"
                transform="translate(-205 -193.89598)"
                fill="#a0616a"
              />
              <path
                d="M769,520.58909l21.76811,163.37417,27.09338-5.578s-3.98437-118.98157,9.56238-133.32513S810,505.58909,810,505.58909Z"
                transform="translate(-205 -193.89598)"
                fill="#2f2e41"
              />
              <path
                d="M778,475.58909l-10,15s-77-31.99929-77,19-4.40631,85.60944-6,88,18.43762,8.59375,28,7c0,0,11.79687-82.21884,11-87,0,0,75.53355,37.03335,89.87712,33.84591S831.60944,536.964,834,530.58909s-1-57-1-57l-47.81-14.59036Z"
                transform="translate(-205 -193.89598)"
                fill="#2f2e41"
              />
              <path
                d="M779.34915,385.52862l-2.85032-3.42039s-31.92361-71.82815-19.3822-91.21035,67.26762-22.23252,68.97783-21.0924-4.08488,15.9428-.09446,22.78361c0,0-42.394,9.19121-45.24435,10.33134s21.96615,43.2737,21.96615,43.2737l-2.85031,25.6529Z"
                transform="translate(-205 -193.89598)"
                fill="#ccc"
              />
              <path
                d="M835.21549,350.18459S805.57217,353.605,804.432,353.605s-1.71017-7.41084-1.71017-7.41084l-26.223,35.91406S763.57961,486.29929,767,484.58909s66.50531,8.11165,67.07539,3.55114-.57008-27.3631,1.14014-28.50324,29.64328-71.82811,29.64328-71.82811-2.85032-14.82168-12.54142-19.95227S835.21549,350.18459,835.21549,350.18459Z"
                transform="translate(-205 -193.89598)"
                fill="#ccc"
              />
              <path
                d="M855.73783,378.11779l9.121,9.69109S878.41081,499.1687,871,502.58909s-22,3-22,3l-14.35458-52.79286Z"
                transform="translate(-205 -193.89598)"
                fill="#ccc"
              />
              <circle cx="601.72966" cy="122.9976" r="26.2388" fill="#a0616a" />
              <path
                d="M800.57267,320.98789c-.35442-5.44445-7.22306-5.631-12.67878-5.68255s-11.97836.14321-15.0654-4.35543c-2.0401-2.973-1.65042-7.10032.035-10.28779s4.45772-5.639,7.18508-7.99742c7.04139-6.08884,14.29842-12.12936,22.7522-16.02662s18.36045-5.472,27.12788-2.3435c10.77008,3.84307,25.32927,23.62588,26.5865,34.99176s-3.28507,22.95252-10.9419,31.44586-25.18188,5.0665-36.21069,8.088c6.7049-9.48964,2.28541-26.73258-8.45572-31.164Z"
                transform="translate(-205 -193.89598)"
                fill="#2f2e41"
              />
              <circle cx="361.7217" cy="403.5046" r="62.98931" fill="#f92020" />
              <path
                d="M524.65625,529.9355a45.15919,45.15919,0,0,1-41.25537-26.78614L383.44873,278.05757a59.83039,59.83039,0,1,1,111.87012-41.86426l72.37744,235.41211a45.07978,45.07978,0,0,1-43.04,58.33008Z"
                transform="translate(-205 -193.89598)"
                fill="#f92020"
              />
            </svg>
            <h3 className="mt-3 font-extrabold pb-4">
              {" "}
              OOPS, THERE IS NO SUCH FILM!
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

export default SearchResults;
