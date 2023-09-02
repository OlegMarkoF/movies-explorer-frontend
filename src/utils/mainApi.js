const API_MOVIES_URL = "http://api.nomoreparties.co";
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

export function getContent(token) {
  return fetch(`${API_MAIN_URL}/users/me`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
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

export function getCardsByOwner() {
  return fetch(`${API_MAIN_URL}/movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(checkRes);
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
  return fetch(`${API_MAIN_URL}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      country: country,
      director: director,
      duration: duration,
      year: year,
      description: description,
      image: `${API_MOVIES_URL}${image.url}`,
      trailerLink: trailerLink,
      thumbnail: `${API_MOVIES_URL}${thumbnail.url}`,
      movieId: movieId,
      nameRU: nameRU,
      nameEN: nameEN,
    }),
  }).then(checkRes);
}

export function deleteCard(moviedId) {
  return fetch(`${API_MAIN_URL}/movies/${moviedId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(checkRes);
}
