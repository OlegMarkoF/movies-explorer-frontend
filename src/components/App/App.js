import './App.css';

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
// import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="page">
      <div className="page__content">
        <Routes>
          <Route path='/signin' element={<Login/>}/>
          <Route path='/signup' element={<Register/>}/>
          <Route path='/movies' element={<Movies isMovies={true}/>}/>
          {/* <Route path='/saved-movies' element={<SavedMovies isMovies={false}/>}/> */}
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/notfound' element={<NotFound/>}/>
          <Route path='/' element={<Main/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
