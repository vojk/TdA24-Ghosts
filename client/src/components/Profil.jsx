import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";

export function Profil() {
  const { UUID } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(/*"http://localhost:8080/api/lecturers/" + UUID */ "http://7d17dc13931b9d11.app.tourdeapp.cz/api/lecturers/" + UUID);
        const result = await response.json();
        setData(result);
      }
      catch (error) {
        console.error("fetch:", error);
      };
    }
    fetchData();
  }, [UUID]);

  if (!data) return <div>Not ready</div>

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

    return (
      <div className='md:h-full h-screen w-full flex items-center justify-center my-6'>
        <div className="bg-white flex flex-col max-w-[90rem] min-h-[35rem] w-full px-12 py-16 rounded h-[80%] md:h-[100%] mx-6">

          <Link to={"/lecturers"} className='mb-5'>Zpět</Link>
          <div className="col-span-2 flex-[0] mb-6">
            <div>
              <h1 className='text-5xl text-left text-sunglow font-nadpis'>{title_b} {name} {mid_name} {surname} {title_a}</h1>
              <div className="flex gap-4">
                <h2 className="text-xl font-nadpis text-sunglow"><span className="text-3xl text-sunglow font-nadpis">{cena} </span> Kč za hodinu</h2>
                <h2 className="text-xl text-left"><span className="text-3sxl text-sunglow font-nadpis">{location}</span></h2>
              </div>
            </div>
            <h2 className='text-md text-sunglow text-left font-odstavec'>{claim}</h2>
          </div>

          <div className="flex gap-3 w-full flex-[2] md:flex-col">
            <div className="aspect-square h-full min-w-[15rem] w-[20%]">
              <img src={pic_url} alt={'Picture of ' + name} className="rounded-md w-full min-w-[15rem]" />
            </div>

            <div className="w-full h-full flex flex-col justify-between">
              <div className="w-full flex flex-col justify-between">
                <h2 className="text-jet font-nadpis text-3xl">Něco o mně</h2>
                <div className='mb-4'>
                  <div dangerouslySetInnerHTML={{ __html: bio }}></div>
                </div>
                <div>
                  <h2 className="text-jet font-nadpis text-2xl">Kontakt</h2>
                  <div className="flex gap-10 flex-col">
                    <div className="flex flex-col">
                      <h2 className="text-jet font-nadpis text-xl">Telefon</h2>
                      <div className='flex gap-4 flex-wrap'>
                        {telephone_numbers.map((element, index) => {
                          return (
                            <>
                              {<span className="px-3 bg-prussian py-1 rounded text-white">{element}</span>}
                            </>
                          )
                        })}
                      </div>


                    </div>

                    <div className="flex flex-col">
                      <h2 className="text-jet font-nadpis text-xl">E-mail</h2>
                      <div className='flex gap-4 flex-wrap'>
                        {emails.map((element, index) => {
                          return (
                            <>
                              {<span className="px-3 bg-prussian py-1 rounded text-white">{element}</span>}
                            </>
                          )
                        })}
                      </div>

                    </div>
                  </div>
                </div>

              </div>

              <div className='flex flex-wrap w-full gap-2 mt-3 self-end md:mt-12'> {/* div okolo všech tagů, ještě idk co s tím bude, třeba nějaký pozadí a stylování */}
                {tagy.map((tag, index) => {
                  return (
                    <>
                      {index < 100 ? <div key={tag.uuid} className='tag text-white font-bold bg-prussian overflow-hidden px-2 py-1 w-fit max-h-8 rounded-md'>
                        {tag.name}
                      </div> : (index === 100) && <div className="text-white bg-prussian font-bold px-2 py-1 aspect-square flex justify-center items-center w-[2rem] rounded-md">...</div>}
                    </>
                  )
                }
                )}
              </div>
            </div>



          </div>
        </div>
      </div>
    );
  }
}
