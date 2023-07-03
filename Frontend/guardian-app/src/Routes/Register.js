// Registration foem
// stil need improvements

import { React, useState } from "react";
import "../Components/css/Register.css";
import Variable from "../Components/Global";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
let global = new Variable();
let index = 0;
export default function Register() {
  const navigate = useNavigate();
  const [FirstName, setFirstName] = useState("");
  const [Lastname, setLastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phoneNo, setphoneNo] = useState("");
  const [MedicalCondition, setMedicalCondition] = useState("");
  const [Medicines, setMedicines] = useState("");
  const [EmergencyCo, setEmergencyCo] = useState("");
  const [FirstNameInvalid, setFirstNameInvalid] = useState("");
  const [LastnameInvalid, setLastnameInvalid] = useState("");
  const [emailInvalid, setemailInvalid] = useState("");
  const [passwordInvalid, setpasswordInvalid] = useState("");
  const [phoneNoInvalid, setphoneNoInvalid] = useState("");
  const [EmergencyCoInvalid, setEmergencyCoInvalid] = useState("");
  const [FinalMsg, setFinalMsg] = useState("");
  function next(e) {
    e.preventDefault();
    if (index === 0) {
      if (!global.validateText("email", email)) {
        console.log("Email");
        setemailInvalid("Invalid Name");
        return;
      }
      if (!global.validateText("password", password)) {
        setpasswordInvalid("6-20 Chareactor 1 upper 1 lower 1 special");
        return;
      }
      if (!global.validateText("name", FirstName)) {
        setFirstNameInvalid("Invalid First name");
        return;
      }
      if (!global.validateText("name", Lastname)) {
        setLastnameInvalid("Invalid Last name");
        return;
      }
      if (!global.validateText("phone", phoneNo)) {
        setphoneNoInvalid("Invalid Phone no");
        return;
      }
    }

    if (index === 2) {
      if (!global.validateText("phone", EmergencyCo)) {
        setEmergencyCoInvalid("Invalid No");
        return;
      }
    }
    index++;
    if (index > 3) index = 3;
    setemailInvalid("");
    setpasswordInvalid("");
    setFirstNameInvalid("");
    setLastnameInvalid("");
    setphoneNoInvalid("");
    setEmergencyCoInvalid("");
    changeWindow();
  }
  function prev(e) {
    e.preventDefault();
    index--;
    if (index < 0) index = 0;
    changeWindow();
  }
  function changeWindow() {
    let step1 = document.getElementById("step1");
    let step2 = document.getElementById("step2");
    let step3 = document.getElementById("step3");
    let step4 = document.getElementById("step4");
    let next = document.getElementById("next");
    let prev = document.getElementById("prev");
    let submit = document.getElementById("submit");

    if (index === 0) {
      step1.style.opacity = "100";
      step2.style.opacity = "0";
      step3.style.opacity = "0";
      step4.style.opacity = "0";
      step1.style.visibility = "visible";
      step2.style.visibility = "hidden";
      step3.style.visibility = "hidden";
      step4.style.visibility = "hidden";
      next.style.visibility = "visible";
      prev.style.visibility = "hidden";
      submit.style.visibility = "hidden";
    }
    if (index === 1) {
      step1.style.opacity = "0";
      step2.style.opacity = "100";
      step3.style.opacity = "0";
      step4.style.opacity = "0";
      step1.style.visibility = "hidden";
      step2.style.visibility = "visible";
      step3.style.visibility = "hidden";
      step4.style.visibility = "hidden";
      next.style.visibility = "visible";
      prev.style.visibility = "visible";
      submit.style.visibility = "hidden";
    }
    if (index === 2) {
      step1.style.opacity = "0";
      step2.style.opacity = "0";
      step3.style.opacity = "100";
      step4.style.opacity = "0";
      step1.style.visibility = "hidden";
      step2.style.visibility = "hidden";
      step3.style.visibility = "visible";
      step4.style.visibility = "hidden";
      next.style.visibility = "visible";
      prev.style.visibility = "visible";
      submit.style.visibility = "hidden";
    }
    if (index === 3) {
      step1.style.opacity = "0";
      step2.style.opacity = "0";
      step3.style.opacity = "0";
      step4.style.opacity = "100";
      step1.style.visibility = "hidden";
      step2.style.visibility = "hidden";
      step3.style.visibility = "hidden";
      step4.style.visibility = "visible";
      next.style.visibility = "hidden";
      prev.style.visibility = "visible";
      submit.style.visibility = "visible";
    }

    // step1.style.opacity = "0";
  }

  function submit(e) {
    e.preventDefault();
    const url = "http://localhost:8080/register";
    const info = {
      email: email,
      password: password,
      firstName: FirstName,
      lastName: Lastname,
      phoneNo: phoneNo,
      medicalCondition: MedicalCondition,
      medicines: Medicines,
      emergencyContact: EmergencyCo,
    };
    axios
      .post(url, { body: info })
      .then((res) => {
        if (res.data === "SuccessFull Submited") {
          navigate("/");
        }
        if (res.data === "Already a User") setFinalMsg(res.data);
        else setFinalMsg(res.data);
      })
      .catch((err) => {
        setFinalMsg(err.message);
      });
  }
  return (
    <>
      <div class="stepForm">
        <form>
          <div id="step1">
            <h3>Personal Info</h3>
            <div class="form-row d-flex">
              <div class="form-group col-md-6">
                <input
                  type="text"
                  class="form-control FirstName"
                  value={FirstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  id="FirstName"
                  placeholder="FirstName"
                />
                <p className="text-danger">{FirstNameInvalid}</p>
              </div>
              <div className="form-group col-md-6">
                <input
                  type="text"
                  class="form-control"
                  value={Lastname}
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                  id="Lastname"
                  placeholder="LastName"
                />
                <p className="text-danger">{LastnameInvalid}</p>
              </div>
            </div>
            <div class="form-row d-flex">
              <div class="form-group col-md-6">
                <input
                  type="email"
                  class="form-control"
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  id="email"
                  placeholder="Email"
                />
                <p className="text-danger">{emailInvalid}</p>
              </div>
              <div class="form-group col-md-6">
                <input
                  type="password"
                  class="form-control"
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  id="password"
                  placeholder="Password"
                />
                <p className="text-danger">{passwordInvalid}</p>
              </div>
            </div>
            <div class="form-group col-md-6">
              <input
                type="text"
                class="form-control"
                value={phoneNo}
                onChange={(e) => {
                  setphoneNo(e.target.value);
                }}
                id="phoneNo"
                placeholder="Phone No"
              />
              <p className="text-danger">{phoneNoInvalid}</p>
            </div>
          </div>
          <div id="step2">
            <h3>Medical History</h3>
            <div class="form-row d-flex">
              <div class="form-group col-md-6">
                <input
                  type="text"
                  class="form-control"
                  value={MedicalCondition}
                  onChange={(e) => {
                    setMedicalCondition(e.target.value);
                  }}
                  id="MedicalCondition"
                  placeholder="Any Medical Condition"
                />
              </div>
              <div class="form-group col-md-6">
                <input
                  type="text"
                  class="form-control"
                  id="Medicines"
                  value={Medicines}
                  onChange={(e) => {
                    setMedicines(e.target.value);
                  }}
                  placeholder="Medicine's Used"
                />
              </div>
            </div>
          </div>
          <div id="step3">
            <h3>Emergency contact</h3>
            <div class="form-row d-flex">
              <div class="form-group col-md-6">
                <input
                  type="text"
                  class="form-control"
                  id="EmergencyCo"
                  value={EmergencyCo}
                  onChange={(e) => {
                    setEmergencyCo(e.target.value);
                  }}
                  placeholder="Emergency Co."
                />
                <p className="text-danger">{EmergencyCoInvalid}</p>
              </div>
            </div>
          </div>
          <div id="step4">
            <h3>Full Infomation</h3>
            <div class="form-row d-flex">
              <div class="form-group col-md-6">
                <label>First Name:</label>
                <input
                  type="text"
                  class="form-control"
                  value={FirstName}
                  placeholder="FirstName"
                  disabled
                />
              </div>
              <div class="form-group col-md-6">
                <label>Last Name:</label>
                <input
                  type="text"
                  class="form-control"
                  value={Lastname}
                  placeholder="LastName"
                  disabled
                />
              </div>
            </div>
            <div class="form-row d-flex">
              <div class="form-group col-md-6">
                <label>Email:</label>
                <input
                  type="text"
                  class="form-control"
                  value={email}
                  placeholder="Email"
                  disabled
                />
              </div>
            </div>
            <div class="form-row d-flex">
              <div class="form-group col-md-6">
                <label>Medical Conditions:</label>
                <input
                  type="text"
                  class="form-control"
                  value={MedicalCondition}
                  placeholder="MedicalCondition"
                  disabled
                />
              </div>
              <div class="form-group col-md-6">
                <label>Medicines:</label>
                <input
                  type="text"
                  class="form-control"
                  value={Medicines}
                  placeholder="Medicines"
                  disabled
                />
              </div>
            </div>
            <div class="form-row d-flex">
              <div class="form-group col-md-6">
                <label>Mobile No:</label>
                <input
                  type="text"
                  class="form-control"
                  value={phoneNo}
                  placeholder="phoneNo"
                  disabled
                />
              </div>
              <div class="form-group col-md-6">
                <label>Emergency No:</label>
                <input
                  type="text"
                  class="form-control"
                  value={EmergencyCo}
                  placeholder="EmergencyCo"
                  disabled
                />
              </div>
            </div>
            <p className="text-danger">{FinalMsg}</p>
          </div>
          <button
            type=""
            id="next"
            class="btn btn-primary next-btn"
            onClick={next}
          >
            Next
          </button>
          <button
            type=""
            id="prev"
            class="btn btn-primary prev-btn"
            onClick={prev}
          >
            prev
          </button>
          <button
            type="sumbit"
            id="submit"
            class="btn btn-primary submit-btn"
            onClick={submit}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}