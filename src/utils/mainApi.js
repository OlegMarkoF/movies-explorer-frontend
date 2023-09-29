const API_MOVIES_URL = "https://api.nomoreparties.co";
const API_MAIN_URL = "http://markov.nomoredomains.xyz";

const checkRes = (res) => {
  return res.ok
    ? res.json()
    : res.json().then((err) => Promise.reject(`${err.message}`));
};

export function register({ password, email, name }) {
  return fetch(`${API_MAIN_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
      name,
    }),
  }).then(checkRes);
}

export function authorize({ password, email }) {
  return fetch(`${API_MAIN_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
    }),
  }).then(checkRes);
}

export function getUserInfo() {
  return fetch(`${API_MAIN_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  }).then(checkRes);
}

export function updateUserInfo(data) {
  return fetch(`${API_MAIN_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      email: data.email,
      name: data.name,
    }),
  }).then(checkRes);
}

export function getToken(token) {
  return fetch(`${API_MAIN_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then(checkRes);
}

export function getCards() {
  return fetch(`${API_MAIN_URL}/movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(checkRes);
}

export function addMovies(movie) {
  return fetch(`${API_MAIN_URL}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `${API_MOVIES_URL}${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `${API_MOVIES_URL}${movie.image.formats.thumbnail.url}`,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      movieId: movie.id,
    }),
  }).then(checkRes);
}

export function deleteCard(movieId) {
  return fetch(`${API_MAIN_URL}/movies/${movieId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(checkRes);
}

