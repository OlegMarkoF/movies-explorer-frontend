import "./SearchForm.css";
import find from "../../images/find.svg";
import glass from "../../images/magnifying_glass.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({onFilterChange, filterOn, isSeaching}) {
  return (
    <section className="search">
      <div className="search__box">
        <form className="search__form">
          <img className="search__glass" src={glass} alt="лупа" />
          <input className="search__input" placeholder="Фильм"></input>
          <button className="search__button" tipe="submit">
            <img className="search__img" src={find} alt="кнопка поиска" />
          </button>
        </form>
        <FilterCheckbox 
          onFilterChange={onFilterChange}
          filterOn={filterOn}
          isSeaching={isSeaching}
        />
      </div>
    </section>
  );
}

export default SearchForm;
