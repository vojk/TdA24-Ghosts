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
import { LoginPage } from "./components/LoginPage";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createTheme, ThemeProvider } from "@mui/material";
const theme = createTheme({
  palette: {
    primary: {
      main: '#FECB2E',
    },
    secondary: {
      main: '#333333',
    },
  },
  typography: {
    fontFamily: [
      '"Open Sans"',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}> {/* ThemeProvider nastavuje MUI komponentům jejich font, nechám Open Sans podle zadání */}
      <>
        <Router>
          <div className="flex">
            <div className="md:hidden relative">
              <Navbar />
            </div>
            <div className="w-full fixed bottom-0 bg-sky h-20 z-50 hidden md:block">
              <NavbarMobile />
            </div>

            <div className="relative w-full md:mb-20">

              <div className="h-full">
                <Routes>
                  <Route path="/home" element={<ListVizitek />} ></Route>
                  <Route path="/login" element={<LoginPage />} ></Route>
                  <Route path="/" index element={<About />} ></Route>
                  <Route path="/about" index element={<About />} ></Route>
                  <Route path="/lecturers" element={<ListVizitek />}></Route>
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
    </ThemeProvider>
  )
}


export default App;
