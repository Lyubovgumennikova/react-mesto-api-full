import React, { useState } from "react";

function Form({
  name,
  children,
  buttonText,
  isSubmitted,
  onSubmit,
  // ...props
}) {
  const [isValid, setIsValid] = useState ('');
  // function handleFormSubmit (e) {
  //   // Запрещаем браузеру переходить по адресу формы
  //   e.preventDefault();
  //   setIsSubmitted(true)
  //   handleSubmit()
  // }
  
  return (
    <form name={name} className="popup__content" onSubmit={onSubmit} > 
      {children}
      <button type="submit" className= {`${
            isValid
              ? `popup__submit-button`
              : `popup__submit-button popup__submit-button_disabled`
          }`} >
        {isSubmitted ? "Выполняется..." : buttonText}
      </button>
    </form>
  );
}

export default Form;
//noValidate