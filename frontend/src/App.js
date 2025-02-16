import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react';
import RefreshHandler from './RefreshHandler';

function App() {
  const [isAuthenticated,setAuthenticated] = useState(false);
  const PrivateRoute =({element})=>{
    return isAuthenticated ? element : <Navigate to="/login"/>
  }


  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setAuthenticated}/>
      <Routes>
        /*Defalut path  */
        <Route path='/' element={<Navigate to = "/login"/>}/>
        /*Remaining paths */
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<PrivateRoute element={<Home/>}/>} />
      </Routes>
    </div>
  );
}

export default App;
