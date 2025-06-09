import React from "react";
import { Link } from "react-router-dom";


const PostCard = ({ slug, title, featuredImage }) => {
  return (
    <Link to={`/post/${slug}`}>
      <div className=" bg-gradient-to-r from-stone-700 to-stone-800 w-full rounded-xl p-4 m-4 flex flex-col ">
        <img src={featuredImage} alt={title} />
        <h2 className="text-2xl text-white mt-4">{title.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase())}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
