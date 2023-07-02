import {React,useState} from 'react'
import Variable from '../Components/Global';
import { useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios';
let global = new Variable();
const url = "http://localhost:8080/details";

axios.post(url,{
    params:{
      email:`${global.getlocalStorage("emailId")}`,
      password:`${global.getlocalStorage("password")}`,
    }
  }).then(res=>{
     console.log(res.data);
     /**
      *  userName: null,
passWord: null,
email: null,
phone: null,
firstName: null,
lastName: null,
currMed: null,
med: null,
emergencyCo: null,
authenitcated: false,
      */
     global.firstName = res.data[0].FirstName;
     global.lastName  = res.data[0].LastName;
     global.passWord = res.data[0].Password;
     global.phone = res.data[0].PhoneNo;
     global.emergencyCo = res.data[0].EmergencyCo;
     global.email = res.data[0].Email;
     global.med = res.data[0].CurrMed;
     global.currMed = res.data[0].CurrMedCond;
  }).catch(err=>{console.log(err.message)});


export default function EditPage() {
    const [FirstName, setFirstName] = useState(global.firstName);
    const [Lastname, setLastname] = useState(global.lastName);
    const [email, setemail] = useState(global.email);
    const [phoneNo, setphoneNo] = useState(global.phone);
    const [MedicalCondition, setMedicalCondition] = useState("");
    const [Medicines, setMedicines] = useState(global.med);
    const [EmergencyCo, setEmergencyCo] = useState(global.emergencyCo);
    const [Success, setSuccess] = useState("");
    const [UnSuccess, setUnSuccess] = useState("");
    const [FirstNameInvalid, setFirstNameInvalid] = useState("");
    const [LastnameInvalid, setLastnameInvalid] = useState("");
    const [phoneNoInvalid, setphoneNoInvalid] = useState("");
    const [EmergencyCoInvalid, setEmergencyCoInvalid] = useState("");
    
    function onSubnit(){
        
          if(!global.validateText("name",FirstName)){
            setFirstNameInvalid("Invalid First name");
            return;
          }
          if(!global.validateText("name",Lastname)){
            setLastnameInvalid("Invalid Last name");
            return;
          }
          if(!global.validateText("phone",phoneNo)){
            setphoneNoInvalid("Invalid Phone no");
            return;
          }
          if(!global.validateText("phone",EmergencyCo)){
            setEmergencyCoInvalid("Invalid No");
            return;
          }
          setFirstNameInvalid("");
          setLastnameInvalid("");
          setphoneNoInvalid("");
          setEmergencyCoInvalid("");


          axios.post("http://localhost:8080/details/change",{
            params:{
              email:`${global.email}`,
              password:`${global.passWord}`,  
              firstName:`${FirstName}`,
              lastName:`${Lastname}`,
              phoneNo:`${phoneNo}`,
              emergency:`${EmergencyCo}`
            }
          }).then(res=>{
             console.log(res.data.command);
             if(res.data.command === "UPDATE") setSuccess("UPDATED SUCCESSFULLY");
             else setUnSuccess("ERROR TRY AGAIN")
          }).catch(err=>{console.log(err.message)});

    }

    return (
   <>{(global.getlocalStorage("emailId") && global.getlocalStorage("password"))?<>
    <div class = "stepForm">
<form>
    <div id="">
   <h3>Edit details</h3>
   <div class="form-row d-flex">
      <div class="form-group col-md-6">
      <label>First Name:</label>
      <input type="text" class="form-control" value={FirstName} onChange={(e)=>{setFirstName(e.target.value)}} placeholder='FirstName' />
      <p className="text-danger">{FirstNameInvalid}</p>
      </div>
      <div class="form-group col-md-6">
      <label>Last Name:</label>
      <input type="text" class="form-control" value={Lastname} onChange={(e)=>{setLastname(e.target.value)}}  placeholder='LastName' />
      <p className="text-danger">{LastnameInvalid}</p>
      </div>
   </div>
   <div class="form-row d-flex">
      <div class="form-group col-md-6">
      <label>Email:</label>
      <input type="text" class="form-control" value={email} placeholder='Email' disabled/>
      </div>
   </div>
   <div class="form-row d-flex">
      <div class="form-group col-md-6">
      <label>Medical Conditions:</label>
      <input type="text" class="form-control" value={MedicalCondition} onChange={(e)=>{setMedicalCondition(e.target.value)}} placeholder='MedicalCondition' />
      </div>
      <div class="form-group col-md-6">
      <label>Medicines:</label>
      <input type="text" class="form-control" value={Medicines} onChange={(e)=>{setMedicines(e.target.value)}}  placeholder='Medicines'/>
      </div>
   </div>
   <div class="form-row d-flex">
      <div class="form-group col-md-6">
      <label>Mobile No:</label>
      <input type="text" class="form-control" value={phoneNo} onChange={(e)=>{setphoneNo(e.target.value)}} placeholder='phoneNo' />
      <p className="text-danger">{phoneNoInvalid}</p>
      </div>
      <div class="form-group col-md-6">
      <label>Emergency No:</label>
      <input type="text" class="form-control" value={EmergencyCo} onChange={(e)=>{setEmergencyCo(e.target.value)}} placeholder='EmergencyCo'/>
      <p className="text-danger">{EmergencyCoInvalid}</p>
      </div>
   </div>
   <p className="text-success">{Success}</p>
   <p className="text-danger">{UnSuccess}</p>
   </div>
   </form>
   <button type="sumbit" id="" class="btn btn-primary" onClick={onSubnit} >Submit</button>
   </div>
   
   </>:<Navigate to={"/"}/>} </>
  )
}
