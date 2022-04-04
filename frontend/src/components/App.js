import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import api from "../utils/Api";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import { Redirect, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import * as AuthApi from "../utils/AuthApi.js";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [isDeleteCardPopup, setIsDeleteCardPopup] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  // const [inputValue, setInputValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [email, setEmail] = useState("");
  const history = useHistory();
  const location = useLocation();

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (!localStorage.getItem("jwt")) {
      history.push("/signin");
      return;
    }

    AuthApi.getContent(jwt)
      .then((res) => {
        if (!res) return;

        const userData = {
          email: res.data.email,
          id: res.data._id,
        };
        // res.data.email
        setEmail(userData.email);
        setIsLoggedIn(true);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = (data) => {
    // if (!jwt) return;
    AuthApi.authorize(data.email, data.password)
      .then((jwt) => {
        if (!jwt.token)
          // const myError = new Error('please improve your code')
          return;

        localStorage.setItem("jwt", jwt.token);
        setIsLoggedIn(true);
        history.push("/users/me");
      })
      .catch((err) => setIsRegister(true))
      .finally(() => {
        setInfoTooltip(false);
      });
  };

  const handleRegister = (data) => {
    AuthApi.register(data.email, data.password)
      .then(() => {
        setInfoTooltip(true);
        setIsRegister(true);
        history.push("/signin");
      })
      .catch(
        (
          err //console.log(err)
        ) => setIsRegister(true)
      )
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    // setIsEditAvatarPopupOpen(true)
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setImagePopupOpen(true);
    setSelectedCard(card);
  };

  const handleDeleteCardPopupClick = (card) => {
    setIsDeleteCardPopup(true);
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setImagePopupOpen(false);
    setIsDeleteCardPopup(false);
    setIsRegister(false);
  };

  const handleUpdateUser = (userInfo) => {
    // setIsLoading(true);
    api
      .setUserInfo(userInfo)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsSubmitted(false);
        // setInputValue('')
        // renderLoading(false);
      });
  };

  const handleUpdateAvatar = (inputValue) => {
    // setIsLoading(true);
    api
      .setUserAvatar(inputValue)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsSubmitted(false);
      });
  };

  const handleAddPlaceSubmit = (inputValue) => {
    // setIsSubmitted(true);
    // handleSubmit: (onAddPlace) => {
    api
      .addNewCard(inputValue)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsSubmitted(false);
      });
    // }
  };

  function handleCardDelete(data) {
    // setIsLoading(true);
    api
      .deleteCard(data._id)
      .then(() => {
        const deleteCards = cards.filter((c) => c._id !== data._id);
        setCards(deleteCards);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSubmitted(false);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    history.push("/signin");
  }

  useEffect(() => {
    tokenCheck();
    const userData = [api.getUserInfo(), api.getInitialCards(), email];
    // if (!isLoggedIn) return;
    if (currentUser)
      Promise.all(userData)
        .then(([userData, items]) => {
          setCards(items);
          setCurrentUser(userData);

          history.push("/users/me");
        })
        .catch((err) => console.log(err));
  }, []);

  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route path="/signup">
            <Header />
            <Register
              onRegister={handleRegister}
              setIsRegister={setIsRegister}
            />
          </Route>
          <Route path="/signin">
            <Header />
            <Login onLogin={handleLogin} loggedIn={isLoggedIn} />
          </Route>
          <ProtectedRoute path="/users/me" loggedIn={isLoggedIn}>
            <Header
              onSignOut={onSignOut}
              loggedIn={isLoggedIn}
              // userData={userData}
              email={email}
            />
            <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCardPopupClick}
              cards={cards}
            />
            <Footer />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              isSubmitted={isSubmitted}
              setIsSubmitted={setIsSubmitted}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
              isSubmitted={isSubmitted}
              setIsSubmitted={setIsSubmitted}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              setIsSubmitted={setIsSubmitted}
              isSubmitted={isSubmitted}
            />
            <DeleteCardPopup
              isOpen={isDeleteCardPopup}
              card={selectedCard}
              onCardDelete={handleCardDelete}
              onClose={closeAllPopups}
              isSubmitted={isSubmitted}
              setIsSubmitted={setIsSubmitted}
            />
            <ImagePopup
              onCardClick={isImagePopupOpen}
              onClose={closeAllPopups}
              card={selectedCard}
              name="image"
            />
          </ProtectedRoute>
        </Switch>
      </CurrentUserContext.Provider>
      <InfoTooltip
        isOpen={isRegister}
        onClose={closeAllPopups}
        name="register"
        loggedIn={isLoggedIn}
        location={location}
        infoTooltip={infoTooltip}
        // text={text}
      />
    </div>
  );
}

export default App;
