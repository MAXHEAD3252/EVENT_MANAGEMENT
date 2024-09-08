import React, { useState } from "react";
import axios from "axios";

const EditStaff = ({ member, setEditStaff, loadStaff }) => {
  const [name, setName] = useState(member.name);
  const [department, setDepartment] = useState(member.department);
  const [email, setEmail] = useState(member.email);

  const updateStaff = async () => {
    await axios.put(`http://localhost:5000/staff/${member.id}`, {
      name,
      department,
      email
    });
    setEditStaff(null);
    window.location.reload(); // Force the page to reload after update
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <h2>Edit Staff Member</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          id="exampleInputName"
          aria-describedby="emailHelp"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          id="exampleInputDepartment"
          aria-describedby="departmentHelp"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="Department"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          id="exampleInputemail"
          aria-describedby="emailHelp"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      </div>
      <button type="button" class="btn btn-primary m-1" onClick={updateStaff}>
        Update
      </button>
      <button
        type="button"
        class="btn btn-danger m-1"
        onClick={() => setEditStaff(null)}
      >
        cancel
      </button>
    </div>
  );
};

export default EditStaff;
