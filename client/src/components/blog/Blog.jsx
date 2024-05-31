import React, { useState } from "react";
import Back from "./Back";
import BlogCard from "./BlogCard";
import "./blog.css"; // If you still need custom CSS
import "../../../src/index.css"; // If you still need global CSS

const Blog = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <>
      <Back title="News" />
      <section className="blog padding">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-8"> {/* Place the search box to the left */}
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search Blog..."
                value={searchInput}
                onChange={handleSearchInputChange}
                className="border border-gray-300 rounded-md pl-10 pr-4 py-2 w-64 focus:outline-none focus:border-blue-500"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 17l-6-6 6-6m7 12a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300 ease-in-out">Search</button> {/* Example of a search button */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BlogCard searchInput={searchInput} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
