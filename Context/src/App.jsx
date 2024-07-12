import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './compo/Home.jsx';
import Navbar from './compo/Navbar.jsx';
import Form from './compo/Form.jsx';
import './css/app.css';

function App() {
  

  return (
    <Router>
      <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Form/>}/>
    </Routes>
    </Router>
  )
}

export default App
