import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Notification_center() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div style={{ width: "200vh", margin: "5vh" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Notifications</h2>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Notification Name</th>
            <th scope="col">Notification Body</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification) => (
            <tr key={notification.id}>
              <td>{notification.notification_name}</td>
              <td>{notification.notification_body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Notification_center;
