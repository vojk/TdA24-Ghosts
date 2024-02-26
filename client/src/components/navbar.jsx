import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as TdALogo } from "./../TdA/TdA_LOGO/TeacherDigitalAgency_LOGO_white.svg";
import { ReactComponent as TdAListLekt } from "./../TdA/TdA_ikony/SVG/TdA_ikony_studium_white.svg";
import { ReactComponent as TdANapad } from "./../TdA/TdA_ikony/SVG/TdA_ikony_napad_white.svg";
import { ReactComponent as TdA_nastaveni_white } from "../TdA/TdA_ikony/SVG/TdA_ikony_nastaveni_white.svg";



function MenuItem({ Icon, text, to }) {
  //<Icon className={"w-8"} /> 
  return (
 //   <Link to={to} className="mx-4 ml-0 gap-2 flex items-center relative hover:after:contents hover:after:w-full hover:after:absolute hover:after:bg-white hover:after:h-0.5 hover:after:-bottom-0 hover:after:rounded transition-all">
    <Link to={to} className="mx-4 ml-0 gap-2 flex items-center relative underline decoration-[-100%] decoration-transparent hover:decoration-white hover:decoration-2 transition-all">

      <p className="text-[1rem] font-bold font-odstavec">{text}</p>
    </Link>
  )
}

export default function Menu() {
  return (
    <>
      <div className={"h-screen w-fit flex top-0 sticky text-white justify-center"}>
        <div className="w-[95%] top-0 h-[calc(100%-2rem)] sticky flex flex-col self-center py-12 bg-sky backdrop-blur-sm rounded-md drop-shadow-sm px-16 items-center shadow-md">
          <TdALogo className={"h-[64px] mb-12"} />
          <div className="flex flex-col gap-2">
            <MenuItem to={"/"} text={"O TdA"} />
            <MenuItem to={"/lecturers"} text={"Lektoři"} />
            <MenuItem to={"/login"} text={"Přihlášení"} />
          </div>

        </div>
      </div>
    </>
  )
}