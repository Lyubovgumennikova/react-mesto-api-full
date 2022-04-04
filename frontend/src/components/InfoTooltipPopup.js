import React from "react";
import Popup from "./Popup";

function InfoTooltipPopup({ card, onClose, onCardClick, name }) {
  return (
    <Popup isOpen={onCardClick} name={name} onClose={onClose}>
      <figure name="image" className="popup__content-image">
        <img className="popup__mask-group" src={card.link} alt={card.name} />
        <figcaption className="popup__text-image">{card.name} </figcaption>
      </figure>
    </Popup>
  );
}

export default InfoTooltipPopup;
