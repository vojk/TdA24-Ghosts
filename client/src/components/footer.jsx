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

export default function Footer() {
  return (
    <>
      <div className={"w-full flex text-white my-[1rem]"}>
        <div className="w-full h-full flex justify-between sm:mr-0 mr-2 py-8 bg-prussian backdrop-blur-sm rounded-md drop-shadow-sm shadow-md">
          <TdALogo className={"h-[64px] mx-6"} />
          <div className="flex flex-row gap-2">
            <MenuItem to={"/"} text={"O TdA"} />
            <MenuItem to={"/lecturers"} text={"Lektoři"} />
            <div className="mx-4 ml-0 gap-2 flex items-center relative">
            <p className="text-[1rem] font-bold font-odstavec">Copyright © Teacher Digital Agency 2024</p>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}