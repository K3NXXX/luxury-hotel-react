import { useEffect } from 'react'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AnimatePresence } from 'framer-motion'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import { PAGES } from './constants/url.constants'
import './global.scss'
import AllRooms from './pages/AllRooms/AllRooms'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import SignupComplete from './pages/Auth/SignupComplete'
import CallRoom from './pages/CallRoom/CallRoom'
import DeluxeRoom from './pages/DeluxeRoom/DeluxeRoom'
import Home from './pages/Home/Home'
import PresidentRoom from './pages/PresidentRoom/PresidentRoom'
import Profile from './pages/Profile/Profile'
import RestaurantTable from './pages/RestaurantTable/RestaurantTable'
import StandartRoom from './pages/StandartRoom/StandartRoom'
import AnimatedRoute from './components/AnimatedRoute/AnimatedRoute'

function App() {
  const location = useLocation()
  const authPages = [PAGES.SIGNUP, PAGES.SIGNUPCOMPLETE, PAGES.LOGIN]
  const isAuthPage = authPages.includes(location.pathname)

  const isAuthenticated = localStorage.getItem('jwt') 

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <div className='App'>
      {!isAuthPage && <Header />}
      <main className='main'>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path={PAGES.HOME}
              element={<AnimatedRoute><Home /></AnimatedRoute>}
            />
            <Route
              path={PAGES.SIGNUP}
              element={<AnimatedRoute><Signup /></AnimatedRoute>}
            />
            <Route
              path={PAGES.SIGNUPCOMPLETE}
              element={<AnimatedRoute><SignupComplete /></AnimatedRoute>}
            />
            <Route
              path={PAGES.LOGIN}
              element={<AnimatedRoute><Login /></AnimatedRoute>}
            />
            <Route
              path={PAGES.ALLROOMS}
              element={<AnimatedRoute><AllRooms /></AnimatedRoute>}
            />
            <Route
              path={PAGES.STANDARTROOM}
              element={<AnimatedRoute><StandartRoom /></AnimatedRoute>}
            />
            <Route
              path={PAGES.DELUXEROOM}
              element={<AnimatedRoute><DeluxeRoom /></AnimatedRoute>}
            />
            <Route
              path={PAGES.PRESIDENTROOM}
              element={<AnimatedRoute><PresidentRoom /></AnimatedRoute>}
            />
            <Route
              path={PAGES.PROFILE}
              element={isAuthenticated ? (
                <AnimatedRoute><Profile /></AnimatedRoute>
              ) : (
                <Navigate to={PAGES.LOGIN} replace />
              )}
            />
            <Route
              path={PAGES.TABLES}
              element={<AnimatedRoute><RestaurantTable /></AnimatedRoute>}
            />
            <Route
              path={PAGES.CALLROOMS}
              element={<AnimatedRoute><CallRoom /></AnimatedRoute>}
            />
          </Routes>
        </AnimatePresence>
      </main>
      {!isAuthPage && <Footer />}
      <ToastContainer position='bottom-left' />
    </div>
  )
}

export default App
