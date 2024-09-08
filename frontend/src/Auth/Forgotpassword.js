// import {React, useState} from 'react'
// import {useNavigate} from 'react-router-dom'
// import axios from 'axios'

function Forgotpassword() {

    // const [email,setEmail] = useState('')
    // const [newpassword,setNewPassword] = useState('')
    // // const [answer,setAnswer] = useState('')

    // const navigate = useNavigate()

    // const handlesubmit = async(e)=>{
    //     e.preventDefault()
    //     try{
    //         const res = await axios.post('http://localhost:5000/forgot-password', { email, newpassword });
    //         console.log(res);
    //         alert('Logged in Successfully');
    //         navigate('/login')
    //     }catch(error){
    //         console.log(error)
    //     }
    // }
  return (
    <div className="login">
{/*       
      <form onSubmit={handlesubmit}>
      <h1>Reset Password</h1>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
    <input type="email" className="form-control" id="exampleInputEmail1" placeholder='Enter Email' autoComplete='on' onChange={(e)=> setEmail(e.target.value)} required/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputNewPassword" className="form-label">New Password</label>
    <input type="password" className="form-control" id="exampleInputNewPassword" placeholder='Enter New Password' autoComplete='on' onChange={(e)=>setNewPassword(e.target.value)} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputAnswer" className="form-label">Answer</label>
    <input type="password" className="form-control" id="exampleInputAnswer" placeholder='Enter Your Favorite Car' autoComplete='on' onChange={(e)=>setAnswer(e.target.value)} required/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form> */}
</div>
  )
}

export default Forgotpassword
