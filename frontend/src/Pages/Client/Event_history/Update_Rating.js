import React, { useState } from "react";
import axios from "axios";

function Update_Rating({ member, setRateEvent }) {
  const [rating, setRating] = useState(member.rating);

  const auth = JSON.parse(localStorage.getItem('auth'))
  const name = auth.name

  const updateEvent = async () => {
    try {
      await axios.put(`http://localhost:5000/updateevent/${member.id}`, {
        rating: parseInt(rating), // Ensure rating is parsed as an integer
        name : name
      });
      setRateEvent(null); // Reset edit mode
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
        alignItems: "center"
      }}
    >
      <h2>Rate Event</h2>
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
        onClick={() => setRateEvent(null)}
      >
        Cancel
      </button>
    </div>
  );
}

export default Update_Rating;
