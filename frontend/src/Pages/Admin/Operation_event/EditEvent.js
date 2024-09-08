import React, { useState, useEffect } from "react";
import axios from "axios";

function EditEvent({ member, setEditEvent }) {
  const [event_name, setEventName] = useState(member.event_name);
  const [staff, setStaff] = useState(member.staff ? member.staff.split(',') : []);
  const [client, setClient] = useState(member.client);
  const [start_date, setStartDate] = useState(member.start_date);
  const [end_date, setEndDate] = useState(member.end_date);
  const [status, setStatus] = useState(member.status);
  const [rating, setRating] = useState(member.rating);

  const [staffList, setStaffList] = useState([]);
  const [clientList, setClientList] = useState([]);

  useEffect(() => {
    const fetchStaffAndClients = async () => {
      try {
        const [staffRes, clientRes] = await Promise.all([
          axios.get("http://localhost:5000/staff"),
          axios.get("http://localhost:5000/client"),
        ]);
        setStaffList(staffRes.data);
        setClientList(clientRes.data);
      } catch (err) {
        console.error("Error fetching staff and clients:", err);
      }
    };

    fetchStaffAndClients();
  }, []);

  const handleStaffChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setStaff(selectedOptions);
  };

  const updateEvent = async () => {
    try {
      await axios.put(`http://localhost:5000/event/${member.id}`, {
        event_name,
        staff: staff.join(','),
        client,
        start_date,
        end_date,
        status,
        rating,
      });
      setEditEvent(null);
      window.location.reload(); // Forcing a reload is generally not recommended; consider updating state instead
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <h2>Edit Event</h2>
      <div className="mb-3">
        <label htmlFor="eventname" className="form-label">
          Event Name
        </label>
        <input
          type="text"
          className="form-control"
          id="eventname"
          value={event_name}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Event Name"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="staff" className="form-label">
          Staff
        </label>
        <select
          multiple
          className="form-control"
          id="staff"
          value={staff}
          onChange={handleStaffChange}
          required
        >
          {staffList.map((staffMember) => (
            <option key={staffMember.id} value={staffMember.id}>
              {staffMember.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="client" className="form-label">
          Client
        </label>
        <select
          className="form-control"
          id="client"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          required
        >
          <option value="">Select Client</option>
          {clientList.map((clientMember) => (
            <option key={clientMember.id} value={clientMember.id}>
              {clientMember.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="startdate" className="form-label">
          Start Date
        </label>
        <input
          type="date"
          className="form-control"
          id="startdate"
          value={start_date}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="enddate" className="form-label">
          End Date
        </label>
        <input
          type="date"
          className="form-control"
          id="enddate"
          value={end_date}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="status" className="form-label">
          Status
        </label>
        <select
          className="form-control"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value={"Not Started"}>Not Started</option>
          <option value={"Ongoing"}>Ongoing</option>
          <option value={"Completed"}>Completed</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="rating" className="form-label">
          Rating
        </label>
        <input
          type="number"
          className="form-control"
          id="rating"
          value={rating}
          onChange={(e) => setRating(Math.min(e.target.value, 5))}
          max={5}
          required
        />
      </div>
      <button type="button" className="btn btn-primary" onClick={updateEvent}>
        Update
      </button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => setEditEvent(null)}
      >
        Cancel
      </button>
    </div>
  );
}

export default EditEvent;
