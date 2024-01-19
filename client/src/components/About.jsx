import TDA_LOGO_white from "../TdA/TdA_LOGO/TeacherDigitalAgency_LOGO_colour-white.svg";
import TDA_All_blue from "../TdA/TdA_ikony/SVG/TdA_ikony_celek_blue.svg";

export function About() {

  return (
    <>
      <div className="h-screen w-full flex justify-center self-center">
        <div className="flex flex-col gap-10 w-[60%] items-center justify-center">
          <div className="min-w-[40%] max-w-[80%] flex justify-center">
            <img src={TDA_LOGO_white} alt="TdA Logo" className="w-[50%] pb-20"></img>
          </div>
          <img src={TDA_All_blue} alt="TdA ikony" className="w-[100%] "></img>
          <div>
            <h1 className="font-nadpis text-4xl text-white">O nás</h1>
            <p className="text-xl text-justify text-white">Teacher digital Agency je mladá společnost zaměřená na vyhledávání špičkových odborníků z řad učitelů, lektorů a tutorů. Sestavujeme exkluzivní databázi těchto specialistů, abychom mohli efektivně propojovat klienty s ideálními odborníky dle jejich přání a specifických potřeb. Vaše vzdělávání je u nás v dobrých rukou.</p>
          </div>
          <div><a href="/lecturers"><div className="w-52 p-2 bg-prussian text-white rounded-xl font-nadpis text-2xl text-center align-middle"> Naši lektoři </div></a></div>
        </div>

      </div>
    </>
  );
}
