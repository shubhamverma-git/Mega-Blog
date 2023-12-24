import React, { useState } from "react";
import authService from "../../../appwrite/auth";
import { Logo, Button, Input } from "../../../components/index";
import { login } from "../../../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const signup = async (data) => {
    setError("");
    try {
      const userData = await authService.signup(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up Here
        </h2>
        <p className="">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover: underline"
          >
            Login
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(signup)} className="mt-8">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Full Name</label>
              <Input
                id="name"
                label="Full Name:"
                placeholder="Enter Full Name"
                type="text"
                {...register("name", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /[a-zA-Z]/.test(value) || "Enter Valid Name",
                  },
                })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                label="Email:"
                placeholder="Enter Your Email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
                        value
                      ) || "Email Address must be a valid address",
                  },
                })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <Input
                id="password"
                label="Password:"
                placeholder="Enter your password"
                type="password"
                {...register("password", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                        value
                      ) ||
                      "Password must contain a Small Letter, Capital Letter and digit",
                  },
                })}
              />
            </div>
          </div>
          <Button type="submit" className="w-full flex justify-center">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
