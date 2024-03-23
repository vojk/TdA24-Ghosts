
import './App.css';
import PromptBar from './components/PromptBar';
import MainChat from './components/MainChat';
import Aktivita from './components/Aktivita';
import ErrorPage from './components/ErrorPage';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

import Navbar from './components/navigace/Navbar';
import NavbarMobile from './components/navigace/Navbar-mobile';
import Footer from './components/navigace/Footer';

import CreateActivity from "./components/CreateActivity/CreateActivity";

import { About } from './components/About';

import { LoginPage } from './components/Login/LoginPage'

import { AdminPanelSettings } from './components/AdminPanel/AdminPanelSettings';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import MainPage from './components/MainPage';
import { Login } from '@mui/icons-material';


function App() {
  const theme = createTheme({
    palette: {
      primary: {
        /*  main: '#FECB2E', */
        main: '#FECB2E',
      },
      secondary: {
        /* main: '#333333', */
        main: '#333333',
      },
      success: {
        main: '#00384D',
      },
      text: {
        main: '#ffffff'
      },
    },
    typography: {
      fontFamily: [
        '"Open Sans"',
        'sans-serif',
      ].join(','),
    },

  },
  );

  return (
    /*    <div className="App text-2xl">
         <Aktivita/>
       </div> */

    <ThemeProvider theme={theme}>
      <>      <Router>
        <div className="flex flex-col">
          <div className="flex">
            <div className="md:hidden relative">
              <Navbar />
            </div>
            <div className="w-full fixed bottom-0 bg-sky h-20 z-50 hidden md:block">
              <NavbarMobile />
            </div>

            <div className="relative w-full flex flex-col justify-between md:mb-20 min-h-screen">

              <div className="h-full">
                <Routes>
                  <Route path="/" index element={<MainPage />} ></Route>
                  <Route path="/activities" element={"seznam"}></Route>
                  <Route path="/activities" >
                    <Route path=":UUID" element={<Aktivita />} />
                  </Route>
                  <Route path="/about" element={<About/>}></Route>
                  <Route path="/create" element={<CreateActivity/>}></Route>
                  <Route path="/login" element={<LoginPage/>}></Route>
                  <Route path="/admin" element={<AdminPanelSettings />}></Route>
                  <Route path="*" element={<ErrorPage />}></Route>
                </Routes>

              </div>
              <Footer />
            </div>

          </div>
        </div>
      </Router>
    </>
    </ThemeProvider >
  );
}

export default App;
