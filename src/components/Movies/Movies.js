import "./Movies.css";
import MoviesHeader from "../Header/MoviesHeader";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ isMovies }) {
  return (
    <div className="movies">
      <MoviesHeader />
      <main>
        {/* <SearchForm /> */}
        {/* <Preloader /> */}
        {/* <MoviesCardList isMovies={isMovies}/> */}
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
