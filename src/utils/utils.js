export function durationMovie(duration) {
  const min = duration % 60;
  const hours = (duration - min) / 60;
  if (hours < 1) {
    return `${min}м`;
  } else {
    return `${hours}ч ${min}м`;
  }
}

export function handleSavedStatus(savedCards, movieCard) {
  return savedCards.find((card) => {
    return card.movieId === (movieCard.id || movieCard.movieId);
  });
}
