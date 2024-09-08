import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

function AddEvent({ modalIsOpen, setIsOpen }) {
  const [eventname, setEventName] = useState("");
  const [staff, setStaff] = useState([""]);
  const [client, setClient] = useState("");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");
  const [staffOptions, setStaffOptions] = useState([]);
  const [clientOptions, setClientOptions] = useState([]);

  useEffect(() => {
    if (modalIsOpen) {
      axios
        .get("http://localhost:5000/staff")
        .then((response) => {
          setStaffOptions(response.data);
        })
        .catch((error) => console.error("Error fetching staff:", error));

      axios
        .get("http://localhost:5000/client")
        .then((response) => {
          setClientOptions(response.data);
        })
        .catch((error) => console.error("Error fetching clients:", error));
    }
  }, [modalIsOpen]);

  const addEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/event", {
        eventname,
        staff:staff.join(','),
        client,
        startdate,
        enddate,
        status,
        rating,
      });

      window.location.reload(); // Force the page to reload after update
      setIsOpen(false); // Close the modal after adding the event
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Add Event Modal"
      >
        <div>
          <span onClick={() => setIsOpen(false)} style={{ cursor: "pointer" }}>
            Close
          </span>
        </div>
        <form onSubmit={addEvent}>
          <div style={{ width: "50vh", margin: "5vh" }}>
            <h2>Add Event</h2>
            <div className="mb-3">
              <label htmlFor="eventname" className="form-label">
                Event Name
              </label>
              <input
                type="text"
                className="form-control"
                id="eventname"
                name="eventname"
                value={eventname}
                onChange={(e) => setEventName(e.target.value)}
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
                name="staff"
                value={staff}
                onChange={(e) =>
                  setStaff(
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
                  )
                }
                required
              >
                {staffOptions.map((staff) => (
                  <option key={staff.id} value={staff.id}>
                    {staff.name}
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
                name="client"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                required
              >
                {clientOptions.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
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
                name="startdate"
                value={startdate}
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
                name="enddate"
                value={enddate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                status
              </label>
              <select
                className="form-control"
                id="client"
                name="client"
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
                name="rating"
                value={rating}
                onChange={(e) => {
                  const value = Math.min(e.target.value, 5); // Ensure value does not exceed 5
                  setRating(value);
                }}
                max={5} // This will restrict the input to a maximum of 5
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default AddEvent;
