import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import { PAGES } from './constants/url.constants'
import Home from './pages/Home/Home'

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path={PAGES.HOME} element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
