import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

const UserProfile = ({ isLogged, userId }) => {
  const [createdGames, setCreatedGames] = useState([]);
  //const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserGames = async () => {
      try {
        console.log(userId);
        const response = await axios.get("http://localhost:5000/profilegames", {
          params: {
            username: userId,
          },
        });
        const data = response.data;

        const formattedData = data.map((category) => ({
          id: category.id,
          topic: category.topic,
          description: category.description,
        }));
        //setId(id);
        setCreatedGames(formattedData);
        console.log(formattedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserGames();
    console.log(createdGames);
  }, []);

  return (
    <div className="bg-[#effafd] min-h-screen font-inter">
      <Header isLogged={isLogged} />
      <div className="">
        {!isLogged ? (
          <div>
            <h1>Log In to See Profile!</h1>
          </div>
        ) : (
          <div>
            <div>
              <h1 className="text-4xl m-5">User Profile</h1>
              <p className="text-2xl">Account: {userId}</p>
              <button className="mt-5 bg-[#A0006D] hover:bg-red-700 text-white px-5 py-4 rounded-full">
                Log Out
              </button>
            </div>
            <div className="container mx-auto border-4 border-blue-950 w-1/2 mt-10 p-5 bg-[#4A8BDF] rounded-3xl">
              <h1 className="text-3xl p-2 underline mb-3 font-bold">Created Games</h1>
              {createdGames.map((game) => (
                <p key={game.id} className="text-lg p-2 text-white font-medium">
                  {game.topic}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
