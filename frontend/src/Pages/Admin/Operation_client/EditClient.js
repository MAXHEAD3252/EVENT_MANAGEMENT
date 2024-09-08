import React, { useState } from "react";
import axios from "axios";

function EditClient({ member, setEditClient, loadClient }) {

    const [name, setName] = useState(member.name);
  const [email, setEmail] = useState(member.email);

  const updateClient = async () => {
    await axios.put(`http://localhost:5000/client/${member.id}`, {
      name,
      email
    });
    setEditClient(null);
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
      <button type="button" class="btn btn-primary m-1" onClick={updateClient}>
        Update
      </button>
      <button
        type="button"
        class="btn btn-danger m-1"
        onClick={() => setEditClient(null)}
      >
        cancel
      </button>
    </div>
  )
}

export default EditClient
