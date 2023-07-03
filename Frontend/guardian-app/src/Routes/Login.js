import { React, useState } from "react";
import "../Components/css/Login.css";
import Variable from "../Components/Global";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

let global = new Variable();
const url = "http://localhost:8080/login";
export default function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passValidMarker, setpassValidMarker] = useState("");
  const [emailValidmarker, setemailValidmarker] = useState("");
  const [userConformation, setuserConformation] = useState([]);
  const [result, setresult] = useState("");

  function submit() {
    let emailCheck = global.validateText("email", email);
    let passCheck = global.validateText("password", password);
    if (!emailCheck) {
      setemailValidmarker("Invalid Email");
      return;
    }
    if (!passCheck) {
      setpassValidMarker("Invalid Passowrd");
      return;
    }
    setemailValidmarker("");
    setpassValidMarker("");
    const body = { email: `${email}`, password: `${password}` };
    axios
      .post(url, { body })
      .then((res) => {
        setresult(res.data);
        if (res.data === "No user Found") {
          setuserConformation("Email or Password is Wrong");
          return;
        }
        setuserConformation("");
        if (res.data[0].Email === email && res.data[0].Password === password) {
          global.setlocalStorage("emailId", email);
          global.setlocalStorage("password", password);
          global.setlocalStorage("FirstName", res.data[0].FirstName);
          global.setlocalStorage("LastName", res.data[0].LastName);
        } else navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  return (
    <>
      {global.getlocalStorage("emailId") &&
      global.getlocalStorage("password") ? (
        <Navigate to={"/loggedIn/search"} />
      ) : (
        <form className="loginForms">
          <h2 className="text-center p-2">Welcome To Gaurdians</h2>
          <div className=" d-flex form-outline mb-4">
            <input
              type="email"
              id="form2Example1"
              className="form-control"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              placeholder="Email"
            />
          </div>
          <p className="text-danger">{emailValidmarker}</p>

          <div className="d-flex form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              className="form-control"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              placeholder="Password"
            />
          </div>
          <p className="text-danger">{passValidMarker}</p>
          <button
            type="button"
            onClick={submit}
            className="btn btn-primary btn-block mb-4 w-100"
          >
            Sign in
          </button>
          <div className="text-center">
            <p>
              Not a member? <a href="/register">Register</a>
            </p>
            <p className="text-danger">{userConformation}</p>
          </div>
        </form>
      )}
    </>
  );
}

