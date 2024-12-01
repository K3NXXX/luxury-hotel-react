import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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

function App() {
	const location = useLocation()
	const authPages = [PAGES.SIGNUP, PAGES.SIGNUPCOMPLETE, PAGES.LOGIN]
	const isAuthPage = authPages.includes(location.pathname)

	useEffect(() => {
		window.scrollTo(0,0)
	}, [location])


	return (
		<div className='App'>
			{!isAuthPage && <Header />}
			<main className='main'>
				<Routes>
					<Route path={PAGES.HOME} element={<Home />} />
					<Route path={PAGES.SIGNUP} element={<Signup />} />
					<Route path={PAGES.SIGNUPCOMPLETE} element={<SignupComplete />} />
					<Route path={PAGES.LOGIN} element={<Login />} />
					<Route path={PAGES.ALLROOMS} element={<AllRooms />} />
					<Route path={PAGES.STANDARTROOM} element={<StandartRoom />} />
					<Route path={PAGES.DELUXEROOM} element={<DeluxeRoom />} />
					<Route path={PAGES.PRESIDENTROOM} element={<PresidentRoom />} />
					<Route path={PAGES.PROFILE} element={<Profile />} />
					<Route path={PAGES.TABLES} element={<RestaurantTable />} />
					<Route path={PAGES.CALLROOMS} element={<CallRoom />} />
				</Routes>
			</main>
			{!isAuthPage && <Footer />}
			<ToastContainer position='bottom-left' />
		</div>
	)
}

export default App
