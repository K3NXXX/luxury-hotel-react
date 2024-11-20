import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { PAGES } from "./constants/url.constants";
import Home from "./pages/Home/Home";
import Signup from "./pages/Auth/Signup";
import "./global.scss";
import Login from "./pages/Auth/Login";
import SignupComplete from "./pages/Auth/SignupComplete";

function App() {
  const location = useLocation();
  const authPages = [PAGES.SIGNUP, PAGES.SIGNUPCOMPLETE, PAGES.LOGIN];
  const isAuthPage = authPages.includes(location.pathname);
  return (
    <div className="App">
      {!isAuthPage && <Header />}
      <main className="main">
        <Routes>
          <Route path={PAGES.HOME} element={<Home />} />
          <Route path={PAGES.SIGNUP} element={<Signup />} />
          <Route path={PAGES.SIGNUPCOMPLETE} element={<SignupComplete />} />
          <Route path={PAGES.LOGIN} element={<Login />} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
