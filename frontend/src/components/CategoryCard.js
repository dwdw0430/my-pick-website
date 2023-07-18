import React from "react";
import { Link } from "react-router-dom";

function CategoryCard({ category, onStartGame, id }) {
  return (
    <Link to={`/categories/${category.id}`} state={category}>
      <div className="bg-[#4A8BDF] hover:bg-blue-950 rounded-3xl shadow-md p-7 m-10 w-30 md:w-52 border-4 border-blue-950 font-inter">
        <h2 className="text-white text-3xl font-bold pb-5">{category.topic}</h2>
        <p className="text-xl text-gray-100">{category.description}</p>
      </div>
    </Link>

  );
}

export default CategoryCard;
