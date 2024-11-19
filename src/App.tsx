import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import { PAGES } from './constants/url.constants'
import './global.scss'
import AllRooms from './pages/AllRooms/AllRooms'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import StandartRoom from './pages/StandartRoom/StandartRoom'

function App() {
	return (
		<div className='App'>
			<Header />
			<main className='main'>
				<Routes>
					<Route path={PAGES.HOME} element={<Home />} />
					<Route path={PAGES.REGISTER} element={<Register />} />
					<Route path={PAGES.ALLROOMS} element={<AllRooms />} />
					<Route path={PAGES.STANDARTROOM} element={<StandartRoom />} />
				</Routes>
			</main>
			<Footer />
		</div>
	)
}

export default App
