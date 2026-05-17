import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu as MenuIcon } from "lucide-react";
import axios from "axios";
import { ReactComponent as TdALogo } from "./../TdA/TdA_LOGO/TeacherDigitalAgency_LOGO_white.svg";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

function MenuItem({ to, children }) {
  return (
    <Button variant="ghost" className="justify-start" asChild>
      <Link to={to}>{children}</Link>
    </Button>
  );
}

export default function Navbar() {
  const [isValidated, setIsValidated] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios({
          method: "POST",
          url: "http://7d17dc13931b9d11.app.tourdeapp.cz/api/lecturers/a/id_lektor",
          data: {
            token: localStorage.getItem("token"),
          },
        });
        setIsValidated(response.status === 200);
      } catch (error) {
        console.error("fetch:", error);
      }
    }
    fetchData();
  }, []);

  function logOut() {
    async function fetchData() {
      try {
        await axios({
          method: "POST",
          url: "http://7d17dc13931b9d11.app.tourdeapp.cz/api/credentials/logout",
          data: {
            token: localStorage.getItem("token"),
          },
        });
      } catch (error) {
        console.error("logout fetch:", error);
      }
    }
    fetchData();
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <TdALogo className="h-10 w-auto" />
          <span className="font-display text-xl text-foreground">Teacher Digital Agency</span>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          <MenuItem to="/about">O TdA</MenuItem>
          <MenuItem to="/lecturers">Lektoři</MenuItem>
          <MenuItem to={isValidated ? "/admin" : "/login"}>
            {isValidated ? "Profil" : "Přihlášení"}
          </MenuItem>
          {isValidated ? (
            <Button variant="outline" onClick={logOut}>
              Odhlásit
            </Button>
          ) : null}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <TdALogo className="h-8 w-auto" />
              <span className="font-display text-lg">Teacher Digital Agency</span>
            </div>
            <Separator />
            <div className="flex flex-col gap-1">
              <MenuItem to="/about">O TdA</MenuItem>
              <MenuItem to="/lecturers">Lektoři</MenuItem>
              <MenuItem to={isValidated ? "/admin" : "/login"}>
                {isValidated ? "Profil" : "Přihlášení"}
              </MenuItem>
            </div>
            {isValidated ? (
              <Button variant="outline" onClick={logOut}>
                Odhlásit
              </Button>
            ) : null}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
