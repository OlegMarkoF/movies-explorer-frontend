import "./SearchForm.css";
import "../FilterCheckbox/FilterCheckbox.css";
import find from "../../images/find.svg";
import glass from "../../images/magnifying_glass.svg";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


function SearchForm({ handleSearchButton, showCards }) {
  let mySearch = localStorage.getItem("mySearch");
  let mySavedSearch = localStorage.getItem("mySavedSearch");
  const location = useLocation();

  // const [mySearch, setMySearch] = useState(localStorage.getItem("mySearch")
  // ? JSON.parse(localStorage.getItem("mySearch"))
  // : "");
  // const [mySavedSearch, setMySavedSearch] = useState(localStorage.getItem("mySavedSearch")
  // ? JSON.parse(localStorage.getItem("mySavedSearch"))
  // : "");
  
  const [searchRequest, setSearchRequest] = useState("");
  const [searchError, setSearchError] = useState("");
  const [savedShort, setSavedShort] = useState(
    localStorage.getItem("savedShort")
      ? JSON.parse(localStorage.getItem("savedShort"))
      : false);
  const [short, setShort] = useState(
    localStorage.getItem("short")
      ? JSON.parse(localStorage.getItem("short"))
      : false
  );

  useEffect(() => {
    if (location.pathname === "/movies") {
      localStorage.setItem("mySearch", mySearch)
    } else {
      localStorage.setItem("mySavedSearch", mySavedSearch)
    }
  }, [location.pathname, mySearch, mySavedSearch])

  useEffect(() => {
    if (location.pathname === "/movies") {
      if (mySearch) {
        setSearchRequest(JSON.parse(mySearch));
        setShort(JSON.parse(short));
      } 
    } else {
        setSearchRequest(JSON.parse(mySavedSearch));
        setSavedShort(JSON.parse(localStorage.getItem("savedShort")));
    }
    // localStorage.setItem("savedShort", JSON.stringify(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySearch, mySavedSearch, short, savedShort]);

  // useEffect(() => {
  //   setShort(JSON.parse(localStorage.getItem("short")));
  //   setSavedShort(JSON.parse(localStorage.getItem("savedShort")));
  // }, [short, savedShort]);

  // форма поиска
  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.pathname === "/movies") {
      showCards(e);
    }
    if (!searchRequest) {
      setSearchError("Нужно ввести ключевое слово");
    } else {
      setSearchError("");
      if (location.pathname === "/movies") {
        localStorage.setItem("short", false);
        handleSearchButton(searchRequest, short);
      } else if (location.pathname === "/saved-movies") {
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
    localStorage.setItem(mySearch, value) || localStorage.setItem(mySavedSearch, value);
    
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