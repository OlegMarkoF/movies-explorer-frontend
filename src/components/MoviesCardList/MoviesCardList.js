// import { useState } from "react"; 
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
    // const [isSaved, setIsSaved] = useState(false);
    // const addSaved = () => {setIsSaved(!isSaved)}

    return (
        <section className="movies">
            <ul className="movies__list">
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
            </ul>
            <button className="movies__more" type="button">Ещё</button>
        </section>
    )
}

export default MoviesCardList;