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
  return (
    <div key={lecturerData.UUID} className='vizitka max-w-sm p-4 overflow-hidden bg-sky rounded-lg'>
      <img src={pic_url} alt={'Picture of ' + name} className="rounded-full h-55 m-auto" />

      <h1 className='text-4xl text-center text-prussian font-nadpis p-2'>{title_b} <br /> {name} {mid_name} {surname} <br /> {title_a}</h1>

      <h2 className="text-xl text-center">Působí v: <br /> <span className="text-3xl text-sunglow font-nadpis">{location}</span></h2>
      <h2 className="text-xl text-center">Cena: <br /> <span className="text-3xl text-sunglow font-nadpis">{cena}</span></h2>
      <h2 className='text-md italic text-prussian text-center'>{claim}</h2>
      <div className="shade-parent">

        <div dangerouslySetInnerHTML={{ __html: bio }} className='bio text-md font-semibold' /> {/* bude na spodu v rozbalovacím boxu? nebo proklik na samostatnou stránku. bude se loadit jen max délka textu v náhledu? */}
        {/* limitovat délku pomocí CSS */}
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
  );
}
