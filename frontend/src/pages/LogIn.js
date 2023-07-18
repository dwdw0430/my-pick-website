import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import CategoryPage from "./CategoryPage";

const LogIn = ({ isLogged, setIsLogged, userId, setUserId }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      console.log(username);
      await axios
        .post("http://localhost:5000/login", {
          username: username,
          password: password,
        })
        .then((response) => {
          if (response.data.message) {
            setLoginStatus(response.data.message);
            setUserId(response.data.message);
          } else {
            setLoginStatus(response.data[0].username);
            setUserId(response.data[0].username);
            setIsLoggedIn(true);
            setIsLogged(true);
            navigate("/");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:5000/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].username);
        setUserId(response.data.user[0].username);
        setIsLoggedIn(true);
        setIsLogged(true);
      }
    });
  });

  return (
    <div className="bg-[#effafd] min-h-screen font-inter">
      {!isLogged ? (
        <div>
          <Header />
          <div className="container mx-auto px-4 py-8 m-10">
            <div className="max-w-md mx-auto bg-[#4A8BDF] border-4 border-blue-950 p-6 rounded-3xl shadow-lg">
              <h1 className="text-2xl font-semibold mb-6">Log In</h1>
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
                Log In
              </button>
              <div className="mt-10 text-gray-900 flex justify-center gap-x-5">
                <div className="text-md">Don't have an account?</div>
                <div>
                  <Link to="/signup" className="text-blue-950">
                    <button
                      className="bg-[#A0006D] hover:bg-pink-900 text-white text-sm font-semibold px-4 py-2 rounded-xl"
                    >
                      Create Account
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="user-profile">
          <CategoryPage isLogged={isLogged} userId={userId} />
        </div>
      )}
    </div>
  );
};

export default LogIn;

/*
<h1 className="text-2xl font-semibold mb-4">User Profile</h1>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-lg mb-2">Welcome, {loginStatus}!</p>
              <p className="text-gray-600">Here is some information about the user...</p>
              {/* Add more user profile details and description */
