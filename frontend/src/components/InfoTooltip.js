import React from "react";
import Popup from "./Popup";
import UnionV from "../images/UnionV.svg";
import UnionX from "../images/UnionX.svg";

function InfoTooltip({
  name,
  isOpen,
  onClose,
  infoTooltip,
  src,
  ...props
  }) {

  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <figure name={name} className="popup__register">
        <img
          className="popup__image-register"
          src={infoTooltip ? (src = UnionV) : (src = UnionX)}
          alt={name}
        />
        <figcaption className="popup__text">
          {infoTooltip
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </figcaption>
      </figure>
    </Popup>
  );
}

export default InfoTooltip;