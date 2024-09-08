import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditEvent from '../../Admin/Operation_event/EditEvent';
import AddEvent from '../../Admin/Operation_event/AddEvent';

function Clientassignevents() {
  const [events, setEvents] = useState([]);
  const [clientId, setClientId] = useState('');
  const [editEvent, setEditEvent] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchAssignedEvents = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        const currentClientId = auth.id; // Assuming the client ID is stored in auth.id
        setClientId(currentClientId);

        const response = await axios.post('http://localhost:5000/getassignedevents', {
          clientId: currentClientId
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching assigned events:', error);
      }
    };

    fetchAssignedEvents();
  }, []); // Empty dependency array to run once on component mount

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
    <div style={{ width: '100%', margin: '5vh' }}>
      <h2>Events Assigned to Client</h2>
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
              <td>{event.staff}</td>
              <td>{event.client}</td>
              <td>{event.start_date}</td>
              <td>{event.end_date}</td>
              <td>{event.status}</td>
              <td>{event.rating}</td>
              <td><button
                  type="button"
                  className="btn btn-primary m-1"
                  onClick={() => setEditEvent(event)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteEvent(event.id)}
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
  );
}

export default Clientassignevents;
