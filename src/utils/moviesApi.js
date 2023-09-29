class moviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  _headersErr(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err) => Promise.reject(`${err.message}`));
  }

  getMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
      method: "GET",
      headers: this._headers,
    }).then(this._headersErr);
  }
}

export const movieApi = new moviesApi({
  baseUrl: "https://api.nomoreparties.co",
  headers: { "Content-Type": "application/json" },
});
