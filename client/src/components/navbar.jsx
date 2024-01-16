import TdA_LOGO_white from "../TdA/TdA_LOGO/TeacherDigitalAgency_LOGO_white.svg";
import TdA_studium_white from "../TdA/TdA_ikony/SVG/TdA_ikony_studium_white.svg";
import TdA_nastaveni_white from "../TdA/TdA_ikony/SVG/TdA_ikony_nastaveni_white.svg";
import Tda_napad_white from "../TdA/TdA_ikony/SVG/TdA_ikony_napad_white.svg"

export default function Navbar() {
    return (
        <div className="h-screen sticky top-0 bg-sky flex-col gap-12">
            <div><img src={TdA_LOGO_white} alt="TdA logo" className="px-14 py-5 pb-16"></img></div>
            <div className="p-2"><a href="/about"> <div className="flex gap-3 justify-center"><img src={Tda_napad_white} alt="" className="w-8"></img><span className="text-white text-xl ">O nás</span></div> </a></div>
            <div className="p-2"><a href="/home"> <div className="flex gap-3 justify-center"><img src={TdA_nastaveni_white} alt="" className="w-8"></img><span className="text-white text-xl ">Přihlášení</span></div> </a></div>
            <div className="p-2"><a href="/"> <div className="flex gap-3 justify-center"><img src={TdA_studium_white} alt="" className="w-8"></img><span className="text-white text-xl ">Seznam lektorů</span></div> </a></div>
        </div>
    )
}