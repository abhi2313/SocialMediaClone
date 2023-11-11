import React, { useState, useEffect, useRef } from 'react'
import { useNavigate ,useLocation} from 'react-router-dom'

function ProfilePic({ changeprofile }) {
    const hiddenFileInput = useRef(null)
    const location=useLocation()
    const [image, setImage] = useState('')
    const [url, setUrl] = useState('')
    const navigate=useNavigate()

    const handleClick = () => {

        hiddenFileInput.current.click()

    }
    useEffect(()=>{
        const token=localStorage.getItem('jwt')
        if(!token)
        {
            navigate("/signin",{
                state:{
                  previousUrl:location.pathname
                }
              })
        }
    
      },[])

    useEffect(() => {
        if (image) {
            postDetails()

        }



    }, [image])

    useEffect(() => {
        if (url) {
            postPic()
        }

    }, [url])

    const postPic = () => {

        fetch("/uploadProfilePic", {
            method: "put",
            headers:
            {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({

                pic: url,

            })
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                changeprofile()
                window.location.reload()

            })
            .catch(err => console.log(err))


    }


    const postDetails = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "socialmediaclone")
        data.append("cloud_name", "abhi2313")
        fetch("https://api.cloudinary.com/v1_1/abhi2313/image/upload", {
            method: "post",
            body: data
        })
            .then((res) => res.json())
            .then((data) => setUrl(data.url))
            .catch(err => console.log(err))
    }
    return (
        <div className='profilePic darkBg'>
            <div className="changePic centered">
                <div>
                    <h2>
                        Change Profile Photo
                    </h2>
                </div>
                <div style={{ borderTop: "1px solid black" }}>
                    <button className='upload-btn' style={{ color: "blue" }} onClick={handleClick}>Upload photo</button>
                    <input ref={hiddenFileInput} type="file" name="" id="" accept='image/*' style={{ display: "none" }} onChange={(e) => { setImage(e.target.files[0]) }} />
                </div>
                <div style={{ borderTop: "1px solid black" }}>
                    <button className='upload-btn' onClick={()=>{
                        setUrl(null)
                        postPic()
                    }} style={{ color: "red" }}>
                        Remove current photo
                    </button>
                </div>
                <div style={{ borderTop: "1px solid black" }}>
                    <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "15px" }}
                        onClick={changeprofile}>
                        Cancel
                    </button>
                </div>

            </div>


        </div>
    )
}

export default ProfilePic
