import React, { useEffect, useState } from "react";
import axios from "axios";
import EditEvent from "./EditEvent";
import AddEvent from "./AddEvent";


function EventList() {
    const [event, setEvent] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const result = await axios.get("http://localhost:5000/event");
        setEvent(result.data);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };

    fetchEvent();
  }, [refresh]);

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/event/${id}`);
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
        <h2>Events</h2>
        <button className="btn btn-primary" onClick={handleAddClient}>
          Add Events
        </button>
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
          {event.map((member) => (
            <tr key={member.id}>
              <td>{member.event_name}</td>
              <td>{member.staff}</td>
              <td>{member.client}</td>
              <td>{member.start_date}</td>
              <td>{member.end_date}</td>
              <td>{member.status}</td>
              <td>{member.rating}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary m-1"
                  onClick={() => setEditEvent(member)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteEvent(member.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editEvent && (
        
        <EditEvent member={editEvent} setEditEvent={setEditEvent} />

        
      )}
      <AddEvent modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
    </div>
  )
}
export default EventList
