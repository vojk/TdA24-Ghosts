import { useEffect, useState } from 'react';
import TdA_konverzace_black from "../TdA/TdA_ikony/SVG/TdA_ikony_konverzace_black.svg";
import { useParams } from "react-router-dom";

export function Profil() {
  const { UUID } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://127.0.0.1:8080/api/lecturers/" /* "http://7d17dc13931b9d11.app.tourdeapp.cz/api/lecturers/" */ + UUID);
        const result = await response.json();
        setData(result);
        setLoading(false);
      }
      catch (error) {
        console.error("fetch:", error);
        setLoading(false);
      };
    }
    fetchData();
  }, [UUID]);
  if (loading) { return <p>Loading...</p>; }
  if (!data) { return <p>Error</p>; }

  if (data) {
    const name = data.first_name;
    const mid_name = data.middle_name;
    const surname = data.last_name;
    const title_b = data.title_before;
    const title_a = data.title_after;
    const pic_url = data.picture_url;
    const cena = data.price_per_hour;
    const tagy = data.tags;
    const location = data.location;
    const claim = data.claim;
    const bio = data.bio;
    const telephone_numbers = data.contact.telephone_numbers;
    const emails = data.contact.emails;

    return (<>
      <div className="flex bg-jet h-full items-center m-auto max-w-[60rem] md:min-w-[32rem]">

        <div className="bg-white p-4 mb-8 min-h-[30rem] rounded-sm w-full grid md:grid-cols-[auto_4fr] grid-cols-[1fr] md:grid-rows-[1fr_auto_1fr] grid-rows-[1fr_auto_auto_auto] gap-3">
          <div className=" md:col-span-2">
            <h1 className='text-4xl text-sunglow font-nadpis'>{title_b} {name} {mid_name} {surname} {title_a}</h1>
            <h2 className='text-xl italic text-sunglow font-nadpis'>{claim}</h2>
            <h2 className="text-xl text-sunglow font-nadpis"><span className="text-3xl text-sunglow font-nadpis">{cena} Kč</span> za hodinu <span className="text-3xl text-sunglow font-nadpis">{location}</span></h2>
          </div>
          <div className="md:col-span-1 md:row-span-2">
            <img src={pic_url} alt={'Picture of ' + name} className="rounded-2xl m-auto" />
          </div>
          <div>
            <h1 className="text-3xl text-jet font-nadpis">Něco o mně:</h1>
            <div className='[&>*]:text-xl text-xl [&>*]:text-jet text-jet' dangerouslySetInnerHTML={{ __html: bio }} />
            <div className="flex gap-1 flex-col col-span-2 py-3 items-center md:items-start"> {/* zkoušel jsem tady udělat responzivitu, kde byl mail a telefon vedle sebe na desktopu, ale delší maily zlobí a když se nevejdou, tak je to otřesný, raději nechám samostatný řádku pro všechny obrazovky */}
              <div className="flex gap-3"><img src={TdA_konverzace_black} alt="" className="w-8"></img><span className="text-jet text-xl font-nadpis"> E-mail</span></div>

              <div>
                {telephone_numbers.map((num, index) => (
                  <div className="flex w-fit [&>*]:text-jet">
                    {/* <FontAwesomeIcon icon={faPhone} className="my-auto"  /> */}
                    <div className='num' key={index}>
                      {num}
                    </div>
                  </div>

                ))}
              </div>
              <div className="flex gap-3"><img src={TdA_konverzace_black} alt="" className="w-8"></img><span className="text-jet text-xl font-nadpis"> Telefon</span></div>
              <div>
                {emails.map((mail, index) => (
                  <div className="flex w-fit [&>*]:text-jet">
                    {/* <FontAwesomeIcon icon={faEnvelope} className="my-auto m-1" /> */}
                    <div className='mail' key={index}> {/* prostě vypíše maily do samostatných divů s classou "mail" */}
                      {mail}
                    </div>
                  </div>

                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap md:gap-0">
            {tagy.map(tag => (
              <div key={tag.uuid} className='tag text-white font-nadpis bg-prussian m-1 p-1 w-fit h-fit rounded-md'> {/* nevim co ten key dělá ale radši ho tam dám, vypíše všechny tagy v samostatným divu s classou "tag" */}
                {tag.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>);
  }
}
