import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({isLogged}) => {

  return (
    <div>
    {!isLogged ? (
      <header className="bg-white border-black border-b-2 font-inter">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-blue-950 text-3xl font-bold hover:text-[#A0006D]">
            MyPick
        </Link>
        <ul className="flex space-x-4 ">
          <li>
          <Link to="/categories" className="text-blue-950 hover:text-[#A0006D] font-medium text-lg">
              Categories
          </Link>
          </li>

          <li>
            <Link to="/login" className="text-white bg-[#A0006D] rounded-xl px-4 py-2 font-medium text-lg">
                Log In
            </Link>
          </li>
        </ul>
      </nav>
    </header>
    ):(
      <header className="bg-white border-black border-b-2 font-inter">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3 ">
        <Link to="/" className="text-blue-950 text-3xl font-bold hover:text-[#A0006D]">
            MyPick
        </Link>
        <ul className="flex space-x-4">
          <li>
          <Link to="/categories" className="text-blue-950 hover:text-[#A0006D] font-medium text-lg">
              Categories
          </Link>
          </li>
          <li>
          <Link to="/creategame" className="text-blue-950 hover:text-[#A0006D] font-medium text-lg">
                Create Game
            </Link>
          </li>
          <li>
            <Link to="/userprofile" className="text-blue-950 hover:text-[#A0006D] font-medium text-lg">
                Profile
            </Link>
          </li>
        </ul>
      </nav>
    </header>
    )}
    </div>
  );
}

export default Header;

/*
          <li>
            <a href="/userprofile" className="text-gray-300 hover:text-white">Profile</a>
          </li>
*/

/*
          <li>
          <Link to="/creategame" className="text-blue-950 hover:text-[#A0006D] font-medium text-lg">
                Create Game
            </Link>
          </li>
          <li>
            <Link to="/userprofile" className="text-blue-950 hover:text-[#A0006D] font-medium text-lg">
                Profile
            </Link>
          </li>
          */