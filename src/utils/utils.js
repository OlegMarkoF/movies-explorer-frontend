export function durationMovie(duration) {
  const min = duration % 60;
  const hours = (duration - min) / 60;
  if (hours < 1) {
    return `${min}м`;
  } else {
    return `${hours}ч ${min}м`;
  }
}



export function getSavedStatus(savedCards, movieCard) {
  return savedCards.find((card) => {
    return card.movieId === (movieCard.id || movieCard.movieId || movieCard._id);
  });
}

// export function filterShortMovies(movies){
//   return movies.filter((item) => item.duration <= 40);
// }

export function filterMovies(movies, searchQuery) {
  const moviesQuery = movies.filter((item) => {
    const nameRU = String(item.nameRU).toLowerCase();
    const nameEN = String(item.nameEN).toLowerCase();
    const searchName = searchQuery.toLowerCase().trim();
    return (nameRU.indexOf(searchName) !== -1 || nameEN.indexOf(searchName) !== -1);
  });
  
  return moviesQuery;
};

// export function changeMovies(movies) {
//   movies.array.forEach(movie => {
//     if (movie.image) {
//       movie.image = `https://api.nomoreparties.co${movie.image.url}`
//       movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
//     }
//   });
// }