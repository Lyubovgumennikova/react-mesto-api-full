import React from "react";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import logo from "../images/logo.svg";

function Header({ onSignOut, loggedIn, userData, email }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      {
        loggedIn ? (
          <div className="header__link_conteiner">
            <p className="header__link header__link_email">{email}</p>
            <Link className="header__link" to="/signin" onClick={onSignOut}>
              Выйти
            </Link>
          </div>
        ) : (
          <><Route path="/signin">
              <Link className="header__link" to="/signup">
                Регистрация
              </Link>
            </Route>
            <Route path='/signup'>
                <Link className="header__link" to="/signin">
                  Войти
                </Link>
              </Route></>
        )
      }
    </header>
  );
}

export default Header;
