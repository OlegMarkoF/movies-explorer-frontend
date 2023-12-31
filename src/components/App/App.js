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
import * as mainApi from "../../utils/mainApi";
import { movieApi } from "../../utils/moviesApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [user, setUser] = useState({});
  const [isPreloaderActive, setIsPreloaderActive] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState(
    localStorage.getItem("savedMovies")
      ? JSON.parse(localStorage.getItem("savedMovies"))
      : []
  );
  const [isInfoOpenPopup, setIsInfoOpenPopup] = useState(false);
  const [notification, setNotification] = useState({ text: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const [apiItems, setApiItems] = useState(
    localStorage.getItem("movies")
      ? JSON.parse(localStorage.getItem("movies"))
      : []
  );

  useEffect(() => {
    tokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loggedIn && (location.pathname === "/signin" || location.pathname === "/signup")) {
      navigate("/movies");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, loggedIn]);

  // получаем данные о пользователе
  useEffect(() => {
    if (loggedIn === true) {
    mainApi
      .getUserInfo()
      .then((user) => {
        setLoggedIn(true);
        setCurrentUser(user);
        getMySavedMovies(user._id);
      })
      .catch((err) => {
        console.log(err);
      })};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  
  // запрос фильмов с сервера
  const getMoviesByApi = () => {
    setIsPreloaderActive(true);
    movieApi
      .getMovies()
      .then((apiItems) => {
        if (apiItems) {
          setApiItems(apiItems);
          localStorage.setItem("movies", JSON.stringify(apiItems));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsPreloaderActive(false);
      })
  };



  // ф-ия регистрации
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
            ? setNotification({ text: "Ошибка регистрации" })
            : setNotification({ text: "Пользователь уже существует" });
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
                text: "Ошибка входа",
              })
            : setNotification({ text: "Вы ввели неправильный логин или пароль" });
        }
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("short");
    localStorage.removeItem("mySearch");
    localStorage.removeItem("myFound");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("movies");
    localStorage.clear();
    setCurrentUser({});
    setSavedMovies([]);
    setLoggedIn(false);
    navigate("/");
  };
  
  // получаем массив сохраненных фильмов
  const getMySavedMovies = (user) => {
    tokenCheck();
    mainApi
      .getCards()
      .then((res) => {
        setSavedMovies(res.filter((i) => i.owner === user));
        localStorage.setItem(
          "savedMovies",
          JSON.stringify(res.filter((i) => i.owner === user))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  // создаем массив movies
  const showCards = () => {
    if (!localStorage.getItem("movies")) {
      getMoviesByApi();
    } else {
      setApiItems(JSON.parse(localStorage.getItem("movies")));
    }
    
  };
  
  
  const onCardDelete = (movie) => {
    tokenCheck();
    mainApi
      .deleteCard(movie._id)
      .then(() => {
        setSavedMovies(savedMovies =>
          savedMovies.filter((i) => i._id !== movie._id)
        );
        localStorage.setItem(
          "savedMovies",
          JSON.stringify(savedMovies.filter((i) => i._id !== movie._id))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onCardSave = (movie) => {
    const savedCard = savedMovies.find((i) => i.movieId === movie.id);
    tokenCheck();
    (savedCard)
      ? onCardDelete(savedCard)
      : mainApi
          .addMovies(movie)
          .then((res) => {
            setSavedMovies((savedMovies) => [...savedMovies, res]);
            localStorage.setItem(
              "savedMovies",
              JSON.stringify([...savedMovies, res])
            );
          })
          .catch((err) => {
            console.log(err);
          });
  };

  // ф-ия изменения данных профиля
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
            ? setNotification({ text: "Произошла ошибка" })
            : setNotification({ text: "Пользователь уже сужествует" })
        }
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
                      isPreloaderActive={isPreloaderActive}
                      savedMovies={savedMovies}
                      onCardDelete={onCardDelete}
                      onCardSave={onCardSave}
                      showCards={showCards}
                      movies={apiItems}
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
                      onCardDelete={onCardDelete}
                      isPreloaderActive={isPreloaderActive}
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