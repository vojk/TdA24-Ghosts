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
          <div className="min-w-[15rem] w-[15.6%] relative text-white">
            <Navbar />
          </div>
          <div className="relative w-full">
            <div className="w-full bottom-0 fixed bg-sky h-20 z-50 md:hidden block">
              <NavbarMobile />
            </div>
            <div className="mb-12 h-full">
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


<>
  <Router>
    <div className="md:flex">
      <div className="min-w-[16rem] max-w-[20rem] w-full relative hidden md:block">
        <Navbar />
      </div>
      <div className="flex flex-col h-[100vmax]">
        <div className="md:h-auto h-full overflow-scroll no-scrollbar">
          <Routes>
            <Route path="/home" element={<ListVizitek />} ></Route>
            <Route path="/" element={<ListVizitek />}></Route>
            <Route path="/lecturer" element={<ProfilExample />} ></Route>
            <Route path="/lecturer" >
              <Route path=":UUID" element={<Profil />} />
            </Route>
            <Route path="*" element={<ErrorPage />}></Route>
          </Routes>
        </div>
        <div className="min-w-[16rem] max-h-[10%] h-full max-w-[20rem] w-full relative md:hidden ">
          <div className="">
            <NavbarMobile />
          </div>
        </div>
      </div>
    </div>
  </Router>
</>

export default App;
