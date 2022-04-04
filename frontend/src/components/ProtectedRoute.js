import React from "react";
import { Route, Redirect } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const ProtectedRoute = ({loggedIn, children}) => {
  return  loggedIn
  ? children
  : <Redirect to="/signin" />
};

export default ProtectedRoute;