import Typography from '@mui/material/Typography'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { initializeUser } from './reducers/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ProfilePage from './pages/Profile';
import Post from './pages/Post';
import ArtDetailsPage from './pages/ArtDetails';

function App() {
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />

        <Route element={<Layout />}> 
            <Route path='/' element={<Home />} />
            { token && 
              <>
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/post' element={<Post />} />
                <Route path='/art-details' element={<ArtDetailsPage />} />


              </>
                
              }

          </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
