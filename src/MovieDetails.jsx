import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const API_KEY = "de1e0b98496c6434dd3e14f9554f5287";

export default function MovieDetail() {
  const navigate = useNavigate();
  let location = useLocation();
  const [detail, setDetail] = useState([]);
  const searchTermFromURL = new URLSearchParams(location.search).get("query");
  const [searchTerm, setSearchTerm] = useState(searchTermFromURL || "");
  const [reviews, setReviews] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${location.state.id}?language=en-US&api_key=${API_KEY}`
        );
        setDetail(response.data);
      } catch (error) {
        console.error("Error fetching movie detail: ", error);
      }
    };

    const fetchMovieReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${location.state.id}/reviews?language=en-US&page=1&api_key=${API_KEY}`
        );
        setReviews(response.data.results);
      } catch (error) {
        console.error("Error fetching movie reviews: ", error);
      }
    };

    const fetchMovieVideos = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${location.state.id}/videos?language=en-US&api_key=${API_KEY}`
        );
        setVideos(response.data.results);
      } catch (error) {
        console.error("Error fetching movie videos: ", error);
      }
    };

    fetchMovieDetail();
    fetchMovieReviews();
    fetchMovieVideos();
  }, [location.state.id]);

  // useEffect(() => {
  //   console.log("location ", location);
  //   detailMovies();
  // }, []);
  return (
    <div className="">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="bg-no-repeat bg-white-auto justify-around w-full">
        <div className="text-white relative" key={detail?.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${detail?.backdrop_path}`}
            alt={detail?.title}
            className="w-full h-[450px] object-cover"
          />
          {detail?.backdrop_path ? (
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black"></div>
          ) : (
            <div className="absolute top-0 left-0 w-full h-full bg-black flex flex-col items-center self-center justify-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-24 h-24 mb-3"
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

          <div className="absolute top-64 left-8 p-4">
            <h2 className="text-7xl font-semibold mb-2">{detail?.title}</h2>
          </div>
        </div>
      </div>
      <div
        className="text-black font-sans bg-base-200 rounded-xl shadow-lg p-10 justify-around"
        key={detail?.id}
      >
        <div className="flex flex-1 pl-3">
          {detail?.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500/${detail?.poster_path}`}
              alt={detail?.title}
              className="w-[500px] h-[800px] rounded-lg object-cover"
            />
          ) : (
            <div className="w-[400px] h-[500px] border rounded-lg bg-black flex flex-col items-center self-center justify-center text-white">
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

          <div className="flex flex-col ml-4 pl-8  w-[800px] pt-10">
            <div className="flex flex-wrap gap-2">
              {detail?.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="inline-block bg-gray-200 rounded-full px-5 py-2 text-md font-semibold text-gray-700"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <div className="flex flex-row my-3 border-b-2 border-t-2 pt-">
              <div className="flex flex-col p-6 bg-gray-200 m-3 border rounded-3xl shadow-md hover:bg-slate-400">
                <div className="flex flex-row justify-center items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="gray-700"
                    viewBox="0 0 26 26"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                  <div className="text-3xl font-bold">
                    {detail?.vote_average?.toFixed(1)}{" "}
                  </div>
                </div>

                <div className="self-center pt-[9px]">
                  {detail?.vote_count} votes{" "}
                </div>
              </div>

              <div className="flex flex-col p-6 bg-gray-200 m-3 border rounded-3xl shadow-md hover:bg-slate-400">
                <div className="flex flex-row justify-center items-center p-">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 28 28"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>

                  <div className="text-3xl font-bold pb-3">
                    {detail?.original_language}
                  </div>
                </div>

                <div className="self-center">Language</div>
              </div>

              <div className="flex flex-col p-6 bg-gray-200 m-3 border rounded-3xl shadow-md hover:bg-slate-400">
                <div className="flex flex-row justify-center items-center p-">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 26 26"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 pb-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>

                  <div className="text-3xl font-bold pb-3">
                    {detail?.runtime}
                  </div>
                </div>

                <div className="self-center">Minutes</div>
              </div>
              <div className="flex flex-col p-6 bg-gray-200 m-3 border rounded-3xl shadow-md hover:bg-slate-400">
                <div className="flex flex-row justify-center items-center p-">
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
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                    />
                  </svg>

                  <div className="text-3xl font-bold pb-1 pl-3">
                    {detail?.release_date}
                  </div>
                </div>

                <div className="self-center pt-2">Release Date</div>
              </div>
            </div>
            <p className="text-3xl font-bold mb-3 pt-3  pb-3">Overview</p>
            <p className="text-lg mb-3  pb-3 w-[600px]">{detail?.overview}</p>
            <p className="border-b-2 pb-3 w-[770px]"></p>

            <div>
              <p className="text-3xl font-bold mb-3 pt-3  pb-3">Videos</p>

              <div style={{ overflowX: "auto" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  {videos.map((video) => (
                    <div
                      key={video.id}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center", // Center horizontally
                        marginRight: "20px",
                        transition: "margin-right 0.5s ease-in-out",
                      }}
                      className="container bg-slate-100 rounded-md pb-3"
                    >
                      <iframe
                        title={video.name}
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${video.key}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                      <h3 className="text-2xl font-semibold  pt-5 pb-3">
                        {video.name}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-3xl font-bold mb-3 pt-3  border-t-2  pb-3 mt-6">
              Reviews
            </p>
            <div className="container card flex flex-row rounded-md">
              <div className="card-body pt-3 rounded-lg gap-2 overflow-x-auto">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="review bg-gray-200 gap-24 p-3 mb-3 rounded-md"
                  >
                    <h4 className="text-xl font-bold">{review.author}</h4>
                    <p>Rating: {review.author_details.rating}/10</p>
                    <p>"{review.content.substring(0, 150)}..."</p>
                    <a
                      href={review.url}
                      className="btn btn-primary underline pt-5"
                    >
                      Read More
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
