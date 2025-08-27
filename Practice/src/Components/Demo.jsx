import React, { useState } from "react";
import axios from "axios";


export default function Demo() {
  const [student, setstudent] = useState({ id: "", name: "", branch: "" });
    const [studentdata, setstudentdata] = useState({ id: "", name: "", branch: "" });
  const [output,setoutput]=useState("");
  const [id,setid]=useState(0);

  const hs = async (e) => {
    e.preventDefault();
    try {
     await axios.post("http://localhost:2100/add", student);
      console.log("Student saved:", student);
    } catch (err) {
      console.log("error", err);
    }
  };

  const hc = (e) => {
    setstudent({ ...student, [e.target.name]: e.target.value });
  };
  const display=()=>{

  }

  return (
    <div>
      <form onSubmit={hs}>
        <input
          type="number"
          placeholder="Enter Id"
          onChange={hc}
          name="id"
        />
        <br />
        <input
          type="text"
          placeholder="Enter Name"
          onChange={hc}
          name="name"
        />
        <br />
        <input
          type="text"
          placeholder="Enter Branch"
          onChange={hc}
          name="branch"
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      <form onSubmit={async (e)=>{
        e.preventDefault();
        try{
       const res= await axios.get(`http://localhost:2100/view?s=${id}`)
       setstudentdata(res.data)
        }catch(e){
          console.log(e)
        }
      }} >
        <input type="number" value={id} onChange={(e)=>{setid(e.target.value)}} /><br/>
        <button type="submit" >Submit</button>
      </form>
      {studentdata&&(
        <div>
      <p>Id : {studentdata.id}</p>
       <p>  Name : {studentdata.name}</p>
         <p> Branch : {studentdata.branch}</p>
         </div>
    )}
    </div>
  );
}
