import { useEffect, useState } from 'react';
import { Vizitka } from "./Vizitka";
import TdA_LOGO_white from "../TdA/TdA_LOGO/TeacherDigitalAgency_LOGO_white.svg";
import TdA_studium_white from "../TdA/TdA_ikony/SVG/TdA_ikony_studium_white.svg";

import Multiselect from 'multiselect-react-dropdown';

export function ListVizitek() {
  const [data, setData] = useState([]);
  const [tags, setTags] = useState([]);


  /*async fetch --- https://www.webtutpro.com/javascript-fetch-tutorial-send-http-requests-with-react-js-and-async-await-example-1443608c12fa */
  useEffect(() => {
    async function fetchData() {
      var data = await fetch("http://127.0.0.1:8080/api/lecturers/" /* "http://7d17dc13931b9d11.app.tourdeapp.cz/api/lecturers/" */).then(res => {
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
      var data = await fetch("http://127.0.0.1:8080/api/tag" /* "http://7d17dc13931b9d11.app.tourdeapp.cz/api/tag" */).then(res => {
        return res.json();
      }).catch((error) => {
        console.log(error);
      });

      setTags(data);
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

  /*   const filterHandlerCity = (event) => {
      if (event.target.checked) {
        setFilterCities([...filterCities, event.target.value]);
      } else {
        setFilterCities(filterCities.filter((filterCity) => filterCity !== event.target.value));
      }
    }; */

  return (
    <>

      <div className="flex min-h-full">
        <div className="h-full w-64 fixed bg-sky hidden md:block">
          <img src={TdA_LOGO_white} className="px-14 py-5"></img>

          <a href="/"> <div className="flex gap-3 justify-center"><img src={TdA_studium_white} alt="" className="w-8"></img><span className="text-white text-xl ">Seznam lektorů</span></div> </a>
        </div>

        <div className='flex h-full w-full md:ml-64 flex-col'>
          <div className='bg-white min-h-[10rem] w-full'>

            <Multiselect //https://github.com/srigar/multiselect-react-dropdown/blob/master/README.md
              style={{
                option: { // To change search box element look
                  'color': 'rgb(51 51 51)',
                  'font-family': "'Open Sans', sans-serif"
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
            />
          </div>

          <div className='flex flex-wrap gap-10 justify-center my-10'>
            {filteredDATA.map((data) => (
              <a href={"/lecturer/" + data.uuid}><Vizitka key={data.uuid} lecturerData={data} /></a>))}
          </div>
        </div>
      </div>
    </>
  );
}
