import TdA_LOGO_white from "../../svg/TdA_LOGO/TeacherDigitalAgency_LOGO_white.svg";
import TdA_studium_white from "../../svg/TdA_ikony/SVG/TdA_ikony_studium_white.svg";
import TdA_nastaveni_white from "../../svg/TdA_ikony/SVG/TdA_ikony_nastaveni_white.svg";
import Tda_napad_white from "../../svg/TdA_ikony/SVG/TdA_ikony_napad_white.svg"

import magnifying_glass from "../../svg/magnifying_glass.svg"


export default function NavbarMobile() {
  return (
    <div className="w-screen h-full sticky bottom-0 bg-sky-50 flex justify-center gap-5">
      <a href="/about">
        <div className="bg-sky-50 border-white-50 border-4 rounded-full w-16 h-16 mx-auto overflow-hidden -my-5">
          <img src={Tda_napad_white} alt="TdA ikona" className="w-12 m-auto p-1"></img>
        </div>
      </a>
      <a href="/">
        <div className="bg-sky-50 border-white-50 border-4 rounded-full w-20 h-20 mx-auto -my-5 flex ">
          <img src={magnifying_glass} alt="TdA ikona" className="w-14 m-auto p-1 invert"></img>
        </div>
      </a>
      <a href="/login">
        <div className="bg-sky-50 border-white-50 border-4 rounded-full w-16 h-16 mx-auto overflow-hidden -my-5">
          <img src={TdA_nastaveni_white} alt="TdA ikona" className="w-12 m-auto p-1"></img>
        </div>
      </a>
    </div>
  )
}