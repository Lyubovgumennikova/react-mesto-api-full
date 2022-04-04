import React, { useEffect, useState } from "react";

function Input ({ type, placeholder, name, maxLength, handleChange, loggedIn , ...props}) {
  const [validationMessage, setValidationMessage] = useState ("");

  useEffect(() => {
    // setInputValue(fieldsEnumeration(""));
    // setIsValid(fieldsEnumeration(false));
    setValidationMessage("");
  }, [setValidationMessage]);


  return (
    <input
      type={type}
      placeholder={placeholder}
      id={name}
      className= 'popup__input'
      // {`${
      //   validationMessage
      //     ? `popup__input`
      //     : `popup__input popup__input_auth` //popup__input_prof_name popup__input_type_error
      // }`}
      minLength="2"
      maxLength={maxLength}
      // onChange={onChange}
      onChange={e => handleChange(e.target.value)}
      value={props.value}
      // ref={inputRef}
      required
    />
  );
}

export default Input;
