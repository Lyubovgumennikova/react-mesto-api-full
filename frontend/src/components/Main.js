import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Link } from "react-router-dom";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
  // userData,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  // let { username, email} = userData;
  return (
    <main className="page__main">
      <section className="profile">
        <div className="profile__edit">
          <div
            className="profile__avatar profile__avatar-button-edit" //src={data.avatar}
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <div className="profile__info-nik">
            <h1 className="profile__info-name">{currentUser.name} </h1>
            <button
              aria-label="edit"
              type="button"
              className="profile__button-edit"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__info-job">{currentUser.about}</p>
        </div>
        <button
          aria-label="add"
          type="button"
          className="profile__button-add"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
