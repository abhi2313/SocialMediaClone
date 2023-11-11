import React, { useContext } from 'react'
import logo from '../img/logo.png'
import '../css/NavBar.css'
import { Link, Navigate, } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'
import { useNavigate } from 'react-router-dom'



const Navbar = () => {
    const { setUserLogin } = useContext(LoginContext)
    const { setModalOpen } = useContext(LoginContext)
    const navigate=useNavigate()

    const loginStatus = () => {
        const token = localStorage.getItem('jwt')
        if (token) {
            return [
                <>
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    <Link to="/profile">
                        <li>My Profile</li>
                    </Link>
                    <Link to="/createPost">
                        <li>Create Post</li>
                    </Link>
                    <Link to="/followingpost">
                        <li>My following</li>
                    </Link>
                    {/* <Link to={""}>
                        <button className='primaryBtn' onClick={() => {
                            // setModalOpen(true)
                            localStorage

                        }}>Logout</button>
                    </Link> */}
                    <button className='logoutBtn' onClick={()=>{
                        localStorage.clear()
                        setUserLogin(false)
                        navigate('/signin')

                    }}>
                        Logout 
                    </button>

                </>
            ]

        }
        else {
            return [
                <>
                    <Link to="/signup">
                        <li>Signup</li>
                    </Link>
                    <Link to="/signin">
                        <li>Signin</li>
                    </Link>
                </>
            ]

        }
    }
    return (
        <div className='navbar'>
            <img style={{cursor:"pointer"}} src={logo} alt='' onClick={()=>{
                navigate('/')
                
            }}/>

            <ul className="nav-menu">
                {loginStatus()}

            </ul>
        </div>
    )
}

export default Navbar