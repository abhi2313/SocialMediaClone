import React, { useContext, useEffect } from 'react'
import logo from '../img/logo.png'
import '../css/NavBar.css'
import { Link, Navigate, } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'
import { useNavigate } from 'react-router-dom'



const Navbar = () => {
    const { setUserLogin } = useContext(LoginContext)
    const { setModalOpen } = useContext(LoginContext)
    const navigate = useNavigate()


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
                    <button className='logoutBtn' onClick={() => {
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
    const loginStatusMobile = () => {
        const token = localStorage.getItem('jwt')
        if (token) {
            return [
                <>
                    <Link to="/">
                        <li><span class="material-symbols-outlined">
                            home
                        </span></li>
                    </Link>
                    <Link to="/profile">
                        <li><span class="material-symbols-outlined">
                            account_circle
                        </span></li>
                    </Link>
                    <Link to="/createPost">
                        <li><span class="material-symbols-outlined">
                            add_box
                        </span></li>
                    </Link>
                    <Link to="/followingpost">
                        <li><span class="material-symbols-outlined">
                            account_circle
                        </span></li>
                    </Link>

                    <li onClick={() => {
                        localStorage.clear()
                        setUserLogin(false)
                        navigate('/signin')

                    }}>
                        <span class="material-symbols-outlined">
                            logout
                        </span>
                    </li>

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
            <img id='insta-logo' style={{ cursor: "pointer" }} src={logo} alt='' onClick={() => {
                navigate('/')

            }} />

            <ul className="nav-menu">
                {loginStatus()}

            </ul>
            <ul className="nav-mobile">
                {loginStatusMobile()}

            </ul>
        </div>
    )
}

export default Navbar