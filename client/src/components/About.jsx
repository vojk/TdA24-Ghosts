import TDA_LOGO_white from "../svg/TdA_LOGO/TeacherDigitalAgency_LOGO_colour-white.svg";
import TDA_All_blue from "../svg/TdA_ikony/SVG/TdA_ikony_celek_blue.svg";
import { Button } from "@mui/material";
import Group3 from "../svg/Group1.svg"
import Group1 from "../svg/Group1.svg"

export function About() {

  return (
    <>
      <div className="min-h-fit h-full w-full flex justify-center self-center bg-jet-50">
        <div className="flex flex-col gap-10 w-[60%] items-center justify-center">
          <div className="w-full flex">
            <img src={Group1} alt="TdA Logo" className="w-[15rem] pb-18"></img>
          </div>
          <img src={TDA_All_blue} alt="TdA ikony" className="w-[100%] "></img>
          <div>
            <h1 className="font-nadpis text-xl text-white-50">O nás</h1>
            <div className="flex flex-col gap-2">
              <p className="text-lg text-justify text-white-50">
                Teacher digital Agency je polečnost zaměřená na vyhledávání <span className="text-sunglow-50">špičkových odborníků</span>  z řad učitelů, lektorů a tutorů.
              </p>
              <p className="text-lg text-justify text-white-50">
                Zároveň pro Vás připravila <span className="text-sunglow-50"> Projekt AMOS</span> - <span className="text-sunglow-50">seznam odborně sestavených aktivit</span>, které Vám pomohou inovativně probudit Vaše vyučování!
              </p>
              <p className="text-lg text-justify text-white-50">
                Pomocí nejnovějším <span className="text-sunglow-50">AI technologiím</span> Vám najdeme aktivity na míru.
              </p>
            </div>

          </div>
          <div className="w-full flex justify-center">
            <a href="/">
              <Button style={{ width: '13rem', padding: '0.5rem' }} variant="contained" size="large" color="primary"><span className="font-bold">Začněte vyhledávat</span></Button>
            </a>
          </div>
        </div>

      </div>
    </>
  );
}