import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function PostsUser() {
  const [userPosts, setUserPosts] = useState([]);
  const [limit, setLimit] = useState(10); // Jumlah data per halaman
  const [skip, setSkip] = useState(0); // Data yang akan dilewati
  const [total, setTotal] = useState(0); // Total data yang tersedia
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const [totalPages, setTotalPages] = useState(1); // Total halaman

  const PostsUser = async () => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`
      );
      setUserPosts(response?.data.posts);
      setTotal(response?.data.total);
      setTotalPages(Math.ceil(response?.data.total / limit)); // Menghitung total halaman
      console.log("response", response?.data.posts);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    PostsUser();
  }, [limit, skip]);

  // Fungsi untuk mengubah halaman
  const handlePaginationClick = (page) => {
    setCurrentPage(page);
    setSkip((page - 1) * limit);
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
              Posts
            </h1>
            <div></div>
          </div>
        </div>
        {/* Render daftar post */}
        <div className="container mx-auto py-8">
          {userPosts.map((post) => (
            <div
              key={post.id}
              className="bg-[#1F2937] rounded-lg shadow-md p-6 mb-4"
            >
              <h2 className="text-xl font-bold mb-2 text-white">
                {post.title}
              </h2>
              <p className="text-gray-300 mb-4">{post.body}</p>
              <div className="flex flex-wrap">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-[#374151] text-white rounded-full px-3 py-1 mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
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
