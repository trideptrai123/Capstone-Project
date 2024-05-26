import React from "react";

const BlogCard = ({ post, isLatestNews }) => {
  if (isLatestNews) {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{post.title}</div>
          <p className="text-gray-500 text-xs mb-2">{post.date}</p>
        </div>
      </div>
    );
  }

  if (!post || !post.cover) {
    return null;
  }

  const { cover, title, type, date, com, desc } = post;

  return (
    <div className="max-w-lg rounded overflow-hidden shadow-lg bg-white">
      <img src={cover} alt={title} className="w-full" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-500 text-base">{desc}</p>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {type}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {date}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {com}
        </span>
      </div>
    </div>
  );
};

export default BlogCard;
