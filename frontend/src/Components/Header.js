import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { addNotification } from 'react-push-notification';
import { IoIosNotifications } from "react-icons/io";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    setIsAuthenticated(!!auth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth'); // Remove auth from local storage
    setIsAuthenticated(false); // Update the state to reflect logout
    navigate('/');
    window.location.reload();  // Force the page to reload after navigation
  };

  // const handleclick = ()=>{
  //   addNotification({
  //     title:'hello',
  //     message:'welcome',
  //     duration: 2000,
  //     native:true,
  //   })
  // }

  return (
    <>
    
      <nav className="navbar bg-body-tertiary">
        <form className="container-fluid justify-content-start">
          {!isAuthenticated ? (
            <>
              <Link to="/adminlogin" className="btn btn-primary m-3" type="button">
                Admin
              </Link>
              <Link to="/clientlogin" className="btn btn-primary m-3" type="button">
                Client
              </Link>
              <Link to="/stafflogin" className="btn btn-primary m-3" type="button">
                Staff
              </Link>
              {/* <button className="btn btn-secondary" onClick={handleclick}>click me</button> */}
            </>
          ) : ( <>
            <button onClick={handleLogout} className="btn btn-outline-success me-2" type="button">
              Logout
            </button>
            <button onClick={()=>navigate(-1)} className="btn btn-outline-success me-2" type="button">
              Back
            </button>
            <Link to="/notification-center" className="btn m-3">
            <IoIosNotifications/>
              </Link>
          </>)}
          
        </form>
      </nav>
      
    </>
  );
}

export default Header;
