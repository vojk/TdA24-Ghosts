import React from "react";
import { Link } from "react-router-dom";



/* import { ReactComponent as TdALogo } from "../../svg/TdA_LOGO/TeacherDigitalAgency_LOGO_white.svg";
 */import { ReactComponent as TdAListLekt } from "../../svg/TdA_ikony/SVG/TdA_ikony_studium_white.svg";
import { ReactComponent as TdANapad } from "../../svg/TdA_ikony/SVG/TdA_ikony_napad_white.svg";
import { ReactComponent as TdA_nastaveni_white } from "../../svg/TdA_ikony/SVG/TdA_ikony_nastaveni_white.svg";

import { ReactComponent as TdALogo } from "../../svg/Group1.svg";




function MenuItem({ Icon, text, to }) {
    //<Icon className={"w-8"} /> 
    return (
        //   <Link to={to} className="mx-4 ml-0 gap-2 flex items-center relative hover:after:contents hover:after:w-full hover:after:absolute hover:after:bg-white hover:after:h-0.5 hover:after:-bottom-0 hover:after:rounded transition-all">
        <Link to={to} className="mx-4 ml-0 gap-2 flex items-center relative underline">

            <p className="text-[1rem] font-bold font-odstavec">{text}</p>
        </Link>
    )
}

export default function Footer() {
    return (
        <>
            <div className={"w-full flex text-white-50 bg-jet-50"}>
                <div className="w-full h-full px-4 flex justify-between sm:mr-0 py-8 bg-prussian-50 backdrop-blur-sm rounded-md drop-shadow-sm shadow-md">
                    <TdALogo className={"h-[64px] mx-6"} />
                    <div className="flex flex-row justify-between w-full gap-2">
                        <div className="flex gap-2">
                            <MenuItem to={"/"} text={"O TdA"} />
                            <MenuItem to={"/lecturers"} text={"Lektoři"} />
                        </div>

                        <div className="mx-4 ml-0 gap-2 flex items-center relative">
                            <p className="text-[1rem] font-bold font-odstavec">Copyright © Teacher Digital Agency 2024</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}