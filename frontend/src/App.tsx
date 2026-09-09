import { useState } from "react";
import Login from "./pages/Login/Login.js";

import {BrowserRouter, Routes, Route} from "react-router-dom"
import DashBoard from "./pages/Dashboard/Dashborad.js"
import ProtectedRoute from "./components/auth/ProtectedRoute";
import './css/app.module.css';

function App() {
  return (
    <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/dashboard" element={<ProtectedRoute><DashBoard/></ProtectedRoute>}/>
  </Routes>

  </BrowserRouter>

  )
    
}

export default App;
