import React from "react";
import { Link } from "react-router-dom";


const PostCard = ({ id, title, featuredImage }) => {
  return (
    <Link to={`/post/${id}`}>
      <div className="bg-gray-900 w-full rounded-xl p-4 m-4">
        <img src={featuredImage} alt={title} />
        <h2 className="text-3xl">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
