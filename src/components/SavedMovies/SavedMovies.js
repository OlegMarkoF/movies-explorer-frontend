import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useState } from "react";

function SavedMovies({
  savedMovies,
  isMovies,
  onCardDelete,
  isMovieSaved,
  isPreloaderActive
}) {
  const [searchResult, setSearchResult] = useState(
    localStorage.getItem("liked")
      ? JSON.parse(localStorage.getItem("liked"))
      : []
  );
  const [moviesFound, setMoviesFound] = useState(undefined);

  const handleSearchButton = (searchRequest, short) => {
    const searchResult = savedMovies.filter((item) =>
      item.nameRU.toLowerCase().includes(searchRequest.toLowerCase())
    );
    short
      ? setSearchResult(searchResult.filter((item) => item.duration <= 40))
      : setSearchResult(searchResult);
    searchResult.length > 0
      ? setMoviesFound(true)
      : setMoviesFound(false);
       
    localStorage.setItem("mySavedSearch", JSON.stringify(searchRequest));
  };

  // console.log(searchResult.length)

  return (
    <>
      <main className="saved-movies">
        <Header />
        <section className="saved-movies__main">
          <SearchForm 
          handleSearchButton={handleSearchButton}
          />
          <div className="saved-movies__list">
            <MoviesCardList
              savedMovies={savedMovies}
              isMovies={isMovies}
              isMovieSaved={isMovieSaved}
              onCardDelete={onCardDelete}
              isPreloaderActive={isPreloaderActive}
              moviesFound={moviesFound}
              movies={searchResult}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;