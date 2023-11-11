import React, {  useState } from 'react'
import logo from '../img/logo.png'
import '../css/SignUp.css'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'




const SignUp = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const notifyA = (msg) => {
        toast.error(msg)

    }
    const notifyB = (msg) => {
        toast.success(msg)
    }
    const postData = () => {

        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        // const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        if (!emailRegex.test(email)) {
            notifyA("Invalid email address")
            return
        }
        else if(password.length<4)
        {
            notifyA(' password must contains minimum four characters ')
            return 
        }
        fetch('/signup', {
            method: "post",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                userName: userName,
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
                    notifyB(data.message)
                    navigate("/signin")
                }

                // console.log(data)
            })

    }

    return (
        <div className='signUp'>
            <div className="form-container">
                <div className="form">
                    <img className='signUpLogo' src={logo} alt="" />
                    <p className='loginPara'>Sign Up  to see posts <br /> from your friends</p>
                    <div>
                        <input type="email" name='email' id='email' placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div>
                        <input type="text" name='name' id='name' placeholder='Name' value={name} onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div>
                        <input type="text" name='username' id='username' placeholder='Username' value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                    </div>
                    <div>
                        <input type="password" name='password' id='password' placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <p className='loginPara' style={{ fontSize: "12px", margin: " 3px 0px" }}>By  signing up , you agree to our terms and conditions</p>
                    <input type="submit" id='submit-btn' value="Signup" onClick={() => { postData() }} />
                </div>
                <div className="form2">
                    Already have an account ?
                    <Link to='/signin'>
                        <span style={{ color: "blue", cursor: "pointer" }}> Signin</span>
                    </Link>
                </div>


            </div>
        </div>
    )
}

export default SignUp