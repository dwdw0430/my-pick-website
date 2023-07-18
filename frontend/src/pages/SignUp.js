import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      console.log(email);
      await axios.post("http://localhost:5000/signup", {
        username: username,
        email: email,
        password: password,
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#effafd] min-h-screen font-inter">
      <Header />
      <div className="container mx-auto px-4 py-8 m-10">
        <div className="max-w-md mx-auto bg-[#4A8BDF] border-4 border-blue-950 p-6 rounded-3xl shadow-lg">
          <h1 className="text-2xl font-semibold mb-6">Create New Account</h1>
          <div className="mb-4">
            <label
              className="block text-black text-lg font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              className="w-full border-4 border-blue-950 rounded px-3 py-2 text-sm"
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-black text-lg font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              className="w-full border-4 border-blue-950 rounded px-3 py-2 text-sm"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-black text-lg font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              className="w-full border-4 border-blue-950 rounded px-3 py-2 text-sm"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            className="bg-[#A0006D] hover:bg-pink-900 text-white text-sm font-semibold px-4 py-2 rounded-xl"
            onClick={handleClick}
          >
            Create Account
          </button>
          <div className="mt-10 text-gray-900 flex justify-center gap-x-5">
          <div className="text-md">
            Already have an account?
          </div>
          <div>
            <Link to="/login" className="text-blue-950">
              <button className="bg-[#A0006D] hover:bg-pink-900 text-white text-sm font-semibold px-4 py-2 rounded-xl">
                Log In
              </button>
            </Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
