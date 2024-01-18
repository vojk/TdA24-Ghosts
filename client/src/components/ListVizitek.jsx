import { useEffect, useState } from 'react';
import { Vizitka } from "./Vizitka";

import Multiselect from 'multiselect-react-dropdown';

export function ListVizitek() {
  const [data, setData] = useState([]);
  const [tags, setTags] = useState([]);
  const [locations, setLocations] = useState([]);

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
      var data = await fetch("http://localhost:8080/api/lecturers/" /* "http://7d17dc13931b9d11.app.tourdeapp.cz/api/lecturers/" */).then(res => {
        return res.json();
      }).catch((error) => {
        console.log(error);
      });

      setData(data);
      console.log(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      var data = await fetch("http://localhost:8080/api/tag"  /* "http://7d17dc13931b9d11.app.tourdeapp.cz/api/tag" */).then(res => {
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
      var data = await fetch("http://localhost:8080/api/location" /* "http://7d17dc13931b9d11.app.tourdeapp.cz/api/location" */).then(res => {
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
  const [filterTags, setFilterTags] = useState([]);
  const [filterCities, setFilterCities] = useState([]);
  const filteredDATA = data.filter((node) => {
    const tagsMatch = (filterTags.length && 0) || filterTags.every((filterTag) => node.tags.map((tag) => tag.uuid).includes(filterTag));
    const citiesMatch = (filterCities.length && 0) || filterCities.every((filterCity) => node.location.includes(filterCity));
    return tagsMatch && citiesMatch; /* chatgpt trochu helpnul s returnováním obou filtrů naráz 💪 */
  }
  );
  console.log(filteredDATA)

  return (
    <>

      <div className="flex min-h-full w-full">
        <div className='flex h-full w-full flex-col'>
          <div className='bg-jet border-b-4 min-h-[10rem] w-full md:flex'>

            <div className='w-full p-4 max-w-[36rem] m-auto md:m-0'>
              <Multiselect //https://github.com/srigar/multiselect-react-dropdown/blob/master/README.md
                style={{
                  option: { // To change search box element look
                    'color': 'rgb(51 51 51)',
                    'fontFamily': "'Open Sans', sans-serif"
                  }
                }}
                options={tags} // Options to display in the dropdown
                onSelect={(selectedList, selectedItem) => {
                  setFilterTags([...filterTags, selectedItem.uuid]);
                  console.log(selectedItem)
                }}// Function will trigger on select event

                onRemove={(removedList, removedItem) => {
                  setFilterTags(filterTags.filter((filterTag) => filterTag !== removedItem.uuid))
                  console.log(removedItem)
                }} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                placeholder='Vyber pomocí tagů!'
                hidePlaceholder true
              />
            </div>

            <div className='w-full p-4 max-w-[36rem] m-auto md:m-0'>
              <Multiselect

                style={{
                  option: { // To change search box element look
                    'color': 'rgb(51 51 51)',
                    'fontFamily': "'Open Sans', sans-serif"
                  }
                }}
                options={objectLocations()} // Options to display in the dropdown
                onSelect={(selectedList, selectedItem) => {
                  setFilterCities([...filterCities, selectedItem.name]);
                  console.log(selectedItem.name)
                }}// Function will trigger on select event
                onRemove={(removedList, removedItem) => {
                  setFilterCities(filterCities.filter((filterTag) => filterTag !== removedItem.name))
                }} // Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
                selectionLimit={1}
                placeholder='Vyber podle lokality!'
                hidePlaceholder true
              />
            </div>
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
