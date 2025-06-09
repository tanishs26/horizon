import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Container, Logo } from "./import.js";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase/supabase-client.js";
import { useDispatch } from "react-redux";
import { signIn } from "../store/authReducer.js";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const signUpsubmit = async (data) => {
    setError("");
    try {
      const { data: session, error: authError } = await supabase.signUp({
        email: data.email,
        password: data.password,
        name: data.name,
      });
      if (authError) throw authError;
      const user = await supabase.getCurrentUser();
      if (user) {
        dispatch(signIn({ userData: user }));
        navigate("/all-posts");
      }
    } catch (error) {
      setError(error.message);
      console.log("Sign up ", error.message);
    }
  };
  return (
    <Container className="flex flex-col w-full items-center text-white">
      <div className="  max-w-[35rem] bg-gradient-to-r from-slate-600 to-slate-800 backdrop-blur-[20px] shadow-2xl rounded-2xl p-7 sm:p-10 flex flex-col justify-center items-center gap-6">
        <div className="text-center">
          <div className="scale-75 mb-2">
            <Logo />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Welcome{" "}
          </h1>
          <p className="text-m text-gray-300">
            Please sign up for your account
          </p>
        </div>

        <form
          onSubmit={handleSubmit(signUpsubmit)}
          className="flex flex-col gap-4 w-full items-center "
        >
          <div className="scale-110">
            <Input
              placeholder="Enter your name"
              label="Name "
              type="text"
              required
              {...register("name", { required: true })}
              className="text-base py-[4px] px-[1rem] rounded-md bg-transparent"
            />
          </div>
          <div className="scale-110">
            <Input
              placeholder="Enter your email"
              label="Email"
              type="email"
              required
              {...register("email", { required: true })}
              className="text-base py-[4px] px-[1rem] rounded-md bg-transparent"
            />
            {error.email && (
              <p className="text-sm text-red-400">{error.email.message}</p>
            )}
          </div>

          <div className="scale-110">
            <Input
              placeholder="Enter your password"
              label="Password"
              type="password"
              required
              {...register("password", { required: true })}
              className="text-base py-[4px] px-[1rem] rounded-md bg-transparent"
            />
            {error.password && (
              <p className="text-sm text-red-400">{error.password.message}</p>
            )}
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            className="flex items-center justify-center  bg-cyan-400 px-8 py-2 font-semibold cursor-pointer rounded-lg text-[18px] active:scale-[0.95] mt-7"
          >
            Sign Up
          </button>
        </form>
        <div>
          <h1>
            Already have an account?{" "}
            <span className="text-cyan-500 hover:underline">
              {" "}
              <Link to="/login">Log in</Link>
            </span>
          </h1>
        </div>
      </div>
    </Container>
  );
};

export default Signup;
