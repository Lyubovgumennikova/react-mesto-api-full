import React, { useState } from "react";
import Form from "./Form";

function Login({
  onLogin,
  isSubmitted,
  setIsSubmitted,
  ...props
}) {
  const [isincluded, setIsincluded] = useState( {
    email: '',
    password: '',
  })

  function handleChange(e) {
    const { name, value } = e.target;
    setIsincluded((old) => ({
      ...old,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { email, password } = isincluded;

    if (!email || !password) {
      return;
    }
    onLogin({ 
      email,  
      password,  
    });

  }

  return (
    <div className="popup__field">
      <h2 className="popup__text popup__text_auth">Вход</h2>
      <h2 className="popup__text popup__text_auth">{props.message} </h2>
      <Form
        name="Login"
        buttonText="Войти"
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          required
          name="email"
          className="popup__input popup__input_auth"
          placeholder="Email"
          maxLength="30"
          onChange={handleChange} //={setEmail}
          value={isincluded.email}
        />
        <span id="email-error" className="popup__input-error"></span>
        <input
          type="password"
          required
          name="password"
          className="popup__input popup__input_auth"
          placeholder="Пароль"
          onChange={handleChange} //={setPassword}
          value={isincluded.password}
        />
        <span id="password-error" className="popup__input-error"></span>
      </Form>
    </div>
  );
}

export default Login;
