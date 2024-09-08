import React from 'react'
import { NavLink } from 'react-router-dom'

function ClientMenu() {
  return (
    <>
    <div className="text-center">
   <div className="list-group">
   <h3>Client Panel</h3>
 <NavLink to='/client-assigned-staff' className="list-group-item list-group-item-action">View Assigned Staff</NavLink>
 <NavLink to='/client-assigned-events' className="list-group-item list-group-item-action">View Event Status</NavLink>
 <NavLink to='/client-event-history' className="list-group-item list-group-item-action">Event History</NavLink>
   </div>
   </div>
   </>
  )
}

export default ClientMenu
