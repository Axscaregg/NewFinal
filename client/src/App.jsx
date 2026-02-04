import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from "./page/home.jsx";
import Login from "./page/Login.jsx";
import Register from "./page/register.jsx";
import Profile from "./page/profile.jsx";
import Profile_user from "./page/profile_user.jsx";
import Education from "./page/education.jsx";
import Protectrouter from "./api/protectrouter.jsx";
import Campus from "./page/Campus.jsx"
import RegisterEmployers from "./page/RegisterEmployer.jsx"
import Employer_User from "./page/employer_User.jsx"
import PostJob from "./page/PostJob.jsx"
function App() {

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/employer_user" element={<Employer_User/>}/>
        <Route path="/postjob" element={<PostJob/>}/>
        <Route path="/profile" element={
            <Protectrouter>
                <Profile/>
            </Protectrouter>
            }/>
        <Route path="/profile/me" element={
            <Protectrouter>
                <Profile_user/>
            </Protectrouter>}/>
        <Route path="/profiles" element={
            <Protectrouter>
                <Education/>
            </Protectrouter>}/>
        <Route path="/Campus" element={
            <Protectrouter>
                <Campus/>
            </Protectrouter>
        }/>
        <Route path="/RegisterEm" element={

                <RegisterEmployers/>

        }/>
    </Routes>
  )
}

export default App
