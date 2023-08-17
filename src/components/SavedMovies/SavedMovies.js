import "./SavedMovies.css";
import Header from "../Header/Header";
// import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
// import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";

function SavedMovies({ isMovies }) {
  return (
    <>
      <main className="saved-movies">
        <Header />
        <section className="saved-movies__main">
          <SearchForm />
          {/* <Preloader /> */}
          <div className="saved-movies__list">
          <MoviesCard isMovies={isMovies}/>
          <MoviesCard isMovies={isMovies}/>
          <MoviesCard isMovies={isMovies}/>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
