import React, { useEffect, useState } from "react";
import axios from "axios";
import EditClient from "./EditClient";
import AddClient from "./AddClient";

function ClientList() {

    const [client, setClient] = useState([]);
  const [editClient, setEditClient] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const result = await axios.get("http://localhost:5000/client");
        setClient(result.data);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };

    fetchClient();
  }, [refresh]);

  const deleteClient = async (id) => {
    try {
      const auth = JSON.stringify(localStorage.getItem('auth'))
      const name = auth.name
      await axios.delete(`http://localhost:5000/client/${id}`,{name});
      setRefresh(true); // Trigger re-fetch
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  const handleAddClient = () => {
    setIsOpen(true);
  };

  return (
    <div style={{ width: "200vh", margin: "5vh" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Clients</h2>
        <button className="btn btn-primary" onClick={handleAddClient}>
          Add Client
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {client.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary m-1"
                  onClick={() => setEditClient(member)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteClient(member.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editClient && (
        <EditClient member={editClient} setEditClient={setEditClient} />
      )}
      <AddClient modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default ClientList
