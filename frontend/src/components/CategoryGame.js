import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "./Header";

const CategoryGame = ({isLogged}) => {
  const location = useLocation();
  const category = location.state;
  console.log(category);

  const categoryChoices = category.choices.map((choice) =>
    choice.replace(/["[\]]/g, "")
  );
  const [currentRound, setCurrentRound] = useState([]);
  const [gameChoices, setGameChoices] = useState([]);
  const [winners, setWinners] = useState([]);
  const [finalWinner, setFinalWinner] = useState([]);

  const [roundNumber, setRoundNumber] = useState(1);
  const [gameNumber, setGameNumber] = useState(1);

  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const shuffledChoices = shuffleArray(categoryChoices);
    setGameChoices(shuffledChoices);
    setCurrentRound([shuffledChoices[0], shuffledChoices[1]]);
  }, []);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleChoiceSelection = (selectedChoice) => {
    if (gameChoices.length <= 2) {
      if (winners.length === 0) {
        setCurrentRound([selectedChoice]);
        setGameOver(true);
        setFinalWinner(selectedChoice);
      } else {
        let updatedChoice = [...winners, selectedChoice];
        setGameChoices(updatedChoice);
        setCurrentRound([updatedChoice[0], updatedChoice[1]]);
        setWinners([]);
        setRoundNumber(roundNumber + 1);
        setGameNumber(1);
      }
    } else if (gameChoices.length > 2) {
      setWinners([...winners, selectedChoice]);
      setCurrentRound([gameChoices[2], gameChoices[3]]);
      setGameChoices(gameChoices.slice(2));
      setGameNumber(gameNumber + 1);
    }
  };

  return (
    <div className="bg-[#effafd] min-h-screen font-inter">
      {!gameOver && (
        <>
          <div>
            <Header isLogged={isLogged}/>
          </div>
          <div>
            <h1 className="text-4xl m-10 font-bold">
              Round {roundNumber} - Game {gameNumber}
            </h1>
          </div>
          <div className="p-10">
            <div className="flex justify-center space-x-32">
              {currentRound.map((choice, index) => (
                <div
                  key={index}
                  onClick={() => handleChoiceSelection(choice)}
                  className=""
                >
                  <div className="rounded-lg shadow-md bg-[#4A8BDF] hover:bg-blue-900 border-4 border-blue-950 cursor-pointer px-10 py-10">
                    <div className="text-2xl font-bold mb-2 text-gray-100">{choice}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {gameOver && (
        <>
          <Header isLogged={isLogged}/>
          <div className="p-5">
            <h1 className="text-3xl underline mb-5 p-5">Your Pick Is...</h1>
            <h3 className="text-5xl font-medium">{finalWinner}</h3>
          </div>
          <div className="p-5">
            <Link to="/">
              <button
                type="button"
                className="bg-[#A0006D] hover:bg-pink-900 text-white rounded-full px-5 py-3 m-5 font-medium"
              >
                More Games
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryGame;
