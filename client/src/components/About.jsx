import TDA_LOGO_white from "../TdA/TdA_LOGO/TeacherDigitalAgency_LOGO_colour-white.svg";
import TDA_All_blue from "../TdA/TdA_ikony/SVG/TdA_ikony_celek_blue.svg";
import { Button } from "@mui/material";

export function About() {

  return (
    <>
      <div className="h-screen w-full flex justify-center self-center">
        <div className="flex flex-col gap-10 w-[60%] items-center justify-center">
          <div className="w-full flex">
            <img src={TDA_LOGO_white} alt="TdA Logo" className="w-[15rem] pb-20"></img>
          </div>
          <img src={TDA_All_blue} alt="TdA ikony" className="w-[100%] "></img>
          <div>
            <h1 className="font-nadpis text-4xl text-white">O nás</h1>
            <div className="flex flex-col gap-2">
              <p className="text-xl text-justify text-white">
                Teacher digital Agency je mladá společnost zaměřená na vyhledávání špičkových odborníků z řad učitelů, lektorů a tutorů.
              </p>
              <p className="text-xl text-justify text-white">
                Sestavujeme exkluzivní databázi těchto specialistů, abychom mohli efektivně propojovat klienty s ideálními odborníky dle jejich přání a specifických potřeb.
              </p>
              <p className="text-xl text-justify text-white">
                Vaše vzdělávání je u nás v dobrých rukou.
              </p>
            </div>

          </div>
          
          <a href="/lecturers">
            <Button style={{width: '13rem', padding: '0.5rem'}} variant="contained" size="large" color="primary"><span className="font-bold">Přihlásit</span></Button>
          </a>
        </div>

      </div>
    </>
  );
}
