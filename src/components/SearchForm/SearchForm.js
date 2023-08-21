import "./SearchForm.css";
import find from "../../images/find.svg";
import glass from "../../images/magnifying_glass.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function SearchForm({ onSearch, onFilterChange, isFilterOn, isSearching }) {
  const location = useLocation();
  const [searchRequest, setSearchRequest] = useState("");
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    if (
      location.pathname === "/movies" && localStorage.getItem("searchMovies")
    ) {
      const searchRequest = localStorage.getItem("searchMovies");
      setSearchRequest(searchRequest);
    } else if (
      location.pathname === "/saved-movies" && localStorage.getItem("searchSavedMovies")
    ) {
      const searchRequest = localStorage.getItem("searchSavedMovies");
      setSearchRequest(searchRequest);
    }
  }, [location.pathname]);

  useEffect(() => {
    setSearchError("");
  }, [searchRequest]);

  function handleSubmit(e) {
    e.preventDafault();
    if (location.pathname === "/movies") {
      searchRequest
      ? onSearch(searchRequest)
      : setSearchError ("Нужно ввести ключевое слово");
    } else {
      onSearch(searchRequest);
    }
  }

  return (
    <main className="search">
      <section className="search__box">
        <form className="search__form" onSubmit={handleSubmit} noValidate>
          <img className="search__glass" src={glass} alt="лупа" />
          <input 
          className="search__input" 
          placeholder="Фильм" 
          type="search" 
          autoComplete="off" 
          autoCapitalize="off"
          disabled={isSearching ? true : false}
          onChange={(e) => setSearchRequest(e.target.value)}
          value={searchRequest || ""}
          />
          <button className="search__button" tipe="submit">
            <img className="search__img" src={find} alt="кнопка поиска" />
          </button>
        </form>
        <FilterCheckbox 
        onFilterChange={onFilterChange}
        isFilterOn={isFilterOn}
        isSearching={isSearching}
        />
      </section>
      <span className="search__error">{searchError}</span>
    </main>
  );
}

export default SearchForm;
