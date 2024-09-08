import React, { useEffect, useState } from "react";
import axios from "axios";
import EditStaff from "./EditStaff";
import AddStaff from "./AddStaff";

const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const [editStaff, setEditStaff] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const result = await axios.get("http://localhost:5000/staff");
        setStaff(result.data);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };

    fetchStaff();
  }, [refresh]);

  const deleteStaff = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/staff/${id}`);
      setRefresh(true); // Trigger re-fetch
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  const handleAddStaff = () => {
    setIsOpen(true);
  };

  return (
    <div style={{ width: "200vh", margin: "5vh" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Staff Members</h2>
        <button className="btn btn-primary" onClick={handleAddStaff}>
          Add Staff
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Department</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.department}</td>
              <td>{member.email}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary m-1"
                  onClick={() => setEditStaff(member)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteStaff(member.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editStaff && (
        <EditStaff member={editStaff} setEditStaff={setEditStaff} />
      )}
      <AddStaff modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default StaffList;
