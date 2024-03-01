import { useEffect, useState } from 'react';
import { Vizitka } from "./Vizitka";
import FadeInView from './FadeInView';

import { MultiSelect } from 'primereact/multiselect';
import { InputNumber } from 'primereact/inputnumber';



import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Autocomplete, TextField, Stack, Slider, Accordion, AccordionDetails, AccordionSummary, Fade, Button, Pagination, Input, FormControl, InputLabel, Select, MenuItem, Chip, Box } from '@mui/material';


export function ListVizitek() {
  const [data, setData] = useState([]);
  const [tags, setTags] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filterTags, setFilterTags] = useState([]);
  const [filterCities, setFilterCities] = useState([]);
  const [filterPrice, setFilterPrice] = useState([20, 700]);
  const [filterPriceRange, setFilterPriceRange] = useState([20, 700]);

  //Ať se nám vrátí 1. stránka po filtrování
  useEffect(() => {
    setPage(1)
  }, [filterCities, filterPrice, filterTags])


  //var fetchURL = "http://7d17dc13931b9d11.app.tourdeapp.cz/api"
  var fetchURL = "http://localhost:8080/api"
  //ZMĚŇ PRO LOKÁLNÍ TESTOVÁNÍ NA LOCALHOST:8080


  /*async fetch --- https://www.webtutpro.com/javascript-fetch-tutorial-send-http-requests-with-react-js-and-async-await-example-1443608c12fa */
  useEffect(() => {
    async function fetchData() {
      var data = await fetch(fetchURL + "/lecturers/" /*"http://7d17dc13931b9d11.app.tourdeapp.cz/api/lecturers/"*/).then(res => {
        return res.json();
      }).catch((error) => {
        console.log(error);
      });

      if (data) {
        const price = data.map(value => { return value["price_per_hour"]; });
        setFilterPriceRange([Math.min(...price), Math.max(...price)])
        setFilterPrice([Math.min(...price), Math.max(...price)])
        setData(data);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      var data = await fetch(fetchURL + "/tag" /*"http://7d17dc13931b9d11.app.tourdeapp.cz/api/tag"*/).then(res => {
        return res.json();
      }).catch((error) => {
        console.log(error);
      });

      setTags(data);

    }
    fetchData();


  }, []);

  useEffect(() => {
    async function fetchData() {
      var data = await fetch(fetchURL + "/location" /*"http://7d17dc13931b9d11.app.tourdeapp.cz/api/location"*/).then(res => {
        return res.json();
      }).catch((error) => {
        console.log(error);
      });

      setLocations(data);
    }
    fetchData();
  }, []);

  const objectLocations = () => {
    let objectLocation = locations.map(function (elem) {
      return { "name": elem };
    })
    return objectLocation
  } /* ten multiselect chce objekty, locations jsou array, tak jim přidám "name": a je to v chillu -- edit: zmíněný multiselect nahrazen, ale stále využíváno*/

  /* pro checkboxy tohle -> https://medium.com/@compmonk/react-multi-select-with-check-boxes-and-select-all-option-bd16941538f3 ?*/
  /* filtr podle: https://route360.dev/en/post/filter-array-list/ */

  function valuetext(filterPriceRange) {
    return `${filterPriceRange} Kč`;
  }

  const filteredDATA = data.filter((node) => {
    console.log(node);
    const tagsMatch = (filterTags.length && 0) || filterTags.every((filterTag) => node.tags.map((tag) => tag.uuid).includes(filterTag.uuid));
    console.log(filterCities);
    console.log(locations);
    const citiesMatch = (filterCities.length && 0) || filterCities.every((filterCity) => node.location === (filterCity));
    console.log(citiesMatch);
    //const priceMatch = (!(filterPrice[1] <= filterPrice[0]) && filterPrice[1] >= filterPrice[0]) && filterPrice.every(() => node.price_per_hour <= (filterPrice[1]) && node.price_per_hour >= (filterPrice[0]));
    return tagsMatch && citiesMatch //&& priceMatch; /* chatgpt trochu helpnul s returnováním obou filtrů naráz 💪 */
  }
  );


  //MUI pagination
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const lectorCount = filteredDATA.length;
  var lectorsPerPage = 4;
  const paging = filteredDATA.slice((page - 1) * lectorsPerPage, (page * lectorsPerPage));

  console.log(data)
  return (
    <>
      <div className="flex h-full w-full px-10">
        {data.length === 0 ?
          <FadeInView className="self-center w-full">
            <div className='font-nadpis text-4xl text-white'>
              <div className='font-nadpis text-center'>Nebyl nalezen žádný lektor.</div>
              <div className='font-nadpis text-center'>Omlouváme se.</div>
            </div>
          </FadeInView> : <div className='flex h-full w-full flex-col items-center mt-6 pb-6'>
            <div className='mt-10 mb-5 flex flex-col justify-between w-full md:w-full flex-wrap'>
              <div><h1 className='font-odstavec text-4xl text-white'>Vyhledat lektora</h1></div>

              <div className='md:min-w-[20rem] sm:min-w-[10rem] min-w-[30rem] max-w-6xl relative flex gap-8'>

                <Stack className="w-full md:min-w-[30rem] sm:min-w-[14rem] min-w-[20rem]" >
                  <FormControl variant='filled' fullWidth className='bg-white p-2 rounded-md'>
                    <InputLabel id={"lokalita_label"}>Lokalita</InputLabel>
                    <Select labelId='lokalita_label' id='lokalita_select' multiple value={filterCities} onChange={(event) => {
                      const {
                        target: { value },
                      } = event;
                      setTags(
                        // On autofill we get a stringified value.
                        typeof value === 'string' ? value.split(',') : value.name,
                      );

                    }} renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value.name} />
                        ))}
                      </Box>
                    )}>
                      {tags.map((location) => {
                        return <MenuItem value={location.uuid}>{location.name}</MenuItem>
                      })}
                    </Select>
                  </FormControl>
                  <Autocomplete className='bg-white p-2 rounded-md'
                    multiple
                    id="lectors-tags"
                    options={tags}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
                    disableCloseOnSelect={true}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Vyberte tagy lektorů..."
                        placeholder="Tagy"
                      />
                    )}
                    onChange={(event, value) => {
                      console.log(value);
                      setFilterTags(value);
                    }}
                  />
                </Stack>

                <Stack className="w-full md:min-w-[30rem] sm:min-w-[14rem] min-w-[20rem]">
                  <FormControl variant='filled' fullWidth className='bg-white p-2 rounded-md'>
                    <InputLabel id={"lokalita_label"}>Lokalita</InputLabel>
                    <Select labelId='lokalita_label' id='lokalita_select' multiple value={filterCities} onChange={(event) => {
                      const {
                        target: { value },
                      } = event;
                      setFilterCities(
                        // On autofill we get a stringified value.
                        typeof value === 'string' ? value.split(',') : value,
                      );

                    }} renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}>
                      {locations.map((location) => {
                        return <MenuItem value={location}>{location}</MenuItem>
                      })}
                    </Select>
                  </FormControl>
                </Stack>

                <Stack className="w-full md:min-w-[30rem] sm:min-w-[14rem] min-w-[20rem]">
                  <TextField className='bg-white p-2 rounded-md'
                    size='medium'
                    variant="filled"
                    label="Cena od"
                  />
                </Stack>

                <Stack className="w-full md:min-w-[30rem] sm:min-w-[14rem] min-w-[20rem]">
                  <TextField
                    className='bg-white p-2 rounded-md'
                    size='medium'
                    variant="filled"
                    label="Cena do"
                  />
                </Stack>
              </div>


            </div>


            <div className='flex flex-wrap gap-10 justify-evenly w-full my-10 h-full'>

              {paging.map((data) => (
                <div className='h-fit w-[calc(50%-2rem)]'><FadeInView><Vizitka key={data.uuid} lecturerData={data} /></FadeInView></div>))}

            </div>


            <div className='mb-8'>
              {(filteredDATA.length === 0 && data.length !== 0) ? <div className='font-nadpis text-4xl text-white'>
                <FadeInView>
                  <div className='font-nadpis text-center'>Zadaným parametrům neodpovídá žádný lektor.</div>
                  <div className='font-nadpis text-center'>Omlouváme se.</div>
                </FadeInView>
              </div> : <div className='[&_button]:bg-white'><Pagination count={Math.ceil(lectorCount / lectorsPerPage)} page={page} onChange={handleChange} showFirstButton showLastButton color="primary" variant="outlined" size='large' /></div>
              }
            </div>

          </div>}

      </div>
    </>
  );
}

//max-w-[45rem] w-full min-h-[20rem]
/*
<MultiRangeSlider min={0} max={2000} onChange={({ min, max }) => { const price = [min, max]; setFilterPrice(price); }} />
*/