import TdA_LOGO_white from "../TdA/TdA_LOGO/TeacherDigitalAgency_LOGO_white.svg";
import TdA_studium_white from "../TdA/TdA_ikony/SVG/TdA_ikony_studium_white.svg";
import TdA_nastaveni_white from "../TdA/TdA_ikony/SVG/TdA_ikony_nastaveni_white.svg";
import Tda_napad_white from "../TdA/TdA_ikony/SVG/TdA_ikony_napad_white.svg"

export default function NavbarMobile() {
  return (
    <div className="w-screen h-full sticky bottom-0 bg-sky flex justify-center gap-5">
      <a href="/about">
        <div className="bg-sky border-white border-4 rounded-full w-16 h-16 mx-auto overflow-hidden -my-5">
          <img src={Tda_napad_white} alt="TdA ikona" className="w-12 m-auto p-1"></img>
        </div>
      </a>
      <a href="/lecturers">
        <div className="bg-sky border-white border-4 rounded-full w-20 h-20 mx-auto -my-5">
          <img src={TdA_studium_white} alt="TdA ikona" className="w-14 m-auto p-1"></img>
        </div>
      </a>
      <a href="/login">
        <div className="bg-sky border-white border-4 rounded-full w-16 h-16 mx-auto overflow-hidden -my-5">
          <img src={TdA_nastaveni_white} alt="TdA ikona" className="w-12 m-auto p-1"></img>
        </div>
      </a>
    </div>
  )
}