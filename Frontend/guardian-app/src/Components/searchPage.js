import {React,useState} from 'react'
import axios from 'axios';
let Locality = ['SOUTH_DELHI','SOUTH_DELHI','CENTRAL_DELHI','NOIDA','EAST_DELHI','GURGAON','FARIDABAD','WEST_DELHI'];
const url = "http://localhost:8080/";
export default function SearchPage() {
  const [searchRes, setsearchRes] = useState("");
  const [areaRes, setareaRes] = useState("All");
  const [responseget, setresponseget] = useState([]);
  function getQuery(){
    axios.get(url,{
      params:{
        search:`${searchRes}`,
        area:`${areaRes}`,
      }
    }).then(res=>{
       setresponseget(res.data);
    }).catch(err=>{console.log(err.message)});
}

  return (
    <div>
         <div className="w-50 mx-auto gap-2">
      <h2 className="text-center">Gaurdians</h2>
      <div className="input-group input-group-lg">
        <input
          type="text"
          className="form-control"
          placeholder="Search Hospitals"
          aria-label="text"
          aria-describedby="basic-addon2"
          value={searchRes}
          onChange={(e)=>{setsearchRes(e.target.value)}}
        />
        <div className="input-group-append input-group-lg">
          <button className="btn btn-outline-secondary" type="button" onClick={getQuery}>
            Search
          </button>
        </div>
      </div>
      <div className="w-50 m-3">
          <select name="select_box" value={areaRes} onChange={(e)=>{setareaRes(e.target.value)}} className="form-select" id="select_box">
            <option value="All">All</option>
            {Locality.map((item, index) => (<option value={item} key={index}>{item}</option>))}
          </select>
        </div>
    </div>
    <div className="w-75 mx-auto gap-2">
    <table className="table">
  {<><thead>

    <tr>
      <th scope="col">Name</th>
      <th scope="col">Address</th>
      <th scope="col">Area</th>
      <th scope="col">Type</th>
    </tr>
  </thead>
  <tbody>
    {responseget.map((item, index) => (
     <tr key={index}>
     <td>{item.Name}</td>
     <td>{item.Address}</td>
     <td>{item.Area}</td>
     <td>{item.Type}</td>
   </tr>))}
  </tbody></>}
</table>
</div>
    </div>
  )
}
