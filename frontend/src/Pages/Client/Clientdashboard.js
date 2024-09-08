import React from 'react'
import ClientMenu from './ClientMenu'

function Clientdashboard() {
  const auth = JSON.parse(localStorage.getItem('auth'));
  return (
    <div>
      <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <ClientMenu/>
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
            <h3>Client ID : {auth?.id}</h3>
            <h3>Client Name : {auth?.name}</h3>
            <h3>Client Email : {auth?.email}</h3>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Clientdashboard
