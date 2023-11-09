import './output.css';
import { useState } from 'react';

function App() {
  return (<ListVizitek />)
}

function Vizitka({lecturerData}) {
  const name = lecturerData.first_name;
  const mid_name = lecturerData.middle_name;
  const surname = lecturerData.last_name;
  const title_b = lecturerData.title_before;
  const title_a = lecturerData.title_after;
  const pic_url = lecturerData.picture_url;
  const tagy = lecturerData.tags;
  const location = lecturerData.location;
  const claim = lecturerData.claim;
  const bio = lecturerData.bio;
  const telephone_numbers = lecturerData.contact.telephone_numbers;
  const emails = lecturerData.contact.emails;
  return (
    <div key={lecturerData.UUID} className='vizitka'>
      <img src={pic_url} alt={'Picture of ' + name} />

      <h1 className='text-3xl'>{title_b} {name} {mid_name} {surname} {title_a}</h1>

      <h2>působí v: {location}</h2>

      <h2 className='text-xs'>{claim}</h2>

      <div dangerouslySetInnerHTML={{ __html: bio }} className='bio'/> {/* bude na spodu v rozbalovacím boxu? nebo proklik na samostatnou stránku. bude se loadit jen max délka textu v náhledu? */}
{/* limitovat délku pomocí CSS */}
      <div>
        {telephone_numbers.map((num, index) => (
          <div className='num' key={index}>
            {num}
          </div>
        ))}
      </div>
      <div>
        {emails.map((mail, index) => (
          <div className='mail' key={index}> {/* prostě vypíše maily do samostatných divů s classou "mail" */}
            {mail}
          </div>
        ))}
      </div>
      <div className='tagy'> {/* div okolo všech tagů, ještě idk co s tím bude, třeba nějaký pozadí a stylování */}
        {tagy.map(tag => (
          <div key={tag.uuid} className='tag'> {/* nevim co ten key dělá ale radši ho tam dám, vypíše všechny tagy v samostatným divu s classou "tag" */}
            {tag.name}
          </div>
        ))}
      </div>
    </div>
  );
}

function ListVizitek() {

  const fakeAPI = [{
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
    }},
    {
    "UUID": "2d7e0a53-5a47-4b05-b8ea-60b3d7c8257c",
    "title_before": "Dr.",
    "first_name": "John",
    "middle_name": "Alexander",
    "last_name": "Smith",
    "title_after": "PhD",
    "picture_url": "https://picsum.photos/200",
    "location": "New York",
    "claim": "Medical Doctor",
    "bio": "<p>I'm a passionate medical doctor with years of experience.</p>",
    "tags": [
      {
        "uuid": "a1",
        "name": "Medicine"
      },
      {
        "uuid": "a2",
        "name": "Healthcare"
      }
    ],
    "price_per_hour": 1500,
    "contact": {
      "telephone_numbers": ["+1 123-456-7890"],
      "emails": ["john.smith@example.com"]
    }
  },
  {
    "UUID": "1e27c527-4f8b-4b12-9c4a-73a29b61de31",
    "title_before": "Mr.",
    "first_name": "David",
    "middle_name": "James",
    "last_name": "Johnson",
    "title_after": "MSc",
    "picture_url": "https://picsum.photos/200",
    "location": "Los Angeles",
    "claim": "Software Engineer",
    "bio": "<p>I'm a software engineer with a passion for coding.</p>",
    "tags": [
      {
        "uuid": "b1",
        "name": "Programming"
      },
      {
        "uuid": "b2",
        "name": "Web Development"
      }
    ],
    "price_per_hour": 1000,
    "contact": {
      "telephone_numbers": ["+1 987-654-3210"],
      "emails": ["david.johnson@example.com"]
    }
  },
  {
    "UUID": "3b96e468-7d12-4f63-a4de-89a7c9ff7a45",
    "title_before": "Mrs.",
    "first_name": "Emily",
    "middle_name": "Grace",
    "last_name": "Brown",
    "title_after": "MA",
    "picture_url": "https://picsum.photos/200",
    "location": "Chicago",
    "claim": "Marketing Manager",
    "bio": "<p>I'm a marketing professional with a knack for strategy.</p>",
    "tags": [
      {
        "uuid": "c1",
        "name": "Marketing"
      },
      {
        "uuid": "c2",
        "name": "Brand Management"
      }
    ],
    "price_per_hour": 1200,
    "contact": {
      "telephone_numbers": ["+1 555-123-4567"],
      "emails": ["emily.brown@example.com"]
    }
  },
  {
    "UUID": "4f76a1ea-d0a3-4e36-bc86-9467ae5aee1c",
    "title_before": "Miss",
    "first_name": "Sophia",
    "middle_name": "Lynn",
    "last_name": "Garcia",
    "title_after": "BA",
    "picture_url": "https://picsum.photos/200",
    "location": "San Francisco",
    "claim": "Graphic Designer",
    "bio": "<p>I'm a creative graphic designer with a love for visual arts.</p>",
    "tags": [
      {
        "uuid": "d1",
        "name": "Graphic Design"
      },
      {
        "uuid": "d2",
        "name": "Illustration"
      }
    ],
    "price_per_hour": 800,
    "contact": {
      "telephone_numbers": ["+1 555-987-6543"],
      "emails": ["sophia.garcia@example.com"]
    }
  },
  {
    "UUID": "5c89f3f5-8d2b-487e-98f9-ace139a5a3ab",
    "title_before": "Mr.",
    "first_name": "Michael",
    "middle_name": "Andrew",
    "last_name": "Williams",
    "title_after": "JD",
    "picture_url": "https://picsum.photos/200",
    "location": "Houston",
    "claim": "Lawyer",
    "bio": "<p>I'm an experienced lawyer with expertise in various legal matters.</p>",
    "tags": [
      {
        "uuid": "e1",
        "name": "Legal Consultation"
      },
      {
        "uuid": "e2",
        "name": "Litigation"
      }
    ],
    "price_per_hour": 2000,
    "contact": {
      "telephone_numbers": ["+1 888-123-4567"],
      "emails": ["michael.williams@example.com"]
    }
  },
  {
    "UUID": "6abca11b-ee18-4b20-8a1b-5f0a15e7ed0b",
    "title_before": "Mrs.",
    "first_name": "Olivia",
    "middle_name": "Ann",
    "last_name": "Martinez",
    "title_after": "PharmD",
    "picture_url": "https://picsum.photos/200",
    "location": "Miami",
    "claim": "Pharmacist",
    "bio": "<p>I'm a licensed pharmacist with expertise in medication management.</p>",
    "tags": [
      {
        "uuid": "f1",
        "name": "Pharmacy"
      },
      {
        "uuid": "f2",
        "name": "Medication Counseling"
      }
    ],
    "price_per_hour": 1500,
    "contact": {
      "telephone_numbers": ["+1 786-555-7890"],
      "emails": ["olivia.martinez@example.com"]
    }
  }]
    
  return (
    <div className='nastenka'>
    {fakeAPI.map((data) => (
      <Vizitka key={data.UUID} lecturerData={data}/>))}
    </div>
  )
}


export default App;
