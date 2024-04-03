import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Homepage from "./Homepage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchResults from "./SearchResults";
import MovieDetail from "./MovieDetails";
import NowPlayingPage from "./NowPlayingPage";
import PopularPage from "./PopularPage";
import TopRatedPage from "./TopRatedPage";
import LoginForm from "./Login";
import ResponsePage from "./ResponsePage";
import UserDetail from "./UserDetail";
import Users from "./Users";
import "./App.css";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/top-rated",
      element: <TopRatedPage />,
    },
    {
      path: "/search-results",
      element: <SearchResults />,
    },
    {
      path: "/movie-details",
      element: <MovieDetail />,
    },
    {
      path: "/now-playing",
      element: <NowPlayingPage />,
    },
    {
      path: "/popular",
      element: <PopularPage />,
    },
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "/response",
      element: <ResponsePage />,
    },
    {
      path: "/users",
      element: <Users />,
    },
    {
      path: "/users/:id", // Define a dynamic segment for the user ID
      element: <UserDetail />, // Render the UserDetail component
    },
  ]);
  //         <div className="relative pt-24 px-24 left-0  bg-black bg-opacity-0  text-white gap-5"></div>


  return <RouterProvider router={router} />;
}
