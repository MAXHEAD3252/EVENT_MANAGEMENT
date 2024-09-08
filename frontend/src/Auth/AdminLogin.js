import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";


function AdminLogin() {
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/adminlogin", {
        email,
        password,
      });
      console.log(res);
      if (res.status === 200) {
        alert(res.data.message);
        navigate("/home");
        // const role = res.data?.user?.role
        localStorage.setItem("auth", JSON.stringify(res.data.user));
        window.location.reload(); // Force the page to reload after navigation
      } else {
        alert("Error: " + (res.data.error || "Login failed"));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    <div className="login">
      <form onSubmit={handlesubmit}>
        <h1>Admin Login</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            autoComplete="on"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            autoComplete="on"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  </>
  )
}

export default AdminLogin
