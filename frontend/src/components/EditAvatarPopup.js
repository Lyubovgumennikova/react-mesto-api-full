import React, { useEffect, useRef} from "react";
import PopupWithForm from "./PopupWithForm";
// import Input from "./Input";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  setIsSubmitted,
  isSubmitted,
}) {
  // const [value, setValue] = useState ('');
  const avatarInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    onUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
  };

  useEffect(() => {
    avatarInputRef.current.value = ''
  },[isOpen]);
  
  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      setIsSubmitted={setIsSubmitted}
      isSubmitted={isSubmitted}
      isOpen={isOpen}
      onClose={onClose}
    >
      <input
        className="popup__input"
        ref={avatarInputRef}
        type="url"
        name="avatar"
        placeholder="Ссылка на изображение"
      />
      <span id="avatar-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
