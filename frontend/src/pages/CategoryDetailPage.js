import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import CategoryCard from "../components/CategoryCard";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const CategoryDetailPage = ({ isLogged }) => {
  const { categoryId } = useParams();
  const location = useLocation();
  const categoryData = location.state;
  console.log(categoryData);

  /*
  useEffect(() => {
    setTopic(category.topic);
    setDescription(category.description);
    setCreatedBy(category.created_by);
  }, []);
  */

  const handleStartGame = () => {};

  return (
    <>
    <div className="bg-[#effafd] min-h-screen font-inter">
      <Header isLogged={isLogged} />
      
        <div className="bg-[#4A8BDF] border-4 border-blue-950 p-6 max-w-md mx-auto m-10 rounded-3xl">
          <div className="">
            <h1 className="text-4xl p-5 text-black font-semibold">{categoryData.topic}</h1>
            <p className="text-xl text-black font-medium">{categoryData.description}</p>
          </div>
          {categoryData && (
            <div>
              <div>
                <Link to="/categories/:categoryId/game" state={categoryData}>
                  <button
                    type="button"
                    className="bg-[#A0006D] hover:bg-red-900 text-white rounded-full px-5 py-3 m-5 font-medium"
                  >
                    Start
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryDetailPage;

/*
          <div>
            {selectedCategory ? (
              <CategoryGame category={selectedCategory} />
            ) : (
              <div>
                {categories.map((category, index) => (
                  <CategoryCard
                    key={index}
                    category={category}
                    onStartGame={() => handleStartGame(category)}
                  />
                ))}
              </div>
            )}
          </div>
          */
