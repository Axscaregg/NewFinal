import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from "./page/home.jsx";
function App() {

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/home" element={<Home/>}/>

    </Routes>
  )
}

export default App
