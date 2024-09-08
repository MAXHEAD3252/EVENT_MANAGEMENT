import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Stylesheets/Home.css";
import Spinner from "../Components/Spinner";
import toast, { Toaster } from 'react-hot-toast';

function Home() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    setAuth(storedAuth);
  
    // WebSocket connection
    const socket = new WebSocket("ws://localhost:8080");
  
    socket.onopen = () => {
      console.log("WebSocket connection established");
    };
  
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('WebSocket message received:', data);
  
      // Check if both auth and data.role are defined and equal
      if (auth && data.role === auth.role) {
        if (data.userId.includes(auth.id)) {
          toast(`${data.message}`);
        } else {
          return;
        }
      } else {
        return;
      }
    };
  
    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
  
    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  
    return () => {
      socket.close();
    };
  
  }, [auth?.role]); // Include auth as a dependency to re-run effect when auth changes
  




  return (
    <>
      <div className="container">
        <h1>Welcome to the Dashboard</h1>
        <Toaster/>
        <div className="options">
          {auth ? (
            <>
              {auth.role === 1 && (
                  
                <div className="option admin">
                  <Link to="/admindashboard" className="text-decoration-none">
                    <h2>Admin</h2>
                  </Link>
                  <p>Manage users and system</p>
                </div>
              )}
              {auth.role === 0 && (
                <div className="option driver">
                  <Link to="/staffdashboard" className="text-decoration-none">
                    <h2>Staff</h2>
                  </Link>
                  <p>Access staff and events</p>
                </div>
              )}
              {auth.role === 2 && (
                <div className="option driver">
                  <Link to="/clientdashboard" className="text-decoration-none">
                    <h2>Client</h2>
                  </Link>
                  <p>Access clients, events and ratings</p>
                </div>
              )}
            </>
          ) : (
            <>
              <Spinner />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
