import React from 'react'
import '../Components/css/Header.css'
import Variable from '../Components/Global';
let global = new Variable();
export default function Header() {
  function logout(){
    global.clearlocalStorage();
  }
  let FirstName = global.getlocalStorage("FirstName");
  let LastName = global.getlocalStorage("LastName");
  let name = FirstName + " " + LastName;
  return (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">GAURDIANs</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarText">
    <ul className="navbar-nav">
      <li id='userName' className="nav-item active">
        <a className="nav-link" href="/loggedIn/search/edit">{name}</a>
      </li>
    </ul>
  </div>
  <button type="button" onClick={logout} classNameName="btn btn-danger">LogOut</button>
</nav>
  )
}

