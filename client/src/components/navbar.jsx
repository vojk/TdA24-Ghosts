import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as TdALogo } from "./../TdA/TdA_LOGO/TeacherDigitalAgency_LOGO_white.svg";
import { ReactComponent as TdAListLekt } from "./../TdA/TdA_ikony/SVG/TdA_ikony_studium_white.svg";
import { ReactComponent as TdANapad } from "./../TdA/TdA_ikony/SVG/TdA_ikony_napad_white.svg";


function MenuItem({ Icon, text, to }) {
  return (
    <div className="mx-8 gap-2 flex items-center">
      <Icon className={"w-8"} />
      <Link className="text-[1rem] font-bold font-odstavec" to={to}>{text}</Link>
    </div>
  )
}

export default function Menu() {
  return (
    <>
      <div className={"min-w-[15rem] w-[15%] relative text-white "}>
        <div className="w-[100%] top-0 h-screen sticky flex flex-col py-12 bg-sky ">
          <TdALogo className={"h-[88px] mb-12"} />
          <div className="flex flex-col gap-3">
            <MenuItem Icon={TdAListLekt} to={"/"} text={"Seznam lektoru"} />
            <MenuItem Icon={TdANapad} to={"/about"} text={"O nas"} />
          </div>

        </div>
      </div>
    </>
  )
}