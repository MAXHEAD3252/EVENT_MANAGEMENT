import React from 'react'
import { NavLink } from 'react-router-dom'

function StaffMenu() {
  return (
    <div className="text-center">
   <div className="list-group">
   <h3>Staff Panel</h3>
 <NavLink to='/staffops' className="list-group-item list-group-item-action">View Staff</NavLink>
 <NavLink to='/getassignevents' className="list-group-item list-group-item-action">View Event Status</NavLink>
 <NavLink to='/getassignclients' className="list-group-item list-group-item-action">View Clients</NavLink>
   </div>
   </div>
  )
}

export default StaffMenu
