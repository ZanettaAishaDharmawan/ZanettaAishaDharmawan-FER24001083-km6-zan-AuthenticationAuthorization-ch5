import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import pic1 from "./assets/slide1.png";
import pic2 from "./assets/slide2.png";
import pic3 from "./assets/slide3.png";
import StrangerThings from "./assets/StrangerThings.png";
import star from "./assets/star.png";
import "./Homepage.css"; // Import CSS file for custom styles
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function Homepage() {
  const [navbarBackground, setNavbarBackground] = useState("bg-background");
  const API_KEY = "de1e0b98496c6434dd3e14f9554f5287";
  const navigate = useNavigate();
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularHoveredMovieId, setPopularHoveredMovieId] = useState(null);
  const [nowPlayingHoveredMovieId, setNowPlayingHoveredMovieId] =
    useState(null);
  const [topRatedHoveredMovieId, setTopRatedHoveredMovieId] = useState(null);
  const searchTermFromURL = new URLSearchParams(location.search).get("query");
  const [searchTerm, setSearchTerm] = useState(searchTermFromURL || "");

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&include_adult=false&api_key=${API_KEY}`,
          { headers: { accept: "application/json" } }
        );
        setPopularMovies(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        console.error("Error fetching popular movies data", error);
      }
    };

    const fetchNowPlayingMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${API_KEY}`,
          { headers: { accept: "application/json" } }
        );
        setNowPlayingMovies(response.data.results);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching now playing movies data", error);
      }
    };

    const fetchTopRatedMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`,
          { headers: { accept: "application/json" } }
        );
        setTopRatedMovies(response.data.results);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching top rated movies data", error);
      }
    };

    fetchPopularMovies();
    fetchNowPlayingMovies();
    fetchTopRatedMovies();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setNavbarBackground("bg-black bg-opacity-75");
      } else {
        setNavbarBackground("bg-background");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [user, setUser] = useState("");

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
    <div className="items-center justify-center self-center">
      {/* navbar */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        user={user}
      />

      <div className="relative">
        <img src={StrangerThings} alt="Hero" className="w-full z-0" />
        <div className="absolute top-[25vh] sm:top-[70vh] left-0 transform -translate-y-1/2 bg-black bg-opacity-0 px-12 text-white gap-5">
          <h1 className="pt-2 sm:pt-5 text-[12px] sm:text-[20px]">
            Drama | Thriller | Supernatural
          </h1>
          <h1 className="pt-2 sm:pt-3  text-white text-[32px] sm:text-[64px] font-extrabold">
            Stranger Things
          </h1>
          <h1 className="pt-2 sm:pt-5  text-[12px] sm:text-[20px]">
            2019 | DIRECTOR: Shawn Levy | seasons: 3 (5 Episodes)
          </h1>
          <h1 className="w-[400px] sm:w-[700px] text-wrap pt-2 sm:pt-5  text-[12px] sm:text-[16px]">
            {" "}
            In 1980s Indiana, a group of young friends witness supernatural
            forces and secret government exploits. As they search for answers,
            the children unravel a series of extraordinary mysteries.
          </h1>
          <div>
            <img
              src={star}
              alt="Hertaro"
              className="h-[45px] sm:h-12 pt-5 z-0"
            />
          </div>
          <div className="flex flex-row pt-5 gap-5">
            <button className="flex flex-row bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-8 rounded gap-2">
              Stream Now
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
                  d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                />
              </svg>
            </button>
            <button className="bg-transparent hover:bg-red-500 text-white font-semibold py-2 px-4 border border-white hover:border-transparent rounded">
              All Episodes
            </button>
          </div>
          <h1 className="pt-2 sm:pt-11 text-[12px] sm:text-[18px] font-bold">
            POPULAR MOVIES
          </h1>
          <div className=" section w-[1900px] mx-auto pb-5 pt-0">
            <div className="section-scroll-container overflow-x-auto overflow-y-hidden whitespace-nowrap py-5">
              <div className="scrolling-wrapper-flexbox flex  pr-72">
                {popularMovies.map((movie) => (
                  <div
                    key={movie.id}
                    onClick={() => {
                      navigate("/movie-details", { state: { id: movie.id } });
                    }}
                    className="relative max-w-xs bg-slate-900 rounded-lg shadow hover:bg-gray-800 transition duration-300 hover:filter hover:scale-105 cursor-pointer mr-4"
                    onMouseEnter={() => setPopularHoveredMovieId(movie.id)}
                    onMouseLeave={() => setPopularHoveredMovieId(null)}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-10 sm:h-[320px] object-cover rounded-md shadow-md"
                    />
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* section 1 */}
      <div className="section bg-[#0E1118] px-12">
        <div className="flex flex-row justify-between">
          <div className="flex justify-center items-center">
            <h1 className="pt-2 sm:pt-9 text-[12px] sm:text-[18px] font-bold text-white">
              NOW PLAYING MOVIES
            </h1>
          </div>
          <div className="flex justify-center items-center">
            <a
              href="/now-playing"
              className="pt-2 sm:pt-9 text-[10px] sm:text-[16px] font-medium text-red-500 underline"
            >
              view all
            </a>
          </div>
        </div>
        <div className="section-scroll-container overflow-x-auto overflow-y-hidden whitespace-nowrap py-5 px-1">
          <div className="scrolling-wrapper-flexbox flex">
            <div className="scrolling-wrapper-flexbox flex">
              {nowPlayingMovies.map((movie2) => (
                <div
                  key={movie2.id}
                  onClick={() => {
                    navigate("/movie-details", { state: { id: movie2.id } });
                  }}
                  className="relative max-w-xs bg-slate-900 rounded-lg shadow hover:bg-gray-800 transition duration-300 hover:filter hover:scale-105 cursor-pointer mr-4"
                  onMouseEnter={() => setNowPlayingHoveredMovieId(movie2.id)}
                  onMouseLeave={() => setNowPlayingHoveredMovieId(null)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie2.poster_path}`}
                    alt={movie2.title}
                    className="w-full h-10 sm:h-[320px] object-cover rounded-md shadow-md"
                  />
                  {nowPlayingHoveredMovieId === movie2.id && (
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
          </div>
        </div>
      </div>

      {/* section 2 */}
      <div className="section bg-[#0E1118] px-12">
        <div className="flex flex-row justify-between">
          <div className="flex justify-center items-center">
            <h1 className="pt-2 sm:pt-9 text-[12px] sm:text-[18px] font-bold text-white">
              TOP RATED MOVIES
            </h1>
          </div>
          <div className="flex justify-center items-center">
            <a
              href="/top-rated"
              className="pt-2 sm:pt-9 text-[10px] sm:text-[16px] font-medium text-red-500 underline"
            >
              view all
            </a>
          </div>
        </div>

        <div className="section-scroll-container overflow-x-auto overflow-y-hidden whitespace-nowrap py-5 px-1">
          <div className="scrolling-wrapper-flexbox flex">
            <div className="scrolling-wrapper-flexbox flex">
              {topRatedMovies.map((movie2) => (
                <div
                  key={movie2.id}
                  onClick={() => {
                    navigate("/movie-details", { state: { id: movie2.id } });
                  }}
                  className="relative max-w-xs bg-slate-900 rounded-lg shadow hover:bg-gray-800 transition duration-300 hover:filter hover:scale-105 cursor-pointer mr-4"
                  onMouseEnter={() => setTopRatedHoveredMovieId(movie2.id)}
                  onMouseLeave={() => setTopRatedHoveredMovieId(null)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie2.poster_path}`}
                    alt={movie2.title}
                    className="w-full h-10 sm:h-[320px] object-cover rounded-md shadow-md"
                  />
                  {topRatedHoveredMovieId === movie2.id && (
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
