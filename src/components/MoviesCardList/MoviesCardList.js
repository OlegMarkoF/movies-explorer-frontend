import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { handleSavedStatus } from "../../utils/utils";

function MoviesCardList({
  cards,
  savedMovies,
  isMoviesLiked,
  onCardSave,
  onCardDelete,
  foundCards,
  isLoading,
}) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [moviesCount, setMoviesCount] = useState(0);
  const [moreMoviesCount, setMoreMoviesCount] = useState(0);
  const [showMovies, setShowMovies] = useState(moviesCount);
  const location = useLocation();

  const handleScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  const handleMoviesButtonClick = () => {
    setShowMovies(showMovies + moreMoviesCount);
  };

  const hendleMoviesCounter = () => {
    if (screenWidth >= 1280) {
      setMoviesCount(12);
      setShowMovies(12);
      setMoreMoviesCount(3);
    } else if (screenWidth >= 768 && screenWidth < 1280) {
      setMoviesCount(8);
      setShowMovies(8);
      setMoreMoviesCount(2);
    } else if (screenWidth < 768) {
      setMoviesCount(5);
      setShowMovies(5);
      setMoreMoviesCount(2);
    }
  };

  useEffect(() => {
    hendleMoviesCounter();
  }, [screenWidth]);

  useEffect(() => {
    window.addEventListener("resize", handleScreenWidth);
    handleMoviesButtonClick();
    return () => {
      window.removeEventListener("resize", handleScreenWidth);
    };
  }, []);

  console.log(cards);

  return (
    <section className="movies">
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <ul className="movies__list">
            {(foundCards === false && cards.length === 0) ? (
              <><p className="movies__info">Ничего не найдено</p></>
            ) : (location.pathname === "/movies") ? (
              cards
                .slice(0, showMovies)
                .map((card) => (
                  <MoviesCard
                    card={card}
                    key={card.id || card._id}
                    isSaved={handleSavedStatus(savedMovies, card)}
                    onCardSave={onCardSave}
                    onCardDelete={onCardDelete}
                    isMoviesLiked={isMoviesLiked}
                  />
                ))
            ) : (
              cards.map((card) => (
                <MoviesCard
                  card={card}
                  key={card.id || card._id}
                  isSaved={handleSavedStatus(savedMovies, card)}
                  onCardSave={onCardSave}
                  onCardDelete={onCardDelete}
                  isMoviesLiked={isMoviesLiked}
                />
              ))
            )}
          </ul>
          {location.pathname === "/movies" && cards.length > showMovies ? (
            <button
              className="movies__more"
              type="button"
              onClick={handleMoviesButtonClick}
            >
              Ещё
            </button>
          ) : (
            ""
          )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
