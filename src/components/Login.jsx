import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Container, Logo } from "./import.js";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase/supabase-client.js";
import { useDispatch } from "react-redux";
import { signIn } from "../store/authReducer.js";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setError("");
    try {
      const { data: session, error: authError } = await supabase.signIn({
        email: data.email,
        password: data.password,
      });
      if (authError) throw authError;
      if (session?.user) {
        const user = await supabase.getCurrentUser();
        if (user) {
          dispatch(signIn({ userData: user }));
          navigate("/");
          console.log(user);
        }
      }
    } catch (error) {
      console.log("Login error :", error);
      setError(error.message);
    }
  };

  return (
    <Container className={"flex flex-col"}>
      <div className=" lg:w-[35rem] max-w-[40rem]   bg-gradient-to-r from-slate-700 to-slate-800 backdrop-blur-[20px] shadow-2xl rounded-2xl p-6 sm:p-10 flex flex-col justify-center items-center gap-6">
        <span className=" mb-2">
          <Logo className={"scale-75"} />
        </span>
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-m text-gray-300">Sign in to your account</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full items-center "
        >
          <div className="scale-110 mb-3">
            <Input
              placeholder="Enter your email"
              label="Email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className=" text-white text-base py-[4px] px-[1rem] rounded-md bg-transparent"
            />
            {errors.email && (
              <p className="text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div className="scale-110">
            <Input
              placeholder="Enter your password"
              label="Password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className="  text-white text-base py-[4px] px-[1rem] rounded-md bg-transparent"
            />
            {errors.password && (
              <p className="text-sm text-red-400">{errors.password.message}</p>
            )}

            {error && <p className="text-sm text-red-400">{error}</p>}
          </div>

          <button
            type="submit"
            className="flex items-center justify-center   bg-cyan-400 px-16 py-2 font-semibold cursor-pointer rounded-lg text-[18px] active:scale-[0.95] mt-7"
          >
            Sign In
          </button>
        </form>
        <div>
          <h1 className="text-white">
            Don't have an account?{" "}
            <span className="text-cyan-500 hover:underline">
              {" "}
              <Link to="/signup">Sign Up</Link>
            </span>
          </h1>
        </div>
      </div>
    </Container>
  );
};

export default Login;
