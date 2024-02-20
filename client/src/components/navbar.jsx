import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as TdALogo } from "./../TdA/TdA_LOGO/TeacherDigitalAgency_LOGO_white.svg";
import { ReactComponent as TdAListLekt } from "./../TdA/TdA_ikony/SVG/TdA_ikony_studium_white.svg";
import { ReactComponent as TdANapad } from "./../TdA/TdA_ikony/SVG/TdA_ikony_napad_white.svg";
import { ReactComponent as TdA_nastaveni_white} from "../TdA/TdA_ikony/SVG/TdA_ikony_nastaveni_white.svg";



function MenuItem({ Icon, text, to }) {
  return (
    <Link to={to} className="mx-8 gap-2 flex items-center relative hover:after:contents hover:after:h-full hover:after:absolute hover:after:bg-white hover:after:w-1 hover:after:-left-4 hover:after:rounded">
      <Icon className={"w-8"} />
      <p className="text-[1rem] font-bold font-odstavec">{text}</p>
    </Link>
  )
}

export default function Menu() {
  return (
    <>
      <div className={"min-w-[15rem] w-[100%] max-w-[15rem] h-screen top-0 sticky text-white "}>
        <div className="w-[100%] top-0 h-screen sticky flex flex-col py-12 bg-sky ">
          <TdALogo className={"h-[88px] mb-12"} />
          <div className="flex flex-col gap-5">
            <MenuItem Icon={TdANapad} to={"/"} text={"O TdA"} />
            <MenuItem Icon={TdAListLekt} to={"/lecturers"} text={"Lektoři"} />
            <MenuItem Icon={TdA_nastaveni_white} to={"/login"} text={"Přihlášení"} />
          </div>

        </div>
      </div>
    </>
  )
}