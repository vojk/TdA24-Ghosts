import "./App.css"
import { ListVizitek } from "./components/ListVizitek";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; */
/* import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'; */
import ErrorPage from "./components/error";
import Navbar from "./components/navbar";
import NavbarMobile from "./components/navbar-mobile";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useRouteMatch
} from "react-router-dom";
import { ProfilExample } from "./components/ProfilExample";
import { Profil } from "./components/Profil";

import { About } from "./components/About";

function LoginPage() {

  return (
    <>
      <p>Tady bude login...</p>
    </>
  )
}

function App() {
  return (
    <>
      <Router>
        <div className="md:flex">
          <Navbar />
          <div className="relative w-full">
            <div className="w-full bottom-0 fixed bg-sky h-20 z-50 md:hidden block">
              <NavbarMobile />
            </div>
            <div className="h-full">
              <Routes>
                <Route path="/home" element={<ListVizitek />} ></Route>
                <Route path="/login" element={<LoginPage />} ></Route>
                <Route path="/about" element={<About />} ></Route>
                <Route path="/" element={<ListVizitek />}></Route>
                <Route path="/lecturer" element={<ProfilExample />} ></Route>
                <Route path="/lecturer" >
                  <Route path=":UUID" element={<Profil />} />
                </Route>
                <Route path="*" element={<ErrorPage />}></Route>
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </>
  )
}


export default App;
