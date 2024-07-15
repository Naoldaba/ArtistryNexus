import Typography from '@mui/material/Typography'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}> 
          <Route path='/' element={<Home />} />

        </Route>

      </Routes>
    </Router>
  );
}

export default App;
