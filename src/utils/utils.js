
export function sendRequest(url, method, credentials, endpoint, body) {
  const headers = { "Content-Type": "application/json" };
  const config = { method, headers };

  if (credentials) {
    config.credentials = "include";
  }
  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }
  return fetch(`${url}${endpoint}`, config).then((res) => {
    const result = res.json();
    return res.ok
      ? result
      : result.then((err) => Promise.reject(`${err.message}`));
  });
}

export function durationMovie(duration) {
  const min = duration % 60;
  const hours = (duration - min)/60;
  if (hours < 1) {
    return `${min}м`
  } else {
    return `${hours}ч ${min}м`;
  }
}

export function handleSavedStatus(savedCards, movieCard) {
  return savedCards.find((card) => {
    return card.movieId === (movieCard.id || movieCard.movieId)
  });
}
