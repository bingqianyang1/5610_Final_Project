import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import VideoPlayer from './pages/VideoPlayer';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/' element={<Home />} />
            <Route exact path='/videoPlayer' element={<VideoPlayer />} />
            <Route exact path='/tvs' element={<Home />} />
            <Route exact path='/movies' element={<Home />} />
            <Route exact path='/collections' element={<Home />} />


        </Routes>
    </BrowserRouter>
  )
}



