import { sendRequest } from "./utils";

const API_MAIN_URL = "markov.nomoredomains.xyz";

export function register({ password, email, name }) {
    return sendRequest(API_MAIN_URL, "/signup", "POST", true, {
        password, email, name,
    });
}

export function authorize({ password, email }) {
    return sendRequest(API_MAIN_URL, "/signin", "POST", true, {
        password, email,
    });
}

export function getUserInfo() {
    return sendRequest(API_MAIN_URL, "/users/me", "GET", true);
}

export function logout() {
    return sendRequest(API_MAIN_URL, "/signout", "POST", true);
}

export function updateUserInfo({ email, name }) {
    return sendRequest(API_MAIN_URL, "/users/me", "PATCH", true, {
        email, name,
    });
}

export function getCardsByOwner() {
    return sendRequest(API_MAIN_URL, "/movies", "GET", true);
}

export function createMoviesCard({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
}) {
    return sendRequest(API_MAIN_URL, "/movies", "POST", true, {
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN, 
    });
}

export function deleteCard(id) {
    return sendRequest(API_MAIN_URL, `/movies/${id}`, "DELETE", true);
}