import React from 'react'
import { useNavigate, Outlet, Navigate } from 'react-router-dom'
import Variable from '../Components/Global';
let global = new Variable();
const LoggedIn = () =>{
const navigate = useNavigate(); 
  if(global.getlocalStorage("emailId") && global.getlocalStorage("password")) return <Outlet />;
  else return <Navigate to={"/"}/>;
}

export default LoggedIn