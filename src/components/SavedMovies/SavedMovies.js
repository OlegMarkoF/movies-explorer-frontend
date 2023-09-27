import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect, useState } from "react";

function SavedMovies({
  savedMovies,
  onCardDelete,
  isMovieSaved,
  isPreloaderActive,
}) {
  const [moviesFound, setMoviesFound] = useState(undefined);
  const [filteredMovies, setFilteredMovies] = useState(savedMovies || "");
  // const [savedShort, setSavedShort] = useState(false);
  const [searchResult, setSearchResult] = useState(
    localStorage.getItem("mySavedSearch")
    ? JSON.parse(localStorage.getItem("mySavedFound"))
    : []
  );

  useEffect(() => {
    const filter = savedMovies.filter((item) =>
    item.nameRU.toLowerCase().includes(searchResult)
    );
    setFilteredMovies(filter);
  }, [savedMovies, searchResult]);


  const handleSearchButton = (searchRequest, short) => {
    setSearchResult(searchRequest);
    const filteredMovies = savedMovies.filter((item) =>
    item.nameRU.toLowerCase().includes(searchRequest)
    );
    short
      ? setFilteredMovies(filteredMovies.filter((item) => item.duration <= 40))
      : setFilteredMovies(filteredMovies);
    filteredMovies.length > 0 ? setMoviesFound(true) : setMoviesFound(false);

    localStorage.setItem("mySavedFound", JSON.stringify(filteredMovies));
    localStorage.setItem("mySavedSearch", JSON.stringify(searchRequest));
  };

  return (
    <>
      <main className="saved-movies">
        <Header />
        <section className="saved-movies__main">
          <SearchForm handleSearchButton={handleSearchButton} />
          <div className="saved-movies__list">
            <MoviesCardList
              savedMovies={filteredMovies}
              isMovieSaved={isMovieSaved}
              onCardDelete={onCardDelete}
              isPreloaderActive={isPreloaderActive}
              moviesFound={moviesFound}
              // movies={searchResult}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
