// private Router to check if user is launched

import React from "react";
import {Outlet, Navigate } from "react-router-dom";
import Variable from "../Components/Global";
let global = new Variable();
const LoggedIn = () => {
  if (global.getlocalStorage("emailId") && global.getlocalStorage("password"))
    return <Outlet />;
  else return <Navigate to={"/"} />;
};

export default LoggedIn;
