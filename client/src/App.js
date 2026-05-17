import { ListVizitek } from "./components/ListVizitek";
import ErrorPage from "./components/error";
import Navbar from "./components/navbar";

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { Profil } from "./components/Profil";

import { About } from "./components/About";
import { LoginPage } from "./components/LoginPage";

import Footer from "./components/footer";

import LektorAdmin from "./components/LektorAdmin";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/home" element={<ListVizitek />} ></Route>
            <Route path="/login" element={<LoginPage />} ></Route>
            {/* <Route path="/register" element={<RegisterPage />} ></Route> */}
            <Route path="/" index element={<About />} ></Route>
            <Route path="/about" index element={<About />} ></Route>
            <Route path="/admin" index element={<LektorAdmin />} ></Route>
            <Route path="/lecturers" element={<ListVizitek />}></Route>
            <Route path="/lecturer">
              <Route path=":UUID" element={<Profil />} />
            </Route>
            <Route path="*" element={<ErrorPage />}></Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
