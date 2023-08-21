import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { handleSavedStatus } from "../../utils/utils";

function MoviesCardList({
  cards,
  savedMovies,
  cardsRender,
  isNotFoundCards,
  onCardSave,
  onCardDelete,
  isLoading,
}) {
  const [cardsForRender, setCardsForRender] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/movies" && cards.length) {
      const result = cards.filter((card, item) => {
        return item < cardsRender.total;
      });
      setCardsForRender(result);
    }
  }, [location.pathname, cards, cardsRender]);

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      setCardsForRender(cards);
    }
  }, [location.pathname, cards]);

  function handleClickMoreButton() {
    const start = cardsForRender.length;
    const end = start + cardsRender.more;
    const counter = cards.length - start;
    if (counter > 0) {
      const addMoreCards = cards.slice(start, end);
      setCardsForRender([...cardsForRender, ...addMoreCards]);
    }
  }

  return (
    <section className="movies">
      {!localStorage.getItem("searchRequest") && cards.length === 0 && null}
      {isLoading && cards.length === 0 && <Preloader />}
      {isNotFoundCards && <p className="movies__info">Ничего не найдено</p>}
      {cards.length !== 0 && !isNotFoundCards && (
        <>
          <ul className={`movies__list ${cardsForRender.length > 3 ? "movies__list_space" : ""}`}>
            {cardsForRender.map((card) => (
                <MoviesCard 
                card={card} 
                key={card.id || card._id}
                isSaved={handleSavedStatus(savedMovies, card)}
                onCardSave={onCardSave}
                onCardDelete={onCardDelete} 
                />
            ))}
          </ul>
        </>
      )}
      <button className="movies__more" type="button">
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
