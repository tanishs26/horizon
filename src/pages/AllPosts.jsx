import React, { useEffect, useState } from 'react';
import supabaseStorage from '../supabase/supabase-data';
import { Container, PostCard } from '../components/import.js';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await supabaseStorage.getAllPosts();
        setPosts(data || []);
      } catch (err) {
        setError('Failed to load posts');
        console.error('Fetching posts:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!posts.length) return <div className="text-white text-center">No posts found</div>;

  return (
    <div>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post.id}>
              <PostCard
                slug={post.slug}
                title={post.title}
                featuredImage={post.featuredImage}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;