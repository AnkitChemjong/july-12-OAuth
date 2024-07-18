import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './compo/Home.jsx';
import Navbar from './compo/Navbar.jsx';
import axios from 'axios';
import Form from './compo/Form.jsx';
import './css/app.css';

axios.defaults.withCredentials=true;
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
