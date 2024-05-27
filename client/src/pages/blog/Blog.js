import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Back from "../Back";
import BlogCard from "./BlogCard"; // Make sure you import BlogCard from the correct path
import { blog } from "../../dummydata";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBlog = blog.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const latestBlog = blog.slice(0, 5);

  return (
    <>
      <Header />
      <Back title="News" />
      <section className="bg-gray-100 py-4">
        <div className="container mx-auto flex justify-center mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 pl-10"
            />
            <svg
              className="absolute left-3 top-2 h-6 w-6 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.5 17.5l4.5 4.5"
              />
            </svg>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlog.map((post, index) => (
              <BlogCard key={index} post={post} />
            ))}
          </div>
          <aside className="lg:col-span-1">
            <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
            <ul className="space-y-4">
              {latestBlog.map((post, index) => (
                <BlogCard key={index} post={post} isLatestNews={true} />
              ))}
            </ul>
          </aside>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Blog;
