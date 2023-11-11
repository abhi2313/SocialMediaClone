import React, { useEffect, useState } from 'react'
// import PostDetail from './PostDetail'
import '../css/Profile.css'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const UserProfile = () => {
    var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"

    const { userid } = useParams()
    const [user, setUser] = useState("")
    // const [pics, setPics] = useState([])
    // const [show, setShow] = useState(false)
    const [posts, setPosts] = useState([])
    const [isFollow, setIsFollow] = useState(false)
    const navigate=useNavigate()
    // const [followers, setFollowers] = useState(0)
    // const [following, setFollowing] = useState(0)
    useEffect(()=>{
        const token=localStorage.getItem('jwt')
        if(!token)
        {
          navigate('/signin')
        }
    
      },[])

    const followUser = (userId) => {
        fetch('/follow', {
            method: "put",

            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                followId: userId
            })


        })
            .then((res) => res.json())
            .then((data) => {
                
                setIsFollow(true)

            })

    }
    const unfollowUser = (userId) => {
        fetch('/unfollow', {
            method: "put",

            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                followId: userId
            })


        })
            .then((res) => res.json())
            .then((data) => {
                setIsFollow(false)
                


            })

    }




    useEffect(() => {
        


        fetch(`/user/${userid}`, {
            headers:
            {
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            }

        })
            .then(res => res.json())
            .then(result => {
                setUser(result.user)
               
                setPosts(result.post)
                if (result.user.followers.includes(
                    JSON.parse(localStorage.getItem("user"))._id
                )) {

                    setIsFollow(true)
                }
            })
            
       



    }, [isFollow])
    return (
        <div className='profile'>
            <div className="profile-frame">
                <div className="profile-pic">
                    <img src={user.Photo?user.Photo:picLink} alt="" />
                </div>
                <div className="profile-data">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <h1>{user.name}</h1>
                        <button className='followBtn' onClick={() => {

                            if (isFollow) {
                                unfollowUser(user._id)
                            }
                            else {
                                followUser(user._id)
                            }


                        }}>
                            {isFollow ? "Unfollow" : "Follow"}

                        </button>
                    </div>

                    <div className="profile-info">
                        <p>{posts.length} Posts</p>
                        <p>{user.followers ? user.followers.length : "0"} Followers</p>
                        <p>{user.following ? user.following.length : "0"} following </p>


                    </div>
                </div>
            </div>
            <hr style={{ width: "90%", opacity: "0.8", margin: "25px auto " }} />
            <div className="gallery">
                {
                    posts.map((pic) => {
                        return (
                            <img src={pic.photo} key={pic._id} className='item'></img>
                        )
                    })

                }


            </div>

           


        </div>
    )
}

export default UserProfile