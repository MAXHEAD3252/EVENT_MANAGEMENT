import React, { useEffect, useState } from "react";
import axios from "axios";

function Assign_clients() {
  const [client, setClient] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        const userId = auth.id;

        const result = await axios.get(
          "http://localhost:5000/getassignedclients",
          {
            params: { userId: userId },
          }
        );
        setClient(result.data);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };

    fetchClient();
  }, [refresh]);
  return (
    <div style={{ width: "200vh", margin: "5vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Clients</h2>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {client.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Assign_clients;
