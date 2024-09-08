import React,{useEffect} from 'react'
import StaffMenu from './StaffMenu';
import toast, { Toaster } from 'react-hot-toast';


function Staffdashboard() {
  const auth = JSON.parse(localStorage.getItem('auth'));

  // useEffect(() => {
    
  //   // WebSocket connection
  //   const socket = new WebSocket("ws://localhost:8080");

  //   socket.onopen = () => {
  //     console.log("WebSocket connection established");
  //   };

  //   socket.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     console.log('WebSocket message received:', data);
  //     toast(`${data.message}`);
  //   };

  //   socket.onclose = () => {
  //     console.log("WebSocket connection closed");
  //   };

  //   socket.onerror = (error) => {
  //     console.error("WebSocket error:", error);
  //   };

  //   return () => {
  //     socket.close();
  //   };

  // }, []);
  
  return (
    <div>
    {/* <Toaster /> */}
      <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <StaffMenu/>
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
            <h3>Staff Name : {auth?.name}</h3>
            <h3>Staff Email : {auth?.email}</h3>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Staffdashboard
