import React, { useEffect } from "react";

const Popup = ({isOpen, onClose, name, children }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keyup", handleEscClose);

    return () => {
      document.removeEventListener("keyup", handleEscClose);
    };
  }, [isOpen, onClose]);

  const handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <div
    className={`popup ${isOpen ? "popup_opened" : ""} popup_type_${name}`}
    onClick={handleOverlayClose}
    >
      <div
        className={`${
          name === "image"
            ? `popup__container_type_image`
            : `popup__container`
        }`}
      >
      <button
        className={`${
          name === "image"
            ? `popup__close popup__close_type_image`
            : `popup__close`
        }`}
        type="button"
        onClick={onClose}
      />
      {children}
      </div>
    </div>
  );
};

export default Popup;
