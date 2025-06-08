import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import supabaseStorage from "../supabase/supabase-data";

import { RTE } from "../components/import.js";

const PostForm = ({ post }) => {
  const { register, handleSubmit, setValue, getValues, control, watch,formState: { errors }, } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const slugTransform = useCallback((value) => {
    if (value && typeof value == "string") {
      return value.trim().toLowerCase().replace(/\s+/g, "-");
    }
    return "";
  }, []);
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name == "title") {
        setValue("slug", slugTransform(value.title));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  const submit = async (data) => {


    try {

      const slug = slugTransform(data.title); 
      if (post) {
        //Update existing post
        await supabaseStorage.updatePost(post.slug, {
          title: data.title,
          slug:slug,
          content: data.content,
          featuredImage: post.featuredImage,
        });
        navigate(`/post/${post.slug}`);
      } else {
        //create new post
        let imgUrl = null;

        imgUrl = data.image?.[0]
          ? await supabaseStorage.uploadImageFile(data.image[0])
          : null;
        await supabaseStorage.createPost({
          featuredImage: imgUrl,
          content: data.content,
          title: data.title,
          slug: data.slug,
          userid: userData?.id || "",
        });
        navigate("/all-posts");
      }
    } catch (error) {
      console.error("Post submission error:", error);
      alert("Failed to save post. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-4 max-w-xl mx-auto"
    >
      <div>
        <label className="block mb-1 font-semibold text-white">Title</label>
        <input
          type="text"
          {...register("title", { required: "Title is required" })}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-semibold text-white">Slug</label>
        <input
          type="text"
          placeholder="slug "
          {...register("slug", { required: "Slug is required" })}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value));
          }}
          readOnly
        />
        {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}
      </div>
      <RTE
        label="Content"
        name="content"
        control={control}
        defaultValue={getValues("content")}
      />

      {!post && (
        <div>
          <label className="block mb-1 font-semibold text-white">
            Upload Image
          </label>
          <input
            type="file"
            {...register("image")}
            className="w-full text-white"
          />
        </div>
      )}

      <button
        type="submit"
        className="bg-cyan-500 text-white px-6 py-2 rounded hover:bg-cyan-600"
      >
        {post ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
};

export default PostForm;
