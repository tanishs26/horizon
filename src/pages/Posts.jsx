import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import supabaseStorage from "../supabase/supabase-data";
import { Container } from "../components/import.js";
import HTMLReactParser from "html-react-parser/lib/index";

const Posts = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userid === userData.id : false;

  useEffect(() => {
    const fetchPost = async () => {
      const data = await supabaseStorage.getPost(slug);
      if (data) setPost(data);
      else navigate("/");
    };
    if (slug) fetchPost();
    else navigate("/login");
  }, [slug, navigate]);

  const deletePost = async () => {
    
    try {
      const status = await supabaseStorage.deletePost(post.slug);
      if (status && post.featuredImage) {
        const filePath = post.featuredImage.split("/").pop();
        await supabaseStorage.deleteImageFile(filePath);
      }
      navigate("/");
    } catch (error) {
      console.error("Delete post error:", error.message);
      alert("Failed to delete post");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!post) {
    return (
      <Container className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl font-semibold animate-pulse">
          Loading...
        </div>
      </Container>
    );
  }

  return (
    <div className="py-8  sm:py-12 lg:py-16 my-8 mx-5 max-w-7xl">
      <Container className=" mx-auto bg-gradient-to-br from-gray-800/50 to-blue-900/20 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 transition-all duration-500">
        {/* Featured Image */}
        <div className="w-full mb-8 flex justify-center">
          <div className="relative rounded-xl overflow-hidden max-w-full sm:max-w-3xl transition-transform duration-300 hover:scale-105">
            <img
              src={
                post.featuredImage ||
                "https://via.placeholder.com/800x400?text=No+Image"
              }
              alt={post.title}
              className="w-full h-auto object-cover rounded-xl"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/800x400?text=Image+Error")
              }
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-white mb-4 text-center sm:text-left tracking-tight">
          {post.title}
        </h1>

        <article className="prose prose-invert prose-lg max-w-5xl mx-auto text-gray-200 mb-8">
          {HTMLReactParser(post.content)}
        </article>

        <p className="text-gray-400 text-sm sm:text-base text-center sm:text-left">
          Published on {formatDate(post.created_at)}
        </p>

        {isAuthor && (
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link to={`/edit-post/${post.slug}`}>
              <button className="w-full sm:w-auto bg-cyan-500 text-white px-6 py-2 rounded-lg font-semibold text-lg hover:bg-cyan-600 active:scale-95 transition-all duration-200">
                Edit Post
              </button>
            </Link>
            <button
              onClick={deletePost}
              className="w-full sm:w-auto bg-red-500 text-white px-6 py-2 rounded-lg font-semibold text-lg hover:bg-red-600 active:scale-95 transition-all duration-200"
            >
              Delete Post
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Posts;
