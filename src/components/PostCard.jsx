import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ id, title, content, featuredImage }) => {
  const formattedTitle = title
    ? title.charAt(0).toUpperCase() + title.slice(1)
    : 'Untitled';

  return (
    <Link
      to={`/post/${id}`}
      className="block max-w-md mx-auto bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transform transition duration-300 hover:scale-[1.02]"
    >
      {featuredImage && (
        <img
          src={featuredImage}
          alt={formattedTitle}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-5">
        <h2 className="text-2xl font-semibold text-white mb-2 line-clamp-1">
          {formattedTitle}
        </h2>
        <p className="text-gray-600 text-sm line-clamp-3">
          {content || 'No content available.'}
        </p>
      </div>
    </Link>
  );
};

export default PostCard;
