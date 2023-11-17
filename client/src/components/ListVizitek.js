import { useEffect, useState } from 'react';
import { Vizitka } from "../Vizitka";

export function ListVizitek() {
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
    }
  },
  {
    "UUID": "2d7e0a53-5a47-4b05-b8ea-60b3d7c8257c",
    "title_before": "Dr.",
    "first_name": "John",
    "middle_name": "Alexander",
    "last_name": "Smith",
    "title_after": "PhD",
    "picture_url": "https://picsum.photos/300",
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
    "picture_url": "https://picsum.photos/300",
    "location": "Česká Třebová",
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
    "picture_url": "https://picsum.photos/300",
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
    "picture_url": "https://picsum.photos/300",
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
    "picture_url": "https://picsum.photos/300",
    "location": "Houston",
    "claim": "Lawyer",
    "bio": "<p>I'm an experienced lawyer with expertise in various legal matters.</p>",
    "tags": [
      {
        "uuid": "e1",
        "name": "Legal Consultation"
      },
      {
        "uuid": "c20b98dd-f37e-4fa7-aac1-73300abf086e",
        "name": "Prezentační dovednosti"
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
    "picture_url": "https://picsum.photos/300",
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
  }];

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(fakeAPI);
  }, []);


  /* pro checkboxy tohle -> https://medium.com/@compmonk/react-multi-select-with-check-boxes-and-select-all-option-bd16941538f3 */
  /* filtr podle: https://route360.dev/en/post/filter-array-list/ */
  const [filterTags, setFilterTags] = useState([]);
  const [filterCities, setFilterCities] = useState([]);
  const filteredDATA = data.filter((node) => {
    const tagsMatch = (filterTags.length && 0) || filterTags.every((filterTag) => node.tags.map((tag) => tag.uuid).includes(filterTag));
    const citiesMatch = (filterCities.length && 0) || filterCities.every((filterCity) => node.location.includes(filterCity));

    return tagsMatch && citiesMatch; /* chatgpt trochu helpnul s returnováním obou filtrů naráz 💪 */
  }
  );

  const filterHandlerTag = (event) => {
    if (event.target.checked) {
      setFilterTags([...filterTags, event.target.value]);
    } else {
      setFilterTags(filterTags.filter((filterTag) => filterTag !== event.target.value));
    }
  };

  const filterHandlerCity = (event) => {
    if (event.target.checked) {
      setFilterCities([...filterCities, event.target.value]);
    } else {
      setFilterCities(filterCities.filter((filterCity) => filterCity !== event.target.value));
    }
  };

  return (
    <>
      <div className="flex flex-col bg-sunglow rounded-md p-3 m-5"> {/* zde budou checkboxy generovány dynamicky z JSON seznamu všech Tags */}

        <h1 className="text-jet text-2xl">Pro test 2 checkboxy, až bude API pro seznam všech tagů, tak budou dynamicky generovány.</h1>
        <span className="text-jet text-lg">Tagy</span>
        <label htmlFor="6d348a49-d16f-4524-86ac-132dd829b429">
          <input type="checkbox" onChange={filterHandlerTag} value="6d348a49-d16f-4524-86ac-132dd829b429" id="6d348a49-d16f-4524-86ac-132dd829b429" />
          <span className="text-jet text-xl">Dobrovolnictví</span> {/* name z tagu */}
        </label>

        <label htmlFor="c20b98dd-f37e-4fa7-aac1-73300abf086e">
          <input type="checkbox" onChange={filterHandlerTag} value="c20b98dd-f37e-4fa7-aac1-73300abf086e" id="c20b98dd-f37e-4fa7-aac1-73300abf086e" />
          <span className="text-jet text-xl">Prezentační dovednosti</span> {/* name z tagu */}
        </label>
        <span className="text-jet text-lg">Města</span>
        <label htmlFor="Brno">
          <input type="checkbox" onChange={filterHandlerCity} value="Brno" id="Brno" /> {/* value je uuid tagu, id taky (nazvy jsou s mezerami, takhle je to jednodušší)*/}
          <span className="text-jet text-xl">Brno</span> {/* name z tagu */}
        </label>
        <label htmlFor="Česká Třebová"> {/*sice při testu mu mezery nevadí, ale u víceslovných názvů oddělám mezery, případně i diakritiku, jen ať ID inputu nezlobí */}
          <input type="checkbox" onChange={filterHandlerCity} value="Česká Třebová" id="Česká Třebová" /> {/* value je uuid tagu, id taky (nazvy jsou s mezerami, takhle je to jednodušší)*/}
          <span className="text-jet text-xl">Česká Třebová</span> {/* name z tagu */}
        </label>
      </div>


      <div className='flex flex-wrap gap-3 p-2 justify-center'>
        {filteredDATA.map((data) => (
          <Vizitka key={data.UUID} lecturerData={data} />))}
      </div>
    </>
  );
}
