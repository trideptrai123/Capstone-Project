import React from "react";
import { blog } from "./dummydata";
import { dateFormat3 } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ post }) => {
  const navigate = useNavigate()
  const {
    headerImage,
    _id,
    title,
    content,
    category: { name: categoryName, updatedAt },
  } = post;
  return (
    <>
      <div onClick={() => navigate("/blog-detail/" + _id)} className="card">
        <div className="card__header">
          <img
           className="image-blog card__image"
            src={headerImage}
            alt="card__image"
            // className="card__image"
            width="600"
          />
        </div>
        <div className="card__body">
          <span className="tag tag-blue">{categoryName}</span>
          <h5 className="text-ellipsis">{title}</h5>
        </div>
        <div className="card__footer">
          <div className="user">
           
            <div className="user__info">
              <small>{dateFormat3(updatedAt)}</small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
