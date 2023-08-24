import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useState, useEffect } from "react";

function SavedMovies({ isMovies, savedMovies, onCardSave, isMoviesLiked, onCardDelete }) {

  const [searchResult, setSearchResult] = useState(localStorage.getItem("liked") ? JSON.parse(localStorage.getItem("liked")) : []);
  const [isFilterMovies, setIsFilterMovies] = useState(undefined);

  const handleSearchSubmit = (searchRequest, card) => {
      const searchResult = savedMovies.filter((item) => item.nameRU.toLowerCase().includes(searchRequest.toLowerCase()));
      card ? setSearchResult(searchResult.filter((item) => item.duration <= 40)) : setSearchResult(searchResult);
      (searchResult.length > 0) ? setIsFilterMovies(true) : setIsFilterMovies(false);
      localStorage.setItem("mySavedSearch", JSON.stringify(searchRequest));
  }

  return (
    <>
      <main className="saved-movies">
        <Header />
        <section className="saved-movies__main">
          <SearchForm handleSearchSubmit={handleSearchSubmit}/>
          <div className="saved-movies__list">
          <MoviesCardList 
          cards={searchResult}
          savedMovies={savedMovies}
          onCardSave={onCardSave}
          />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
