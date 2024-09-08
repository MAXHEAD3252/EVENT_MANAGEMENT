import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Spinner({ path = '/pagenotfound' }) {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => prevValue - 1);
    }, 500);

    if (count === 0) {
      navigate(path, {
        state: { from: location.pathname },
      });
    }

    return () => clearInterval(interval);
  }, [count, navigate, path, location]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
      <h1 className="text-center">Redirecting in {count} seconds</h1>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
