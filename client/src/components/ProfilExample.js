export function ProfilExample() {
  const data = {
    "UUID": "67fda282-2bca-41ef-9caf-039cc5c8dd69",
    "title_before": "Mgr.",
    "first_name": "Petra",
    "middle_name": "Swil",
    "last_name": "Plachá",
    "title_after": "MBA",
    "picture_url": "https://tourdeapp.cz/storage/images/2023_02_25/412ff296a291f021bbb6de10e8d0b94863fa89308843b/big.png.webp",
    "location": "Brno",
    "claim": "Aktivní studentka / Předsedkyně spolku / Projektová manažerka",
    "bio": "<p>Baví mě organizovat věci. Ať už to bylo vyvíjení mobilních aplikací ve Futured, pořádání konferencí, spolupráce na soutěžích Prezentiáda, pIšQworky, <b>Tour de App</b> a Středoškolák roku, nebo třeba dobrovolnictví, vždycky jsem skončila u projektového managementu, rozvíjení soft-skills a vzdělávání. U studentských projektů a akcí jsem si vyzkoušela snad všechno od marketingu po logistiku a moc ráda to předám dál. Momentálně studuji Pdf MUNI a FF MUNI v Brně.</p>",
    "tags": [
      {
        "uuid": "6d348a49-d16f-4524-86ac-132dd829b429",
        "name": "Dobrovolnictví"
      },
      {
        "uuid": "8e0568c3-e235-42aa-9eaa-713a2545ff5b",
        "name": "Studentské spolky"
      },
      {
        "uuid": "996c16c8-4715-4de6-9dd0-ea010b3f64c7",
        "name": "Efektivní učení"
      },
      {
        "uuid": "c20b98dd-f37e-4fa7-aac1-73300abf086e",
        "name": "Prezentační dovednosti"
      },
      {
        "uuid": "824cfe88-8a70-4ffb-bcb8-d45670226207",
        "name": "Marketing pro neziskové studentské projekty"
      },
      {
        "uuid": "fa23bea1-489f-4cb2-b64c-7b3cd7079951",
        "name": "Mimoškolní aktivity"
      },
      {
        "uuid": "8325cacc-1a1f-4233-845e-f24acfd0287b",
        "name": "Projektový management, event management"
      },
      {
        "uuid": "ba65a665-e141-40ab-bbd2-f4b1f2b01e42",
        "name": "Fundraising pro neziskové studentské projekty"
      }
    ],
    "price_per_hour": 1200,
    "contact": {
      "telephone_numbers": ["+420 722 482 974"],
      "emails": ["placha@scg.cz", "predseda@scg.cz"]
    }
  };
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
    <div key={data.UUID} className='vizitka p-5 max-w-6xl m-auto overflow-hidden bg-sky rounded-lg grid md:grid-cols-2 grid-cols-1 md:grid-rows-[1fr_auto_auto] grid-rows-[500px_1fr_auto_auto] gap-2'>
      <div className="md:col-span-1 col-span-1 w-max m-auto">
        <img src={pic_url} alt={'Picture of ' + name} className="rounded-full m-auto" />
        <h1 className='text-4xl text-center text-prussian font-nadpis p-2'>{title_b} <br /> {name} {mid_name} {surname} <br /> {title_a}</h1>
      </div>

      <div className="md:col-span-1 col-span-2">
        <h2 className="text-xl text-center"><span>Působí v: </span><span className="text-3xl text-sunglow font-nadpis">{location}</span></h2>
        <h2 className="text-xl text-center"><span>Cena: </span><span className="text-3xl text-sunglow font-nadpis">{cena}</span></h2>
        <h2 className='text-md italic text-prussian text-center'>{claim}</h2>


        <div dangerouslySetInnerHTML={{ __html: bio }} className='text-xl' /> {/* bude na spodu v rozbalovacím boxu? nebo proklik na samostatnou stránku. bude se loadit jen max délka textu v náhledu? */}
        {/* limitovat délku pomocí CSS */}


      </div>


      {/*  <div className=""> */}
      <div className="kontakty flex gap-1 flex-col col-span-2"> {/* zkoušel jsem tady udělat responzivitu, kde byl mail a telefon vedle sebe na desktopu, ale delší maily zlobí a když se nevejdou, tak je to otřesný, raději nechám samostatný řádku pro všechny obrazovky */}
        <div>
          {telephone_numbers.map((num, index) => (
            <div className="flex w-fit m-auto">
              {/* <FontAwesomeIcon icon={faPhone} className="my-auto m-2" /> */}
              <div className='num' key={index}>
                {num}
              </div>
            </div>

          ))}
        </div>
        <div>
          {emails.map((mail, index) => (
            <div className="flex w-fit m-auto">
              {/*  <FontAwesomeIcon icon={faEnvelope} className="my-auto m-1" /> */}
              <div className='mail' key={index}> {/* prostě vypíše maily do samostatných divů s classou "mail" */}
                {mail}
              </div>
            </div>

          ))}
        </div>
      </div>

      <div className='tagy flex flex-wrap gap-0 col-span-2'> {/* div okolo všech tagů, ještě idk co s tím bude, třeba nějaký pozadí a stylování */}
        {tagy.map(tag => (
          <div key={tag.uuid} className='tag text-jet bg-sunglow m-1 p-1 w-fit h-fit rounded-md'> {/* nevim co ten key dělá ale radši ho tam dám, vypíše všechny tagy v samostatným divu s classou "tag" */}
            {tag.name}
          </div>
        ))}


      </div>
      {/*  </div> */}
    </div>
  );
}