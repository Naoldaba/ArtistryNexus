import Typography from '@mui/material/Typography'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />


        <Route element={<Layout />}> 
          <Route path='/' element={<Home />} />

        </Route>

      </Routes>
    </Router>
  );
}

export default App;
