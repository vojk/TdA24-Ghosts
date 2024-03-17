import { Button, Chip } from "@mui/material";
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DOMPurify from 'dompurify'

export function Vizitka({ lecturerData }) {
  const name = lecturerData.first_name;
  const mid_name = lecturerData.middle_name;
  const surname = lecturerData.last_name;
  const title_b = lecturerData.title_before;
  const title_a = lecturerData.title_after;
  const pic_url = lecturerData.picture_url;
  const cena = lecturerData.price_per_hour;
  const tagy = lecturerData.tags;
  const location = lecturerData.location;
  const claim = lecturerData.claim
  const bio = lecturerData.bio
  const telephone_numbers = lecturerData.contact.telephone_numbers;
  const emails = lecturerData.contact.emails;

  return (
    <>
      <div className="bg-white p-2 rounded-lg w-full h-full py-4 px-4 flex flex-col gap-1 ">


        <div className="flex sm:flex-col gap-5">
          <div className="aspect-square flex-[3.5]">
            <img src={pic_url} alt={'Picture of ' + name} className="rounded-md w-full" />
          </div>

          <div className="flex flex-col flex-[5]">
            <div className="col-span-2 flex-[1]">
              <div>
                <h1 className='text-3xl text-left text-jet font-nadpis'>{title_b} {name} {mid_name} {surname} {title_a}</h1>
              </div>

            </div>
            <div className="flex gap-3 w-full h-auto flex-[2] md:flex-col">
              <div className="w-full h-full flex flex-col justify-between">
                <div className="w-full flex flex-col justify-between">
                  <div>

                    <div className="flex flex-wrap justify-between gap-3 w-full md:flex-col">

                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col">
                          {telephone_numbers.map((element, index) => {
                            return (
                              <>
                                {index < 2 && <span className="text-jet"><LocalPhoneOutlinedIcon /> <a href={'tel:' + element} className="underline">{element}</a></span>}
                                {index > 2 && <span className="text-sky relative">Zobrazit všechny</span>}
                              </>
                            )
                          })}
                        </div>
                        <div className="flex flex-col">
                          {emails.map((element, index) => {
                            return (
                              <>
                                {index < 2 && <span className="text-jet"><EmailOutlinedIcon /> <a href={'mailto:' + element} className="underline">{element}</a></span>}
                                {index > 2 && <span className="text-sky">Zobrazit všechny</span>}
                              </>
                            )
                          })}

                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col"><span><PaymentsOutlinedIcon /> {cena} Kč / 60 min</span></div>
                        <div className="flex flex-col"><span><LocationOnOutlinedIcon /> {location}</span></div>
                      </div>



                    </div>

                  </div>

                </div>
                <div className="mt-2 h-[4ch]"> <h2 className='text-md text-jet text-left font-odstavec'>{claim}</h2></div>
                <div className='flex flex-wrap w-full gap-2 mt-3'> {/* div okolo všech tagů, ještě idk co s tím bude, třeba nějaký pozadí a stylování */}
                  {tagy.map((tag, index) => {
                    return (
                      <>
                        <Chip key={tag.uuid} label={tag.name} color="success" />
                      </>
                    )
                  }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <a href={"/lecturer/" + lecturerData.uuid}>
            <Button style={{ width: '6rem', padding: '0.5rem', gap: '.5rem' }} variant="contained" size="large" color="primary"><span className="font-bold">Více </span><ArrowForwardIosIcon fontSize="small" /></Button>
          </a>
        </div>


      </div>
    </>
  );
}
