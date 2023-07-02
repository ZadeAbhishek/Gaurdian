import React from 'react'
import SearchPage from '../Components/searchPage';
import Header from "../Components/header";
import { Outlet } from 'react-router-dom';
import Variable from '../Components/Global';
import {useNavigate, Navigate} from 'react-router-dom';
let global = new Variable();
export default function Search() {
  return (
    <>
    <Header/>
    <SearchPage/>
    </>
  )
}
