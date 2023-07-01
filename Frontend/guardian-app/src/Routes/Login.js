import React from 'react'
import "../Components/css/Login.css"
export default function Login() {  
    return (
    

 <form className='loginForms'>
 
 <h2 className="text-center p-2">Welcome To Gaurdians</h2>
 <div className=" d-flex form-outline mb-4">
  <input type="email" id="form2Example1" className="form-control" placeholder="Email" />
    
  </div>


  <div className="d-flex form-outline mb-4">
    <input type="password" id="form2Example2" className="form-control" placeholder="Password" />
  </div>


  <div className="row mb-4">
    <div className="col d-flex justify-content-center">
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
        <label className="form-check-label" for="form2Example31"> Remember me </label>
      </div>
    </div>
  </div>
  <button type="button" className="btn btn-primary btn-block mb-4 w-100">Sign in</button>
  <div className="text-center">
    <p>Not a member? <a href="/register">Register</a></p>
  </div>
</form>

  )
}
