import React, { useEffect, useState } from "react";
import axios from "axios";
import Update_Rating from "./Update_Rating";

function Get_event_history() {
  const [events, setEvents] = useState([]);
  const [refresh, setRefresh] = useState(false); // State to force refresh
  const [modalIsOpen, setIsOpen] = useState(false);
  const [rateEvent, setRateEvent] = useState(null);

  useEffect(() => {
    const fetchEventHistory = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        const clientId = auth.id; // Assuming client ID is stored in auth.id

        const response = await axios.post('http://localhost:5000/geteventhistory', {
          clientId: clientId
        });
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching event history:", error);
      }
    };

    fetchEventHistory();
  }, [refresh]); // Dependency array ensures useEffect runs on mount and when refresh changes

  return (
    <div style={{ width: "200vh", margin: "5vh" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Event History</h2>
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
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.event_name}</td>
              <td>{event.staff}</td>
              <td>{event.client}</td>
              <td>{event.start_date}</td>
              <td>{event.end_date}</td>
              <td>{event.status}</td>
              <td>{event.rating}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary m-1"
                  onClick={() => setRateEvent(event)} // Set the event for rating update
                >
                  Rate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rateEvent && (
        <Update_Rating member={rateEvent} setRateEvent={setRateEvent} />
      )}
    </div>
  );
}

export default Get_event_history;
