import React, { useState } from "react";
import { Link } from "react-router-dom";


import { ReactComponent as TdALogo } from "../../svg/TdA_LOGO/TeacherDigitalAgency_LOGO_white.svg";
import { ReactComponent as TdAListLekt } from "../../svg/TdA_ikony/SVG/TdA_ikony_studium_white.svg";
import { ReactComponent as TdANapad } from "../../svg/TdA_ikony/SVG/TdA_ikony_napad_white.svg";
import { ReactComponent as TdA_nastaveni_white } from "../../svg/TdA_ikony/SVG/TdA_ikony_nastaveni_white.svg";


import { useEffect } from "react";
import axios from "axios";



function MenuItem({ Icon, text, to }) {
  //<Icon className={"w-8"} /> 
  return (
    //   <Link to={to} className="mx-4 ml-0 gap-2 flex items-center relative hover:after:contents hover:after:w-full hover:after:absolute hover:after:bg-white hover:after:h-0.5 hover:after:-bottom-0 hover:after:rounded transition-all">
    <Link to={to} className="mx-4 ml-0 gap-2 flex items-center relative underline decoration-[-100%] decoration-transparent hover:decoration-white-50 hover:decoration-2 transition-all">

      <p className="text-[1rem] font-bold font-odstavec">{text}</p>
    </Link>
  )
}

export default function Menu() {
  const [isValidated, setIsValidated] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        if (localStorage.getItem('token') == null) {
          setIsValidated(false);
        } else {
          setIsValidated(true);
        }
      }
      catch (error) {
        console.error("fetch:", error);
        console.log(error.status)
      }
    }
    fetchData();
  });

  function LogOut() {
    localStorage.removeItem('token');
    window.location.href = "/";
  }

  return (
    <>
      <div className={"h-screen w-fit flex top-0 sticky text-white-50 justify-center"}>
        <div className="top-0 h-full sticky flex flex-col self-center py-12 bg-sky-50 backdrop-blur-sm drop-shadow-sm px-10 items-center shadow-md min-w-[15rem]">
          <TdALogo className={"min-h-[64px] mb-12"} />
          <div className="flex flex-col h-full gap-2">
            <MenuItem to={"/about"} text={"O projektu AMOS"} />
            <MenuItem to={"/"} text={"Vyhledávání"} />
            <MenuItem to={"/activities"} text={"Aktivity"} />
            <MenuItem to={"/create"} text={"Tvořte aktivity"} />
            {isValidated ? <MenuItem to={"/admin"} text={"Profil"} /> : <MenuItem to={"/login"} text={"Přihlášení"} />}
            {isValidated ? <div className="mt-auto" onClick={LogOut}><MenuItem to={"/"} text={"Odhlásit"} /></div> : null}
          </div>

        </div>
      </div>
    </>
  )
}