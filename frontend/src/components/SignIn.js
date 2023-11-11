import React, { useState ,useContext,useEffect} from 'react'
import '../css/SignIn.css'
import logo from '../img/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { LoginContext } from '../context/LoginContext'




const SignIn = () => {
  const {setUserLogin}=useContext(LoginContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const notifyA = (msg) => {
    toast.error(msg)

  }
  const notifyB = (msg) => {
    toast.success(msg)
  }
  
  const postData = () => {
    console.log('checking data');

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!emailRegex.test(email)) {
      notifyA("Invalid email address")
      return
    }
    fetch('/signin', {
      method: "post",
      headers:
      {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })

    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          notifyA(data.error)

        }
        else {
          notifyB("Signed in successfully")
          // console.log(data);
          localStorage.setItem("jwt",data.token)
          localStorage.setItem("user",JSON.stringify(data.user))
          setUserLogin(true)
          navigate("/")
        }
      })

  }
 
  return (
    < div className="signIn" >
      <div>
        <div className="loginForm">
          <img className="signUpLogo" src={logo} alt="" />
          <div>
            <input type="email" name='email' id='email' placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
          </div>
          <div>
            <input type="password" name='password' id='password' placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
          </div>
          <input type="submit" id="login-btn" value="Sign In" onClick={postData} />
        </div>
        <div className="loginForm2">
          Don't have an account ?
          <Link to="/signup">
            <span style={{ color: "blue", cursor: "pointer" }}>Sign Up</span>
          </Link>
        </div>
      </div>
    </div >
  )
}

export default SignIn