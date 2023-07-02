import React from 'react'
import SearchPage from '../Components/searchPage';
import Header from "../Components/header";
import { Outlet } from 'react-router-dom';
export default function Search() {
  return (
    <>
     <Header/>
    <SearchPage/>
    <Outlet />
    </>
  )
}
