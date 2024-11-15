import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import { PAGES } from './constants/url.constants'

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
