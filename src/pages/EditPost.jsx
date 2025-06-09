import React, { useEffect ,useState} from "react";
import { Container, PostForm } from "../components/import.js";
import supabaseStorage from "../supabase/supabase-data.js";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const [post, setPosts] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      supabaseStorage.getPost(slug).then((post) => {
        setPosts(post || []);
      });
    } else {
      navigate("/");
    }
  }, [slug,navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
