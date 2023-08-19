
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import './App.css';

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isPreloaderActive, setIsPreloaderActive] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [saveCards, setSaveCards] = useState([]);

  return (
    <main className="page">
      <section className="page__content">
        <Routes>
          <Route path='/signin' element={<Login/>}/>
          <Route path='/signup' element={<Register/>}/>
          <Route path='/movies' element={<Movies isMovies={true} loggedIn={loggedIn}/>}/>
          <Route path='/saved-movies' element={<SavedMovies isMovies={false} loggedIn={loggedIn}/>}/>
          <Route path='/profile' element={<Profile loggedIn={loggedIn}/>}/>
          <Route path='/*' element={<NotFound/>}/>
          <Route path='/' element={<Main/> }/>
        </Routes>
      </section>
    </main>
  );
}

export default App;
