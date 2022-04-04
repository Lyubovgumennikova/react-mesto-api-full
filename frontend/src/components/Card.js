import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `element__remove-button ${
    isOwn ? "element__remove-button_active" : "element__remove-button_hidden"
  }`;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `${
    isLiked ? `element__vector element__vector_active` : `element__vector `
  }`;

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleClick = () => {
    onCardClick(card);
  };

  return (
    <article className="element">
      <button
        aria-label="remove"
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <img
        className="element__mask-group"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__rectangle">
        <h3 className="element__text">{card.name}</h3>
        <div className="element__like-container">
          <button
            aria-label="like"
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <span className="element__vector-container">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
