import React from "react";
import Popup from "./Popup";
import Form from "./Form";

function PopupWithForm({
  name,
  onSubmit,
  children,
  isOpen,
  onClose,
  title,
  buttonText,
  isSubmitted
}) {
  // const [validationMessage, setValidationMessage] = useState ("");
  
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <h2 className="popup__text">{title}</h2>
      <Form
        name={name}
        buttonText={buttonText}
        onSubmit={onSubmit}
        isSubmitted={isSubmitted}
      >
        {children}
      </Form>
    </Popup>
  );
}

export default PopupWithForm;
