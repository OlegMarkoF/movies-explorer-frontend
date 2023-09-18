import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.css";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Preloader from "../Preloader/Preloader";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { UNAUTHORIZED, CONFLICT } from "../../utils/errors";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { movieApi } from "../../utils/moviesApi";
import * as mainApi from "../../utils/mainApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [user, setUser] = useState({});
  const [isPreloaderActive, setIsPreloaderActive] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [apiItems, setApiItems] = useState([]);
  const [isInfoOpenPopup, setIsInfoOpenPopup] = useState(false);
  const [notification, setNotification] = useState({ text: "" });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      navigate("/movies");
    }
  }, []);

  useEffect(() => {
    if (loggedIn === true) {
    mainApi
      .getUserInfo()
      .then((user) => {
        setLoggedIn(true);
        setCurrentUser(user);
        if (!localStorage.getItem("movies")) {
          getMoviesByApi();
        } else {
          setApiItems(JSON.parse(localStorage.getItem("movies")));
        }
        getMySavedMovies(user._id);
      })
      .catch((err) => {
        console.log(err);
      })};
  }, [user]);


  const handleRegister = ({ password, email, name }) => {
    setIsPreloaderActive(true);
    mainApi
      .register({ password, email, name })
      .then((res) => {
        if (res) {
          handleLogin({ password: password, email: email });
          setIsInfoOpenPopup(true);
          setNotification({ text: "Вы успешно зарегистрировались!" });
          setUser({ name: name, email: email });
        }
      })
      .catch((err) => {
        setIsPreloaderActive(false);
        setIsInfoOpenPopup(true);
        // eslint-disable-next-line no-lone-blocks
        {
          err.status === CONFLICT
            ? setNotification({ text: "Пользователь уже сужествует" })
            : setNotification({ text: "Ошибка регистрации" });
        }
      });
  };

  const handleLogin = ({ password, email }) => {
    setIsPreloaderActive(true);
    mainApi
      .authorize({ password, email })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setUser({ name: res.name, email: res.email });
          setLoggedIn(true);
          navigate("/movies");
          setIsPreloaderActive(false);
        }
      })
      .catch((err) => {
        setIsPreloaderActive(false);
        setIsInfoOpenPopup(true);
        // eslint-disable-next-line no-lone-blocks
        {
          err.status === UNAUTHORIZED
            ? setNotification({
                text: "Вы ввели неправильный логин или пароль",
              })
            : setNotification({ text: "Ошибка входа" });
        }
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("short");
    localStorage.removeItem("mySearch");
    localStorage.removeItem("myFound");
    localStorage.removeItem("cards");
    localStorage.removeItem("liked");
    localStorage.removeItem("movies");
    localStorage.clear();
    setCurrentUser({});
    setApiItems([]);
    setSavedMovies([]);
    setLoggedIn(false);
    navigate("/");
  };
  
  const getMoviesByApi = () => {
    setIsPreloaderActive(true);
    movieApi
      .getMovies()
      .then((apiItems) => {
        if (apiItems) {
          setApiItems(apiItems);
          localStorage.setItem("movies", JSON.stringify(apiItems));
          setIsPreloaderActive(false);
        } else {
          setIsInfoOpenPopup(true);
          setNotification({ text: "Ничего не найдено" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onCardSave = (card) => {
    const savedCard = savedMovies.find((i) => i.movieId === card.id);
    tokenCheck();
    savedCard
      ? onCardDelete(savedCard)
      : mainApi
          .createMoviesCard(card)
          .then((res) => {
            setSavedMovies((savedMovies) => [...savedMovies, res]);
            localStorage.setItem(
              "liked",
              JSON.stringify([...savedMovies, res])
            );
          })
          .catch((err) => {
            console.log(err);
          });
  };

  const onCardDelete = (card) => {
    tokenCheck();
    mainApi
      .deleteCard(card._id)
      .then(() => {
        setSavedMovies(savedMovies =>
          savedMovies.filter((i) => i._id !== card._id)
        );
        localStorage.setItem(
          "liked",
          JSON.stringify(savedMovies.filter((i) => i._id !== card._id))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isMoviesLiked = (movie) => {
    return savedMovies.some((i) => i.moviedId === movie.id);
  };

  const handleChangeProfile = (user) => {
    setIsPreloaderActive(true);
    tokenCheck();
    mainApi
      .updateUserInfo(user)
      .then((res) => {
        setCurrentUser(res);
        setIsPreloaderActive(false);
        setNotification({ text: "Данные изменены" });
        setIsInfoOpenPopup(true);
      })
      .catch((err) => {
        setIsPreloaderActive(false);
        setIsInfoOpenPopup(true);
        // eslint-disable-next-line no-lone-blocks
        {
          err.status === CONFLICT
            ? setNotification({ text: "Пользователь уже сужествует" })
            : setNotification({ text: "Произошла ошибка" });
        }
      });
  };

  const getMySavedMovies = (user) => {
    tokenCheck();
    mainApi
      .getCards()
      .then((res) => {
        setSavedMovies(res.filter((i) => i.owner === user));
        localStorage.setItem(
          "liked",
          JSON.stringify(res.filter((i) => i.owner === user))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closePopup = () => {
    setIsInfoOpenPopup(false);
  };


  const tokenCheck = () => {
    let token = localStorage.getItem("token");
    if (token) {
      mainApi
        .getUserInfo(token)
        .then((res) => {
          setCurrentUser(res);
          setLoggedIn(true);
          navigate(location);
        })
        .catch((err) => {
          console.log(err);
          setIsInfoOpenPopup(true);
          setNotification({ text: "Некорректный токен" });
          handleLogout();
        });
    }
  };

  return (
    <main className="page">
      {isPreloaderActive ? (
        <Preloader />
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          <section className="page__content">
            <Routes>
              <Route
                path="/signin"
                element={
                  <Login
                    loggedIn={loggedIn}
                    handleLogin={handleLogin}
                    tokenCheck={tokenCheck}
                  />
                }
              />
              <Route
                path="/signup"
                element={
                  <Register
                    loggedIn={loggedIn}
                    handleRegister={handleRegister}
                  />
                }
              />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute path="/movies" loggedIn={loggedIn}>
                    <Movies
                      apiItems={apiItems}
                      isPreloaderActive={isPreloaderActive}
                      isMovies={true}
                      isMoviesLiked={isMoviesLiked}
                      savedMovies={savedMovies}
                      onCardSave={onCardSave}
                      onCardDelete={onCardDelete}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
                    <SavedMovies
                      savedMovies={savedMovies}
                      isMoviesLiked={isMoviesLiked}
                      isMovies={false}
                      onCardDelete={onCardDelete}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute path="/profile" loggedIn={loggedIn}>
                    <Profile
                      profile={currentUser}
                      handleLogout={handleLogout}
                      handleChangeProfile={handleChangeProfile}
                    />
                  </ProtectedRoute>
                }
              />
              <Route path="/*" element={<NotFound />} />
              <Route path="/" element={<Main loggedIn={loggedIn} />} />
            </Routes>
          </section>
          <InfoTooltip
            isOpen={isInfoOpenPopup}
            onClose={closePopup}
            notification={notification}
          />
        </CurrentUserContext.Provider>
      )}
    </main>
  );
}

export default App;