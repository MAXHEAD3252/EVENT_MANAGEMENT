import React, { useEffect, useState } from "react";
import axios from "axios";

function AssignEventList() {
  const [events, setEvents] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchAssignedEvents = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        const userId = auth.id;

        const response = await axios.get('http://localhost:5000/getassignedevents', {
          params: { userId: userId }
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching assigned events:', error);
      }
    };

    fetchAssignedEvents();
  }, [refresh]);

  return (
    <div style={{ width: "200vh", margin: "5vh" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Events</h2>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Event Name</th>
            <th scope="col">Staff</th>
            <th scope="col">Client</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Status</th>
            <th scope="col">Rating</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.event_name}</td>
              <td>{event.staff_names.split(',').join(', ')}</td>
              <td>{event.client}</td>
              <td>{event.start_date}</td>
              <td>{event.end_date}</td>
              <td>{event.status}</td>
              <td>{event.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignEventList;
