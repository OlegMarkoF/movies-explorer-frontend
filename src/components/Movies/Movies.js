import "./Movies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect, useState } from "react";
import { movieApi } from "../../utils/moviesApi";

function Movies({
  isMovies,
  isPreloaderActive,
  savedMovies,
  onCardDelete,
  onCardSave,
}) {
  
  const [apiItems, setApiItems] = useState(
    localStorage.getItem("movies")
      ? JSON.parse(localStorage.getItem("movies"))
      : []
  );
  const [moviesFound, setMoviesFound] = useState(undefined);
  const [searchResult, setSearchResult] = useState(
    localStorage.getItem("mySearch")
      ? JSON.parse(localStorage.getItem("myFound"))
      : []
  );

  // запрос фильмов с сервера
  const getMoviesByApi = () => {
    movieApi
      .getMovies()
      .then((apiItems) => {
        if (apiItems) {
          setApiItems(apiItems);
          localStorage.setItem("movies", JSON.stringify(apiItems));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // отобразить карточки мувес
  const showCards = () => {
    if (!localStorage.getItem("movies")) {
      getMoviesByApi();
    } else {
      setApiItems(JSON.parse(localStorage.getItem("movies")));
    }
  };

  useEffect(() => {
    showSearchResult();
    localStorage.setItem("myFound", JSON.stringify(searchResult));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSearchResult]);

  // фильтр поиска
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

  // фильтр поиска по состоянию чекбокса
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

  return (
    <>
      <main className="movie">
        <Header />
        <div>
          <SearchForm
            handleSearchButton={handleSearchButton}
            showCards={showCards}
          />
          <MoviesCardList
            savedMovies={savedMovies}
            isMovies={isMovies}
            onCardDelete={onCardDelete}
            isPreloaderActive={isPreloaderActive}
            onCardSave={onCardSave}
            moviesFound={moviesFound}
            movies={searchResult}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Movies;