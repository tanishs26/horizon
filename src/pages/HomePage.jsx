import React, { useEffect, useState } from "react";
import supabaseStorage from "../supabase/supabase-data";
import { Container, PostForm, PostCard } from "../components/import.js";
import { div } from "framer-motion/m";
import ImageCarousel from "./ImageCarousel.jsx";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    supabaseStorage.getAllPosts().then((post) => {
      setPosts(post || []);
    });
  }, []);
  const carouselImages = posts
    .filter((post) => post.featuredImage)
    .map((post) => post.featuredImage);
  if (posts.length === 0) {
    return <Container>No Posts Found</Container>;
  } else
    return (
      <Container className={" py-8 sm:py-12"}>
        {carouselImages.length > 0 && <ImageCarousel images={carouselImages} />}
        <br />
        <br />
        <br />
        {posts.length === 0 ? (
          <div className="text-white text-center text-xl">No posts found</div>
        ) : (
          <ul className="space-y-6 w-full flex justify-center flex-wrap gap-10 ">
            {posts.map((post) => (
              <li key={post.id} className="max-w-3xl min-w-2xl ">
                <PostCard
                  slug={post.slug}
                  title={post.title}
                  featuredImage={post.featuredImage}
                />
              </li>
            ))}
          </ul>
        )}
      </Container>
    );
};

export default HomePage;
