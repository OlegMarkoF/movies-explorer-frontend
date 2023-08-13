import "./Movies.css";
import Header from "../Header/Header";
// import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ isMovies }) {
  return (
    <>
    <div className="movie">
      <Header />
      <main>
        <SearchForm />
        {/* <Preloader /> */}
        <MoviesCardList isMovies={isMovies}/>
      </main>
    </div>
    <Footer/>
    </>
  );
}

export default Movies;
