import { useState } from "react"; 
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({isMovies}) {
    const [isSaved, setIsSaved] = useState(false);
    const addSaved = () => {setIsSaved(!isSaved)}

    return (
        <section className="movies">
            <ul className="movies__list">
                <MoviesCard isMovies={isMovies}/>
            </ul>
            <button className="movies__more" type="button">Ещё</button>
        </section>
    )
}

export default MoviesCardList;