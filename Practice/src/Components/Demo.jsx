import React, { useState } from "react";
import axios from "axios";
import "./styles.css"; // import the CSS file

export default function Demo() {
  const [student, setstudent] = useState({ id: "", name: "", branch: "" });
  const [studentdata, setstudentdata] = useState(null);
  const [id, setid] = useState("");

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

  return (
    <div className="app-container">
      <h2 className="title">Student Management</h2>

      {/* Add Student Form */}
      <form className="form-container" onSubmit={hs}>
        <h3 className="form-title">Add Student</h3>
        <input
          type="number"
          placeholder="Enter Id"
          onChange={hc}
          name="id"
          className="input-field"
        />
        <input
          type="text"
          placeholder="Enter Name"
          onChange={hc}
          name="name"
          className="input-field"
        />
        <input
          type="text"
          placeholder="Enter Branch"
          onChange={hc}
          name="branch"
          className="input-field"
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>

      {/* View Student Form */}
      <form
        className="form-container"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const res = await axios.get(`http://localhost:2100/view?s=${id}`);
            setstudentdata(res.data);
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <h3 className="form-title">View Student</h3>
        <input
          type="number"
          value={id}
          onChange={(e) => setid(e.target.value)}
          className="input-field"
          placeholder="Enter Id"
        />
        <button type="submit" className="btn">
          Search
        </button>
      </form>

      {/* Display Student Data */}
      {studentdata && (
        <div className="student-card">
          <p>
            <span>Id:</span> {studentdata.id}
          </p>
          <p>
            <span>Name:</span> {studentdata.name}
          </p>
          <p>
            <span>Branch:</span> {studentdata.branch}
          </p>
        </div>
      )}
    </div>
  );
}
