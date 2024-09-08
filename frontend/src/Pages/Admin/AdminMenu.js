import React from 'react'
import { NavLink } from 'react-router-dom'

function AdminMenu() {
  return (
    <>
     <div className="text-center">
    <div className="list-group">
    <h4>Admin Panel</h4>
  <NavLink to='/staffops' className="list-group-item list-group-item-action">View Staff</NavLink>
  <NavLink to='/eventops' className="list-group-item list-group-item-action">View Event Status</NavLink>
  <NavLink to='/clientops' className="list-group-item list-group-item-action">View Clients</NavLink>
    </div>
    </div>
    </>
  )
}

export default AdminMenu
