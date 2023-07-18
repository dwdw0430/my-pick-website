import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import CategoryCard from "../components/CategoryCard";
import CategoryGame from "../components/CategoryGame";
import axios from "axios";
import { Link } from "react-router-dom";

const CategoryPage = ({ isLogged, userId }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [id, setId] = useState("");

  const handleStartGame = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/gamess");
        const data = response.data;
        
        const formattedData = data.map((category) => ({
          id: category.id,
          topic: category.topic,
          description: category.description,
          created_by: category.created_by,
          choices: Array.isArray(category.choices)
            ? category.choices
            : JSON.parse(category.choices),
        }));

        setId(id);
        setCategories(formattedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
    console.log(categories);
  }, []);

  return (
    <>
      <Header isLogged={isLogged}/>
      <div className="bg-[#effafd] min-h-screen font-inter">
        {!isLogged ? (
          <div>
            <div className="p-5">
              <h1 className="text-4xl font-medium p-5">
                Category Games
              </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center">
              {categories.map((category, index) => (
                <CategoryCard
                  key={index}
                  category={category}
                  onStartGame={() => handleStartGame(category)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="p-5">
              <h1 className="text-4xl font-medium p-5 text-blue-950">
                Category Games for {userId}
              </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center">
              {categories.map((category, index) => (
                <CategoryCard
                  key={index}
                  category={category}
                  onStartGame={() => handleStartGame(category)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryPage;
