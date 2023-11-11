
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route ,Navigate} from 'react-router-dom'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './screens/Profile';
import Home from './screens/Home';
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePost from './screens/CreatePost';
import { useState } from 'react';
import { LoginContext } from './context/LoginContext';
import UserProfile from './components/UserProfile';
import MyFollowingPost from './screens/MyFollowingPost';


function App() {
  // const navigate=useNavigate()
  const [userLogin, setUserLogin] = useState(false)

  return (
    <BrowserRouter>
      <div className="App">
        <LoginContext.Provider value={{ userLogin,setUserLogin }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route exact path="/profile" element={<Profile />}></Route>
            <Route  path="/createPost" element={<CreatePost />}></Route>
          
            
            <Route path="/profile/:userid" element={<UserProfile />}></Route>
            <Route path="/followingPost" element={<MyFollowingPost />}></Route>

          </Routes>
          <ToastContainer theme='dark' />
          {/* {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>} */}
        </LoginContext.Provider>

      </div>
    </BrowserRouter>
  );
}


export default App;
