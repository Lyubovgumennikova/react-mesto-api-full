import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({
  card,
  isOpen,
  onClose,
  onCardDelete,
  setIsSubmitted,
  isSubmitted
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true)
    onCardDelete(card);
  };

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      buttonText="Да"
      // handleSubmit={handleSubmit}
      setIsSubmitted={setIsSubmitted}
      onSubmit={handleSubmit}
      isSubmitted={isSubmitted}
      isOpen={isOpen}
      onClose={onClose}
    >
    </PopupWithForm>
  );
}

export default DeleteCardPopup;
