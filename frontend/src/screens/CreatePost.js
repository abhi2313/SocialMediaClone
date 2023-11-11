import React, { useState, useEffect } from 'react'
import '../css/CreatePost.css'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'

export default function CreatePost() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"

  const navigate=useNavigate()
  const [body, setBody] = useState('')
  const [image, setImage] = useState('')
  const [url, setUrl] = useState('')

  const notifyA = (msg) => {
    toast.error(msg)

  }
  const notifyB = (msg) => {
    toast.success(msg)
  }


  useEffect(() => {
    if (url) {
      fetch("/createPost", {
        method: "post",
        headers:
        {
          "Content-type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          body,
          pic: url,

        })
      })
        .then(res => res.json())
        .then(data => {
          if(data.error)
          {
            notifyA(data.error)
          }
          else
          {
            notifyB("Successfully Posted")
            navigate('/')

          }
        })
        .catch(err => console.log(err))
    }


  }, [url])



  const postDetails = () => {
    // console.log(body,image);
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



  const loadfile = (event) => {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src)
    }
  }
  return (
    <div className='createP'>
      <div className="post-header">
        <h4>Create new Post</h4>

        <button id="post-btn" onClick={postDetails}>Share</button>
      </div>
      <div className="main-div">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAAY1BMVEX///8AAABWVlYbGxvIyMji4uLPz8/Y2Njd3d3Ly8vU1NRqamr8/PyGhoaYmJhaWlr29vY7Ozt4eHgqKirt7e2fn5+mpqaysrLBwcEvLy8kJCR+fn5ycnKPj49LS0tCQkIODg6tztHVAAAC70lEQVR4nO3b6XqiMBQGYCKLqGxaZNFqvf+r7ExnwpKcAFk48jw930+l6SuYkBOi51EoFAqFQqFoZJ/lO4Tk2V4BSD4ZWj4TSFCc8QSMnQuAcMIUMHaSBRGugLFIIqTYhFQifGATPiSCj03w1QQ/bYLV0qT+PMFXDRuOcvRnCdd1BZ6XzRLCtQnB+wkHIvw+QhlU1yqQ7ohohKTm9/5d/R5C0w6G4vb4BkLGxhmeCByCKGCsQibUkoCxAJUQ3gBC/w8xCA9AMLgUGARQwJ582o5AaGBC13C0PkHuDv/COyYC4aIg8BkzAkFVFt5/FUFVE/FJKQKhUhB4AYdAKGHBi08cEAheDhK6EvKIQDiAhBKTAPaJR/euE0IY7cF1Gp7kKQkGCxoOCNHOZ6+2mjqk/BIFg0msPYHPR9KpE1GMV41Gx1oT9n27k8cF/cXYHUbv2BLiwUrItMELs0ue55esFF63JBSjL9rsOkCSAFfLkiAsDNZTx6piR5DuQCYGKwIwOW9wCeDiqP7KlAWhhMoD5msP6OaERLE2etM1mBOUTwrOYsf/c8JiaJ3dlqCamv81iIB7y77U9xA+vuoSoEq1Sz469H9JeQfbMSfMPCnIB4NgV0ypxm8zQvmaJrBLd+i1f1ExfhsRit2MoJ8UjUop+PtgRFCVaMP8XPpSsILjtwkBXi8Q46eV3G8PUmNGBFWxvijyAygDQmwjYK/YnlDaPrOSxk5dAjAf18xNNOgSlnSGmTwFA7+yCwmqKlkr+XgCqUew6gx9nuaEo69qVDOj5/Q6hNLdo/zUkCAWhjZ5GBEcdAbQsJzgpDMMUmsTAlVTxmk0CaFzQWdYSCjAmsE2kQYhWWlfS7icsGySop+fW9YiwlXVhBMD/5pNEdx3hj5tsYQwO2O3yjOZJ8Qux2Ugp3lCq/pbV+EfcWJHD1aIQAQiEIEIRFhO2MD22w1sQt7AVuwNbEjfwrZ8L3FbS08G/nGCt4GfaFAoFAqFQqGA+QauCTOfkC7jXwAAAABJRU5ErkJggg==" alt="" id='output' />
        <input type="file" accept='image/*' onChange={(event) => {
          loadfile(event)
          setImage(event.target.files[0])

        }} />

      </div>
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img src={JSON.parse(localStorage.getItem('user')).Photo?JSON.parse(localStorage.getItem('user')).Photo:picLink}/>
          </div>
          <h5>{JSON.parse(localStorage.getItem('user')).name}</h5>
        </div>
        <textarea value={body}
          onChange={(e) => { setBody(e.target.value) }}
          type='text' placeholder='write a caption .....'></textarea>

      </div>
    </div>
  )
}

// export default CreatePost