import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import { PAGES } from './constants/url.constants'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import "./global.scss"

function App() {
	return (
		<div className='App'>
			<Header />
			<main className='main'>
				<Routes>
					<Route path={PAGES.HOME} element={<Home />} />
					<Route path={PAGES.REGISTER} element={<Register />} />
				</Routes>
			</main>
				<Footer />
		</div>
	)
}

export default App
