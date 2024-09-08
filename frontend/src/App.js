import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Admindashboard from './Pages/Admin/Admindashboard';
import Clientdashboard from './Pages/Client/Clientdashboard';
import Staffdashboard from './Pages/Staff/Staffdashboard';
import Spinner from './Components/Spinner';
import Create_view_edit_staff from './Pages/Admin/Operations_staff/Create_view_edit_staff';
import AdminLogin from './Auth/AdminLogin';
import Home from './Pages/Home';
import StaffLogin from './Auth/StaffLogin';
import ClientLogin from './Auth/ClientLogin';
import View_client from './Pages/Admin/Operation_client/View_client';
import View_events from './Pages/Admin/Operation_event/View_events';
import Get_events from './Pages/Staff/Operation_events/Get_events';
import Get_clients from './Pages/Staff/Operation_clients/Get_clients';
import Get_Staff from './Pages/Client/Operation_staff/Get_Staff';
import Get_assign_events from './Pages/Client/Operation_client_events/Get_assign_events';
import Get_event_history from './Pages/Client/Event_history/Get_event_history';
import PageNotFound from './Components/PageNotFound';
import Notification_center from './Notification/Notification_center';
import ProtectedRoute from './Routes/ProtectedRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/adminlogin' element={<AdminLogin />} />
          <Route path='/stafflogin' element={<StaffLogin />} />
          <Route path='/clientlogin' element={<ClientLogin />} />
          <Route path='/home' element={<Home />} />
          <Route path='/spinner' element={<Spinner />} />
          <Route path='/pagenotfound' element={<PageNotFound />} />
          <Route path='/notification-center' element={<Notification_center />} />
          <Route path='/spinner' element={<Spinner />} />

          <Route path='/admindashboard' element={<ProtectedRoute element={Admindashboard} roles={[1]} />} />
          <Route path='/clientdashboard' element={<ProtectedRoute element={Clientdashboard} roles={[2]} />} />
          <Route path='/clientops' element={<ProtectedRoute element={View_client} roles={[1]} />} />
          <Route path='/staffdashboard' element={<ProtectedRoute element={Staffdashboard} roles={[0]} />} />
          <Route path='/staffops' element={<ProtectedRoute element={Create_view_edit_staff} roles={[1, 0]} />} />
          <Route path='/eventops' element={<ProtectedRoute element={View_events} roles={[1]} />} />
          <Route path='/getassignevents' element={<ProtectedRoute element={Get_events} roles={[0]} />} />
          <Route path='/getassignclients' element={<ProtectedRoute element={Get_clients} roles={[0]} />} />
          <Route path='/client-assigned-staff' element={<ProtectedRoute element={Get_Staff} roles={[2]} />} />
          <Route path='/client-assigned-events' element={<ProtectedRoute element={Get_assign_events} roles={[2]} />} />
          <Route path='/client-event-history' element={<ProtectedRoute element={Get_event_history} roles={[2]} />} />
          <Route path='*' element={<Spinner/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
