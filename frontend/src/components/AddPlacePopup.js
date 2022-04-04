import React, { useEffect, useState } from "react";
import Input from "./Input";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  isSubmitted,
  setIsSubmitted,
}) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitted(true);
    
    onAddPlace({ 
      name,  
      link,  
    });
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="new-card"
      title="Новое место"
      buttonText="Добавить"
      isSubmitted={isSubmitted}
      setIsSubmitted={setIsSubmitted}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Input
        type="text"
        name="name"
        placeholder="Название"
        maxLength="30"
        handleChange={setName}
        value={name}
      />
      <span id="name-error" className="popup__input-error"></span>
      <Input
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        handleChange={setLink}
        value={link}
      />
      <span id="link-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
