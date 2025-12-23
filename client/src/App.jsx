import { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';


import HomePage from './pages/home.jsx';
import LoginPage from './pages/login.jsx';
import ProfilePage from './pages/profile.jsx';
import NavBar from './components/NavBar.jsx';
import { themeSettings } from './theme.js';
 
import './App.css'

function App() {
  const mode  = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path='/' element={isAuth ? <HomePage /> : <Navigate to='/login'/>} />
          <Route path='/login' element={!isAuth ? <LoginPage /> : <Navigate to='/'/>} />
          <Route path='/profile/:userId' element={isAuth ? <ProfilePage /> : <Navigate to='/login' />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </ThemeProvider>
      

      
    </>
  )
}

export default App
