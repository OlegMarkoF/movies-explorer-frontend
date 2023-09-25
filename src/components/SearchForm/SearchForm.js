import "./SearchForm.css";
import "../FilterCheckbox/FilterCheckbox.css";
import find from "../../images/find.svg";
import glass from "../../images/magnifying_glass.svg";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function SearchForm({ handleSearchButton, showCards }) {
  let mySearch = localStorage.getItem("mySearch");
  const location = useLocation();
  const [searchRequest, setSearchRequest] = useState("");
  const [searchError, setSearchError] = useState("");
  const [savedShort, setSavedShort] = useState(false);
  const [short, setShort] = useState(
    localStorage.getItem("short")
      ? JSON.parse(localStorage.getItem("short"))
      : false
  );

  useEffect(() => {
    if (location.pathname === "/movies") {
      if (mySearch) {
        setSearchRequest(JSON.parse(mySearch));
      }
    }
    // localStorage.setItem("savedShort", JSON.stringify(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   setShort(JSON.parse(localStorage.getItem("short")));
  //   setSavedShort(JSON.parse(localStorage.getItem("savedShort")));
  // }, []);

  // форма поиска
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchRequest) {
      setSearchError("Нужно ввести ключевое слово");
    } else {
      setSearchError(" ");
      if (location.pathname === "/movie") {
        localStorage.setItem("short", false);
        handleSearchButton(searchRequest, short);
      } else {
        localStorage.setItem("savedShort", false);
        handleSearchButton(searchRequest, savedShort);
      }
    }
  };

  // положение чекбокса
  const toggleCheckbox = () => {
    if (short) {
      setShort(false);
      handleSearchButton(searchRequest, false);
      if (location.pathname === "/movies")
      localStorage.setItem("short", JSON.stringify(false));
    } else {
      setShort(true);
      handleSearchButton(searchRequest, true);
      if (location.pathname === "/movies")
      localStorage.setItem("short", JSON.stringify(true));
    }
  };

  const toggleCheckboxSaved = () => {
    if (savedShort) {
      setSavedShort(false);
      handleSearchButton(searchRequest, false);
      if (location.pathname === "/saved-movies")
      localStorage.setItem("savedShort", JSON.stringify(false));
    } else {
      setSavedShort(true);
      handleSearchButton(searchRequest, true);
      if (location.pathname === "/saved-movies")
      localStorage.setItem("savedShort", JSON.stringify(true));
    }
  };

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchRequest(value);
    localStorage.setItem(mySearch, value);
    if (location.pathname === "/movies") {
      showCards(e);
    }
  };

  return (
    <main className="search">
      <section className="search__box">
        <form className="search__form" onSubmit={handleSubmit} type="submit" noValidate>
          <img className="search__glass" src={glass} alt="лупа" />
          <input
            className="search__input"
            placeholder="Фильм"
            name="search"
            type="search"
            onChange={handleSearchInput}
            value={searchRequest}
          />
          <button
            className="search__button"
            type="submit"
            onSubmit={handleSubmit}
          >
            <img className="search__img" src={find} alt="кнопка поиска" />
          </button>
        </form>
        <span className={"search__error search__error_active"}>
          {searchError}
        </span>
        <div className="filter">
          <label className="filter__checkbox">
            <input
              className="filter__checkbox-input"
              type="checkbox"
              value="no"
              checked={location.pathname === "/movies" ? short : savedShort}
              onChange={
                location.pathname === "/movies"
                  ? toggleCheckbox
                  : toggleCheckboxSaved
              }
            />
            <span className="filter__span"></span>
            Короткометражки
          </label>
        </div>
      </section>
    </main>
  );
}

export default SearchForm;
