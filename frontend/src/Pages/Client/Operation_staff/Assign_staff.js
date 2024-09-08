import React, { useEffect, useState } from "react";
import axios from "axios";

function AssignStaff() {
  const [staff, setStaff] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        const clientId = auth.id; // Assuming the client ID is stored in auth.id

        const result = await axios.get(
          "http://localhost:5000/getassignedstaff",
          {
            params: { clientId: clientId },
          }
        );
        setStaff(result.data);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };

    fetchStaff();
  }, [refresh]);

  return (
    <div style={{ width: "200vh", margin: "5vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Staff</h2>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Department</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.department}</td>
              <td>{member.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignStaff;
