import React, { useEffect, useState } from "react";
import supabaseStorage from "../supabase/supabase-data";
import { Container, PostCard } from "../components/import.js";
import ImageCarousel from "./ImageCarousel.jsx";
import { BeatLoader } from "react-spinners";
const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabaseStorage
      .getAllPosts()
      .then((data) => {
        console.log("Fetched posts:", data);
        setPosts(data || []);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error.message);
        setPosts([]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const carouselImages = posts
    .filter((post) => post.featuredImage)
    .map((post) => post.featuredImage);

  if (isLoading) {
    return (
      <Container className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl sm:text-2xl font-semibold animate-pulse">
          <h1 className="text-white text-2xl mx-auto text-center">
            Please wait
            <BeatLoader color="white" />
          </h1>
        </div>
      </Container>
    );
  }

  return (
    <Container className="  py-8 sm:py-12 max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-[100rem] ">
      {carouselImages.length > 0 && <ImageCarousel images={carouselImages} />}
      <br />
      <br />
      <br />
      <div className="mt-8 sm:mt-12">
        {posts.length === 0 ? (
          <div className="text-white text-center text-lg sm:text-xl">
            No posts found
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post) => (
              <li key={post.id} className="w-full max-w-sm mx-auto">
                <PostCard
                  slug={post.slug}
                  title={post.title}
                  featuredImage={post.featuredImage}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
};

export default HomePage;
