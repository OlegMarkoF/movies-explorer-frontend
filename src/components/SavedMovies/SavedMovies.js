import "./SavedMovies.css";
import MoviesHeader from "../Header/MoviesHeader";
// import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({isMovies}) {
  return (
    <>
      <div className="movies">
        <MoviesHeader />
        <main>
          <SearchForm />
          {/* <Preloader /> */}
          <MoviesCardList isMovies={isMovies} />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default SavedMovies;
