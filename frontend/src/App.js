import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';

import {Routes, Route} from 'react-router-dom';

import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import UserProfile from './pages/UserProfile';
import CreateGame from './pages/CreateGame';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import CategoryGame from './components/CategoryGame';
import CategoryDetailPage from './pages/CategoryDetailPage';



function App() {

  const [isLogged, setIsLogged] = useState(false);
  const [userId, setUserId] = useState("");

  return (
    <div className="App">
      <Routes>
        <Route path= "/" element={<CategoryPage isLogged={isLogged} userId={userId}/>} />
        <Route path= "/categories" element={<CategoryPage isLogged={isLogged} />} />
        <Route path= "/creategame" element={<CreateGame isLogged={isLogged} userId={userId}/>} />
        <Route path= "/login" element={<LogIn
         isLogged={isLogged} setIsLogged={setIsLogged} userId={userId} setUserId={setUserId}
         />} />
        <Route path= "/signup" element={<SignUp />} />
        <Route path= "/userprofile" element={<UserProfile isLogged={isLogged} userId={userId}/>} />
        <Route path= "/categories/:categoryId" element={<CategoryDetailPage isLogged={isLogged} />} />
        <Route path= "/categories/:categoryId/game" element={<CategoryGame isLogged={isLogged} />} />
      </Routes>
    </div>
  );
}

export default App;
