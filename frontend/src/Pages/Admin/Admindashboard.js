import React from 'react'
import AdminMenu from './AdminMenu';
// import Create_view_edit_staff from './Operations_staff/Create_view_edit_staff';


function Admindashboard() {
  const auth = JSON.parse(localStorage.getItem('auth'));
  return (
    <div>
      <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu/>
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
            <h3>Admin Name : {auth?.name}</h3>
            <h3>Admin Email : {auth?.email}</h3>
            <h3>Admin Role : {auth?.role}</h3>
          </div>
        </div>
        {/* <Create_view_edit_staff/> */}
      </div>
    </div>
    </div>
  )
}

export default Admindashboard
