import { useEffect, useState } from 'react';
import { Vizitka } from "./Vizitka";

import { MultiSelect } from 'primereact/multiselect';
import { InputNumber } from 'primereact/inputnumber';

export function ListVizitek() {
  const [data, setData] = useState([]);
  const [tags, setTags] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filterTags, setFilterTags] = useState([]);
  const [filterCities, setFilterCities] = useState([]);
  const [filterPrice, setFilterPrice] = useState([20, 700]);
  const [filterPriceRange, setFilterPriceRange] = useState([20, 700]);

  const objectLocations = () => {
    let objectLocation = locations.map(function (elem) {
      return { "name": elem };
    })
    console.log(objectLocation)
    console.log(tags)
    return objectLocation
  } /* ten multiselect chce objekty, locations jsou array, tak jim přidám "name": a je to v chillu*/

  /*async fetch --- https://www.webtutpro.com/javascript-fetch-tutorial-send-http-requests-with-react-js-and-async-await-example-1443608c12fa */
  useEffect(() => {
    async function fetchData() {
      var data = await fetch(/*"http://localhost:8080/api/lecturers/"*/ "http://7d17dc13931b9d11.app.tourdeapp.cz/api/lecturers/").then(res => {
        return res.json();
      }).catch((error) => {
        console.log(error);
      });

      const price = data.map(value => { return value["price_per_hour"]; });
      setFilterPriceRange([Math.min(...price), Math.max(...price)])
      setFilterPrice([Math.min(...price), Math.max(...price)])
      setData(data);
      console.log(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      var data = await fetch(/*"http://localhost:8080/api/tag" */"http://7d17dc13931b9d11.app.tourdeapp.cz/api/tag").then(res => {
        return res.json();
      }).catch((error) => {
        console.log(error);
      });

      setTags(data);
      console.log(data);
    }
    fetchData();


  }, []);

  useEffect(() => {
    async function fetchData() {
      var data = await fetch(/*"http://localhost:8080/api/location" */"http://7d17dc13931b9d11.app.tourdeapp.cz/api/location").then(res => {
        return res.json();
      }).catch((error) => {
        console.log(error);
      });

      setLocations(data);
      console.log(data);
    }
    fetchData();
  }, []);

  /* pro checkboxy tohle -> https://medium.com/@compmonk/react-multi-select-with-check-boxes-and-select-all-option-bd16941538f3 ?*/
  /* filtr podle: https://route360.dev/en/post/filter-array-list/ */


  const filteredDATA = data.filter((node) => {
    const tagsMatch = (filterTags.length && 0) || filterTags.every((filterTag) => node.tags.map((tag) => tag.uuid).includes(filterTag.uuid));
    const citiesMatch = (filterCities.length !== 0) ? filterCities.some((filterCity) => node.location.includes(filterCity.name)) : filterCities.every((filterCity) => node.location.includes(filterCity.name));
    const priceMatch = (!(filterPrice[1] <= filterPrice[0]) && filterPrice[1] >= filterPrice[0]) && filterPrice.every(() => node.price_per_hour <= (filterPrice[1]) && node.price_per_hour >= (filterPrice[0]));
    return tagsMatch && citiesMatch && priceMatch; /* chatgpt trochu helpnul s returnováním obou filtrů naráz 💪 */
  }
  );
  console.log(filteredDATA)

  return (
    <>
      <div className="flex min-h-full w-full px-8">
        <div className='flex h-full w-full flex-col'>
          <div className='mt-10'><h1 className='font-nadpis text-4xl text-white'>Seznam lektorů</h1></div>
          <div className='min-h-[5rem] w-full md:flex justify-center items-center'>

            {data.length === 0 ? <div className='font-nadpis text-4xl text-white'>
              <div className='font-nadpis'>Nebyl nalezen žádmý lektor</div>
              <div className='font-nadpis text-center'>Omlouváme se</div>
            </div> :
              <>
                <div className='p-4 w-full flex justify-center gap-9 md:px-0 px-16 2xl:flex-col'>
                  <MultiSelect value={filterTags} onChange={(e) => { console.log(e.value); setFilterTags(e.value) }} options={tags} optionLabel="name"
                    filter placeholder="Vyber tagy" maxSelectedLabels={3} className="w-full md:min-w-[30rem] min-w-[25rem]" />

                  <MultiSelect value={filterCities} onChange={(e) => { console.log(e.value); setFilterCities(e.value) }} options={objectLocations()} optionLabel="name"
                    filter placeholder="Vyber mesta" maxSelectedLabels={3} className="w-full md:min-w-[30rem] min-w-[25rem]" />

                  <div className='flex w-full gap-4 bg-white justify-center md:min-w-[30rem] rounded-full py-1 min-w-[25rem]'>
                    <div className='flex justify-center items-center gap-4'>
                      <div className='text-jet'>Minimální cena</div>
                      <InputNumber value={filterPrice[0]} defaultValue={filterPriceRange[0]} onChange={(e) => { setFilterPrice([e.value, filterPrice[1]]) }} className='px-1 py-2 bg-jet text-white rounded' allowEmpty={true} min={0} placeholder='?' />
                    </div>

                    <div className='flex justify-center items-center gap-4'>
                      <div className='text-jet'>Maximální  cena</div>
                      <InputNumber value={filterPrice[1]} defaultValue={filterPriceRange[1]} onChange={(e) => setFilterPrice([filterPrice[0], e.value])} className='px-1 py-2 bg-jet text-white rounded' allowEmpty={true} min={0} placeholder='?' />
                    </div>

                  </div>
                </div>
              </>
            }
          </div>


          <div className='flex flex-wrap gap-10 justify-center my-10'>
            {filteredDATA.map((data) => (
              <a href={"/lecturer/" + data.uuid} className='max-w-[45rem] w-full min-h-[20rem]'><Vizitka key={data.uuid} lecturerData={data} /></a>))}
          </div>
        </div>
      </div>
    </>
  );
}


/*
<MultiRangeSlider min={0} max={2000} onChange={({ min, max }) => { const price = [min, max]; setFilterPrice(price); }} />
*/