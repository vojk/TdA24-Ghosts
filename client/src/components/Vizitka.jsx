import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';



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
  const claim = lecturerData.claim;
  const bio = lecturerData.bio;
  const telephone_numbers = lecturerData.contact.telephone_numbers;
  const emails = lecturerData.contact.emails;
 /* stará vizitka: */ (
    <div key={lecturerData.UUID} className='vizitka max-w-sm p-4 overflow-hidden bg-sky rounded-lg'>
      <img src={pic_url} alt={'Picture of ' + name} className="rounded-full h-55 m-auto" />

      <h1 className='text-4xl text-center text-prussian font-nadpis p-2'>{title_b} <br /> {name} {mid_name} {surname} <br /> {title_a}</h1>

      <h2 className="text-xl text-center">Působí v: <br /> <span className="text-3xl text-sunglow font-nadpis">{location}</span></h2>
      <h2 className="text-xl text-center">Cena: <br /> <span className="text-3xl text-sunglow font-nadpis">{cena}</span></h2>
      <h2 className='text-md italic text-prussian text-center'>{claim}</h2>
      <div className="shade-parent">

        <div dangerouslySetInnerHTML={{ __html: bio }} className='bio text-md font-semibold' /> {/* bude na spodu v rozbalovacím boxu? nebo proklik na samostatnou stránku. bude se loadit jen max délka textu v náhledu? */}
        
        <div className="shade bg-sky" />
      </div>

      <div className="kontakty flex gap-1 flex-col"> {/* zkoušel jsem tady udělat responzivitu, kde byl mail a telefon vedle sebe na desktopu, ale delší maily zlobí a když se nevejdou, tak je to otřesný, raději nechám samostatný řádku pro všechny obrazovky */}
        <div>
          {telephone_numbers.map((num, index) => (
            <div className="flex w-fit m-auto">
              <FontAwesomeIcon icon={faPhone} className="my-auto m-1" />
              <div className='num' key={index}>
                {num}
              </div>
            </div>

          ))}
        </div>
        <div>
          {emails.map((mail, index) => (
            <div className="flex w-fit m-auto">
              <FontAwesomeIcon icon={faEnvelope} className="my-auto m-1" />
              <div className='mail' key={index}> {/* prostě vypíše maily do samostatných divů s classou "mail" */}
                {mail}
              </div>
            </div>

          ))}
        </div>
      </div>

      <div className="shade-parent">
        <div className='tagy h-56 flex flex-wrap '> {/* div okolo všech tagů, ještě idk co s tím bude, třeba nějaký pozadí a stylování */}
          {tagy.map(tag => (
            <div key={tag.uuid} className='tag text-jet bg-sunglow m-1 p-1 w-fit max-h-8 rounded-md'> {/* nevim co ten key dělá ale radši ho tam dám, vypíše všechny tagy v samostatným divu s classou "tag" */}
              {tag.name}
            </div>
          ))}
        </div>
        <div className="shade bg-sky" />
      </div>

    </div>
  )
  return (
    <>
      <div className="bg-jet border-4 overflow-hidden p-2 rounded-3xl grid min-h-[24rem] w-[20rem] lg:h-[23rem] lg:min-w-[45rem] grid-cols-[3fr_5fr]  grid-rows-[1fr_1fr_auto] lg:grid-rows-[1fr_2fr]">
        <div className="bg-jet col-span-2 rounded-t-2xl">
          <h1 className='text-4xl text-left text-sunglow font-nadpis p-2'>{title_b} {name} {mid_name} {surname} {title_a}</h1>

          <h2 className="text-xl pl-2 text-left"><span className="text-3xl text-sunglow font-nadpis">{location}</span></h2>
          <h2 className="text-xl pl-2 text-left"><span className="text-3xl text-sunglow font-nadpis">{cena}</span> za hodinu</h2>
          <h2 className='text-md italic pl-2 text-sunglow text-left'>{claim}</h2>


        </div>
        <div className="bg-jet col-span-2 lg:col-span-1">
          <img src={pic_url} alt={'Picture of ' + name} className="rounded-2xl m-auto w-48" />
        </div>
        <div className="bg-jet col-span-2 lg:col-span-1">
          <div className="shade-parent">

            <div dangerouslySetInnerHTML={{ __html: bio }} className='bio text-md font-semibold' /> {/* bude na spodu v rozbalovacím boxu? nebo proklik na samostatnou stránku. bude se loadit jen max délka textu v náhledu? */}
            {/* limitovat délku pomocí CSS */}
            <div className="shade bg-jet w-full" />
          </div>
          <div className="shade-parent">
            <div className='tagy flex flex-wrap w-full'> {/* div okolo všech tagů, ještě idk co s tím bude, třeba nějaký pozadí a stylování */}
              {tagy.map(tag => (
                <div key={tag.uuid} className='tag text-jet bg-sunglow overflow-hidden m-1 p-1 w-fit max-h-8 rounded-md'> {/* nevim co ten key dělá ale radši ho tam dám, vypíše všechny tagy v samostatným divu s classou "tag" */}
                  {tag.name}
                </div>
              ))}
            </div>
            <div className="shade bg-jet w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
