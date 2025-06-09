import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import supabaseStorage from "../supabase/supabase-data";
import { Container, RTE } from "../components/import.js";

const PostForm = ({ post }) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      image: null,
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value.trim().toLowerCase().replace(/\s+/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const submit = async (data) => {
    try {
      console.log("UserData before submission : ", userData);
      if (!userData?.id && !post) {
        throw new Error("User not authenticated");
      }

      const slug = data.slug; // Use form's slug, set by useEffect
      console.log("Submitting post:", { title: data.title, slug, userData });

      if (post) {
        // Update existing post
        await supabaseStorage.updatePost(post.slug, {
          title: data.title,
          slug,
          content: data.content,
          featuredImage: post.featuredImage,
        });
        navigate(`/post/${slug}`);
      } else {
        // Create new post
        let imgUrl = null;
        if (data.image?.[0]) {
          const file = data.image[0];
          if (!file.type.startsWith("image/")) {
            throw new Error("Please upload a valid image file");
          }
          imgUrl = await supabaseStorage.uploadImageFile(file);
        }
        await supabaseStorage.createPost({
          title: data.title,
          slug,
          content: data.content,
          featuredImage: imgUrl,
          userid: userData.id,
        });
        navigate("/all-posts");
      }
    } catch (error) {
      console.error("Post submission error:", error.message, error);
      alert(`Failed to save post: ${error.message}`);
    }
  };

  return (
    <Container className={"w-full "}>
      <form
        onSubmit={handleSubmit(submit)}
        className="  bg-gradient-to-br from-zinc-600 to-neutral-700 rounded-2xl  sm:max-w-[3xl] px-5 max-w-full bg-amber-200  py-10"
      >
        <div className="w-full">
          <label className="block mb-1 font-semibold text-white">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold text-white">Slug</label>
          <input
            type="text"
            {...register("slug", { required: "Slug is required" })}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white opacity-70"
            readOnly
            placeholder="Auto-generated from title"
          />
          {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}
        </div>

        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={post?.content || ""}
        />
        <br />

        {!post && (
          <div>
            <label className="block mb-1 font-semibold text-white">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="w-full text-white"
            />
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
          </div>
        )}
        <br />
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-cyan-600 mx-auto"
          >
            {post ? "Update Post" : "Create Post"}
          </button>
        </div>
      </form>
    </Container>
  );
};

export default PostForm;
