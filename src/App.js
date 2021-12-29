import React, {useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import "antd/dist/antd.css";
import Login from './components/forms/Login'
import Register from './components/forms/Register'
import jwt_decode from 'jwt-decode'
import TopNav from './components/partials/TopNav';
import Dashboard from './components/Dashboard';
import Nutrix from './components/Nutrix';
import HistoryRecord from './components/HistoryRecord';
import Contact from './components/Contact'
import Homepage from './components/Homepage';

function App() {

  const [token, setToken] = useState("")
  const [userData, setUserData] = useState({})

  let handleLogin = (data) => {
    let decoded = jwt_decode(data)
    setToken(data)
    setUserData(decoded)

    localStorage.setItem('userData', JSON.stringify(decoded))
    localStorage.setItem('token', data)
  }

  let handleLogout = () => {
    setToken()
    setUserData({})

    localStorage.removeItem('token')
    localStorage.removeItem('userData')
  }

  return (
    <div className='App'>

    <TopNav handleLogout={handleLogout} /> 

     <Routes>
       <Route path="/" element={ <Homepage /> } />
       <Route path="/login" element={ <Login handleLogin={handleLogin} /> } />
       <Route path="/register" element={ <Register /> }/>
       <Route path="/dashboard" element={ <Dashboard/> } />
       <Route path="/nutrition" element={ <Nutrix/> } />
       <Route path="/history" element={ <HistoryRecord/> } />
       <Route path="/Contact" element={ <Contact/> } />
     </Routes>
    </div>
  );
}

export default App;
