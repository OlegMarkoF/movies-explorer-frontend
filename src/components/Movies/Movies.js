import "./Movies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect, useState } from "react";

function Movies({
  isMovies,
  isMoviesLiked,
  apiItems,
  isPreloaderActive,
  savedMovies,
  onCardDelete,
  onCardSave,
}) {
  const [moviesFound, setMoviesFound] = useState(undefined);
  const [searchResult, setSearchResult] = useState(
    localStorage.getItem("mySearch")
      ? JSON.parse(localStorage.getItem("myFound"))
      : []
  );

  useEffect(() => {
    showSearchResult();
    localStorage.setItem("myFound", JSON.stringify(searchResult));
  }, [setSearchResult]);

  const showSearchResult = () => {
    if (localStorage.getItem("mySearch")) {
      setSearchResult(
        apiItems.filter((item) =>
          item.nameRU
            .toLowerCase()
            .includes(
              JSON.parse(localStorage.getItem("mySearch")).toLowerCase()
            )
        )
      );
      localStorage.setItem("myFound", JSON.stringify(searchResult));
      JSON.parse(localStorage.getItem("myFound"))
        ? setMoviesFound(true)
        : setMoviesFound(false);

      if (JSON.parse(localStorage.getItem("short")) === true) {
        const searchResult = JSON.parse(localStorage.getItem("myFound")).filter(
          (item) =>
            item.nameRU
              .toLowerCase()
              .includes(
                JSON.parse(localStorage.getItem("mySearch")).toLowerCase()
              )
        );
        setSearchResult(searchResult.filter((item) => item.duration <= 40));
        JSON.parse(localStorage.getItem("myFound"))
          ? setMoviesFound(true)
          : setMoviesFound(false);
      } else if (JSON.parse(localStorage.getItem("short")) === false) {
        const searchResult = JSON.parse(localStorage.getItem("myFound")).filter(
          (item) =>
            item.nameRU
              .toLowerCase()
              .includes(
                JSON.parse(localStorage.getItem("mySearch")).toLowerCase()
              )
        );
        setSearchResult(searchResult);
      }
    } else {
      setSearchResult([]);
    }
  };

  const handleSearchButton = (searchRequest, short) => {
    const searchResult = apiItems.filter((item) =>
      item.nameRU.toLowerCase().includes(searchRequest.toLowerCase())
    );
    short
      ? setSearchResult(searchResult.filter((item) => item.duration <= 40))
      : setSearchResult(searchResult);
    searchResult.length > 0 ? setMoviesFound(true) : setMoviesFound(false);
    localStorage.setItem("mySearch", JSON.stringify(searchRequest));
    localStorage.setItem("myFound", JSON.stringify(searchResult));
  };

  return (
    <>
      <main className="movie">
        <Header />
        <div>
          <SearchForm handleSearchButton={handleSearchButton} />
          <MoviesCardList
            movies={searchResult}
            isMovies={isMovies}
            savedMovies={savedMovies}
            isPreloaderActive={isPreloaderActive}
            isMoviesLiked={isMoviesLiked}
            onCardDelete={onCardDelete}
            onCardSave={onCardSave}
            moviesFound={moviesFound}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Movies;