import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const CreateGame = ({ isLogged, userId }) => {
  const [game, setGame] = useState({
    topic: "",
    description: "",
    choices: [],
  });

  const [newChoice, setNewChoice] = useState("");

  const handleChange = (e) => {
    setGame((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNewChoiceChange = (e) => {
    setNewChoice(e.target.value);
  };

  const handleAddChoice = () => {
    if (newChoice.trim() !== "") {
      setGame((prev) => ({
        ...prev,
        choices: [...prev.choices, newChoice],
      }));
      setNewChoice("");
    }
  };

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        topic: game.topic,
        description: game.description,
        choices: JSON.stringify(game.choices),
        username: userId,
      };
      console.log("Data to Send: ", dataToSend);
      const response = await axios.post(
        "http://localhost:5000/gamess",
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response: ", response.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(game);
  return (
    <>
    <div className="bg-[#effafd] min-h-screen font-inter">
      <Header isLogged={isLogged} />
      <div className="container mx-auto px-4 py-8 bg-[#effafd] min-h-screen">
        <h1 className="text-2xl font-semibold mb-4">Add New Game</h1>
        <div className="border-4 border-blue-950 p-7 mb-10 md:w-2/3 mx-auto bg-[#4A8BDF] rounded-full">
          <div className="mb-4">
            <label
              className="block text-black text-lg font-bold mb-2"
              htmlFor="topic"
            >
              Topic
            </label>
            <input
              id="topic"
              className="w-1/2 border-4 border-blue-950 rounded px-3 py-2 text-sm"
              type="text"
              onChange={handleChange}
              name="topic"
              placeholder="New Topic"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-black text-lg font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <input
              id="description"
              className="w-1/2 border-4 border-blue-950 rounded px-3 py-2 text-sm"
              type="text"
              onChange={handleChange}
              name="description"
              placeholder="Brief Description of Your Game"
            />
          </div>
        </div>
        <div className="border-4 border-blue-950 p-10 mb-10 md:w-2/3 mx-auto bg-[#4A8BDF] rounded-3xl">
          
          <table className="w-full mb-4">
            <thead className="mb-4">
              <tr>
                <th className="w-1/4"></th>
                <th className="text-black text-lg font-bold w-1/2">Choices</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="mb-5 font-medium text-md">
              {game.choices.map((choice, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{choice}</td>
                </tr>
              ))}
              <tr>
                <td>
                  <h1></h1>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="New Choice"
                    value={newChoice}
                    onChange={handleNewChoiceChange}
                    className="w-1/2 sm:w-full border-4 border-blue-950 rounded px-3 py-2 text-sm mt-5"
                  />
                </td>
                <td>
                  <button
                    onClick={handleAddChoice}
                    className="bg-[#A0006D] hover:bg-red-700 text-white text-sm font-semibold px-5 py-3 rounded m-5"
                  >
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <button
            onClick={handleClick}
            className="bg-[#A0006D] text-white text-sm font-semibold px-4 py-2 rounded"
          >
            Add Game
          </button>
        </div>
      </div>
      </div>
    </>
  );
};

export default CreateGame;

/*
  const handleClick = async (e) => {
    e.preventDefault();
    try {
        const dataToSend = {
            ...game,
            choices: JSON.stringify(game.choices),
        };
      await axios.post('http://localhost:5000/categories', dataToSend);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
*/
