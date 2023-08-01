import "./SearchForm.css";
import find from "../../images/find.svg";

function SearchForm() {
  return (
    <section className="search">
        <div className="search__box">
            <form className="search__form">
                <input className="search__input">
                  <button className="search__button" tipe="submit">
                    <img className="search__img"src={find} alt="кнопка поиска"/>
                  </button>
                </input>
            </form>
            <div className="search__checkbox">
                <input className="search__checkbox-input" type="checkbox" value="no"/>
            </div>
        </div>
    </section>
  )
}

export default SearchForm;