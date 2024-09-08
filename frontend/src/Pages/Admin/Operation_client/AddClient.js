import React, { useState } from "react";
import axios from "axios";
import Modal from 'react-modal';

function AddClient({ modalIsOpen, setIsOpen }) {
    const [clientformData, setclientFormData] = useState({
        name: "",
        email: "",
        password: ""
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setclientFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };
    
      const addClient = async () => {
        try {
          // const fcmToken = await generateToken();
          await axios.post("http://localhost:5000/client", clientformData);
          setclientFormData({
            name: "",
            email: "",
            password: ""
          });
          
        window.location.reload(); // Force the page to reload after update
          setIsOpen(false); // Close the modal after adding staff
        } catch (error) {
          console.error("Error adding client:", error);
        }
      };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setIsOpen(false)}
      contentLabel="Add Client Modal"
    >
      <div>
        <span onClick={() => setIsOpen(false)} style={{cursor:'pointer'}}>Close</span>
      </div>
      <form onSubmit={addClient}>
      <div style={{ width: "50vh", margin: "5vh" }}>
        <h2>Add Client</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={clientformData.name}
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
            value={clientformData.email}
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
            value={clientformData.password}
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
  )
}

export default AddClient
