import React, { useState } from "react";
import axios from "axios";
import Modal from 'react-modal';

const AddStaff = ({ modalIsOpen, setIsOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const addStaff = async () => {
    try {
      await axios.post("http://localhost:5000/staff", formData);
      setFormData({
        name: "",
        email: "",
        password: "",
        department: ""
      });
    window.location.reload(); // Force the page to reload after update
      setIsOpen(false); // Close the modal after adding staff
    } catch (error) {
      console.error("Error adding staff:", error);
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setIsOpen(false)}
      contentLabel="Add Staff Modal"
    >
      <div>
        <span onClick={() => setIsOpen(false)} style={{cursor:'pointer'}}>Close</span>
      </div>
      <form onSubmit={addStaff}>
      <div style={{ width: "50vh", margin: "5vh" }}>
        <h2>Add Staff Member</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="department" className="form-label">Department</label>
          <input
            type="text"
            className="form-control"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      </form>
    </Modal>
  );
};

export default AddStaff;
