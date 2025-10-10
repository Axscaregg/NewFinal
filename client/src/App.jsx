import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from "./page/home.jsx";
import Login from "./page/Login.jsx";
import Register from "./page/register.jsx";
import Profile from "./page/profile.jsx";
import Profile_user from "./page/profile_user.jsx";
function App() {

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/profile/me" element={<Profile_user/>}/>
    </Routes>
  )
}

export default App
