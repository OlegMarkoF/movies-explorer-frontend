import "./SearchForm.css";
import "../FilterCheckbox/FilterCheckbox.css";
import find from "../../images/find.svg";
import glass from "../../images/magnifying_glass.svg";
// import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function SearchForm({ handleSearchButton }) {
  let mySearch = localStorage.getItem("mySearch");
  const location = useLocation();
  const [searchRequest, setSearchRequest] = useState("");
  const [savedShort, setSavedShort] = useState(true);
  const [searchError, setSearchError] = useState("");
  const [short, setShort] = useState(
    localStorage.getItem("short")
      ? JSON.parse(localStorage.getItem("short"))
      : true
  );

  useEffect(() => {
    if (location.pathname === "/movies") {
      if (mySearch) {
        setSearchRequest(JSON.parse(mySearch));
      }
    }
    localStorage.setItem("savedShort", JSON.stringify(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setShort(JSON.parse(localStorage.getItem("short")));
    setSavedShort(JSON.parse(localStorage.getItem("savedShort")));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!searchRequest) {
      setSearchError("Нужно ввести ключевое слово");
    } else {
      setSearchError("");
      if (location.pathname === "/movie") {
        handleSearchButton(searchRequest, short);
        localStorage.getItem("short", false);
      } else {
        handleSearchButton(searchRequest, savedShort);
        localStorage.getItem("savedShort", false);
      }
    }
  }

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
      localStorage.setItem("savedShort", JSON.stringify(false));
    } else {
      setSavedShort(true);
      handleSearchButton(searchRequest, true);
      localStorage.setItem("savedShort", JSON.stringify(true));
    }
  };

  const handleSearchInput = (e) => {
    setSearchRequest(e.target.value);
  };

  return (
    <main className="search">
      <section className="search__box">
        <form className="search__form" onSubmit={handleSubmit} noValidate>
          <img className="search__glass" src={glass} alt="лупа" />
          <input
            className="search__input"
            placeholder="Фильм"
            name="search"
            type="search"
            autoComplete="off"
            autoCapitalize="off"
            // disabled={isSearching ? true : false}
            onChange={handleSearchInput}
            value={searchRequest || ""}
          />
          <button
            className="search__button"
            tipe="submit"
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
              name="toggle"
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
