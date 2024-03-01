import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material"
import FadeInView from './FadeInView';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import ReserveBox from './ReserveBox'
import DOMPurify from 'dompurify'

export function Profil() {
  const { UUID } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(1);


  useEffect(() => {
    async function fetchData() {
      let exception = false;
      try {
        const response = await fetch(/*"http://7d17dc13931b9d11.app.tourdeapp.cz/api/lecturers/" + UUID */ "http://7d17dc13931b9d11.app.tourdeapp.cz/api/lecturers/" + UUID);
        const result = await response.json();
        setData(result);
      }
      catch (error) {
        console.error("fetch:", error);
        setLoading(2)
        exception = true;
      } if (!exception) {
        setLoading(0)
      };
    }
    fetchData();
  }, [UUID]);

  console.log(data)

  if (loading === 1) return <FadeInView><div className='font-nadpis text-white text-center flex justify-center'>Vydržte, než se stránka připraví.</div></FadeInView> //zneužiju tenhle Fade efekt a hláška se ukáže zpožděně, tak aspoň nebude otravovat když je zpoždění <0.3s
  if (loading === 2) return <FadeInView><div className='font-nadpis text-white text-center flex justify-center'>Nepodařilo se nám získat data požadovaného lektora.</div></FadeInView>
  //snad to bude fungovat

  if (loading === 0) {
    const name = data.first_name;
    const mid_name = data.middle_name;
    const surname = data.last_name;
    const title_b = data.title_before;
    const title_a = data.title_after;
    const pic_url = data.picture_url;
    const cena = data.price_per_hour;
    const tags = data.tags;
    const location = data.location;
    const claim = DOMPurify.sanitize(data.claim);
    const bio = DOMPurify.sanitize(data.bio);
    const telephone_numbers = data.contact.telephone_numbers;
    const emails = data.contact.emails;



    return (
      <FadeInView>
        <div className='md:h-full min-h-screen w-full flex flex-col items-center justify-center my-0'>
          <div className='max-w-[90rem] mt-4 w-full items-center flex flex-col'>
            <div className='md:hidden block mb-8 w-full mx-6'>
              <Button color='primary' variant="outlined" size='small'><Link to={"/lecturers"}>Zpět</Link></Button>
            </div>

            <div className="bg-white flex flex-col max-w-[90rem] w-full px-20 sm:px-5 py-16 rounded min-h-[80%] md:h-[100%] mx-6">

              <div className='flex justify-between flex-wrap mb-6 gap-2'>
                <div className="col-span-2 justify-between flex flex-col gap-4">

                  <div>
                    <h1 className='text-5xl text-left  font-nadpis'>{title_b} {name} {mid_name} {surname} {title_a}</h1>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className='flex gap-8 flex-wrap'>
                      <div className='flex gap-1'><LocationOnOutlinedIcon /><h2 className="text-xl text-left font-nadpis">{location}</h2></div>
                      <div className='flex gap-1'><PaymentsOutlinedIcon /><h2 className="text-xl text-left font-nadpis">{cena}Kč/60min</h2></div>
                    </div>

                    <div className='flex flex-wrap w-full gap-2 self-end md:mt-12'> {/* div okolo všech tagů, ještě idk co s tím bude, třeba nějaký pozadí a stylování */}
                      {tags.map((tag, index) => {
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

                  <div><h2 className='text-md italic text-left font-odstavec'>{claim}</h2></div>

                  <div className="flex gap-x-10 gap-y-2 flex-wrap">
                    <div className="flex flex-col">
                      <div className='flex gap-4 flex-wrap'>
                        {telephone_numbers.map((element, index) => {
                          return (
                            <>
                              {<span className="px-3 bg-prussian py-1 rounded text-white"><LocalPhoneOutlinedIcon />{element}</span>}
                            </>
                          )
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <div className='flex gap-4 flex-wrap'>
                        {emails.map((element, index) => {
                          return (
                            <>
                              {<span className="px-3 bg-prussian py-1 rounded text-white"><EmailOutlinedIcon />{element}</span>}
                            </>
                          )
                        })}
                      </div>

                    </div>
                  </div>


                </div>
                <div className="aspect-square h-full min-w-[15rem] w-[20%] lg:m-auto">
                  <img src={pic_url} alt={'Picture of ' + name} className="rounded-md mt-2 w-full min-w-[15rem]" />
                </div>

              </div>

              <div className="flex gap-3 w-full flex-[2] md:flex-col">



                <div className="w-full h-full flex flex-col justify-between">
                  <div className="w-full flex flex-col justify-between">



                  </div>




                </div>



              </div>

              <div>
                <h2 className="text-jet font-nadpis text-3xl">Něco o mně</h2>
                <div className='mb-4'>
                  <div dangerouslySetInnerHTML={{ __html: bio }}></div>
                </div>
              </div>
              <div className='max-w-2/3 self-center'>
                <ReserveBox tags={tags} cena={cena} />
              </div>
            </div>
          </div>
        </div></FadeInView>

    );
  }
}
