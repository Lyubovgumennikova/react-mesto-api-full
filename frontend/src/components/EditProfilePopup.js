import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isSubmitted,
  setIsSubmitted,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    setIsSubmitted(true);
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      // handleSubmit={handleSubmit}
      setIsSubmitted={setIsSubmitted}
      isSubmitted={isSubmitted}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Input
        type="text"
        name="nik"
        placeholder="Имя"
        maxLength="40"
        value={name || ""}
        handleChange={setName}
      />
      <span id="nik-error" className="popup__input-error"></span>
      <Input
        type="text"
        name="job"
        placeholder="Занятие"
        maxLength="200"
        value={description || ""}
        handleChange={setDescription}
      />
      <span id="job-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
