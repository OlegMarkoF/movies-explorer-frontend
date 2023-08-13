import "./Movies.css";
import Header from "../Header/Header";
// import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ isMovies }) {
  return (
    <>
    <main className="movie">
      <Header />
      <div>
        <SearchForm />
        {/* <Preloader /> */}
        <MoviesCardList isMovies={isMovies}/>
      </div>
    </main>
    <Footer/>
    </>
  );
}

export default Movies;
