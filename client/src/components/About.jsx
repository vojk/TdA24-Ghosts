import TDA_LOGO_white from "../TdA/TdA_LOGO/TeacherDigitalAgency_LOGO_colour-white.svg";
import TDA_All_blue from "../TdA/TdA_ikony/SVG/TdA_ikony_celek_blue.svg";
import { Button } from "./ui/button";

export function About() {

  return (
    <>
      <div className="min-h-fit h-full w-full flex justify-center self-center py-12">
        <div className="container flex flex-col gap-10 items-center justify-center">
          <div className="w-full flex">
            <img src={TDA_LOGO_white} alt="TdA Logo" className="w-[15rem] pb-10"></img>
          </div>
          <img src={TDA_All_blue} alt="TdA ikony" className="w-[100%] "></img>
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl text-white">O nás</h1>
            <div className="flex flex-col gap-3 text-lg text-white/90">
              <p className="text-justify">
                Teacher digital Agency je mladá společnost zaměřená na vyhledávání špičkových odborníků z řad učitelů, lektorů a tutorů.
              </p>
              <p className="text-justify">
                Sestavujeme exkluzivní databázi těchto specialistů, abychom mohli efektivně propojovat klienty s ideálními odborníky dle jejich přání a specifických potřeb.
              </p>
              <p className="text-justify">
                Vaše vzdělávání je u nás v dobrých rukou.
              </p>
            </div>

          </div>
          <div className="w-full flex justify-end">
            <a href="/lecturers">
              <Button size="lg" className="w-[13rem]">
                <span className="font-semibold">Naši lektoři</span>
              </Button>
            </a>
          </div>
        </div>

      </div>
    </>
  );
}
