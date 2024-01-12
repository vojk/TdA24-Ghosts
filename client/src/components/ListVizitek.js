import { useEffect, useState } from 'react';
import { Vizitka } from "./Vizitka";

export function ListVizitek() {
  const [data, setData] = useState([]);


  /*async fetch --- https://www.webtutpro.com/javascript-fetch-tutorial-send-http-requests-with-react-js-and-async-await-example-1443608c12fa */
  useEffect(() => {
    async function fetchData() {
      var data = await fetch("http://127.0.0.1:8080/api/lecturers/").then(res => {
        return res.json();
      });

      setData(data);
      console.log(data);
    }
    fetchData();
  }, []);

  /* pro checkboxy tohle -> https://medium.com/@compmonk/react-multi-select-with-check-boxes-and-select-all-option-bd16941538f3 ?*/
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
          <a href={"/lecturer/" + data.uuid}><Vizitka key={data.uuid} lecturerData={data} /></a>))}
      </div>
    </>
  );
}
