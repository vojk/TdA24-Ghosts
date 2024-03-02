import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import ReservedUser from './ReservedUser';
import ReserveBox from './ReserveBox';
import DOMPurify from 'dompurify';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stack, TextField, Autocomplete, Accordion, AccordionSummary } from '@mui/material';
import axios from 'axios';
import FadeInView from './FadeInView';

export default function LektorAdmin() {

  const [date, setDate] = useState(dayjs());
  console.log(dayjs(date).toISOString().slice(0, 10))


  const [userId, setUserId] = useState("");
  const [userReservations, setUserReservations] = useState([]);
  //date je vybrané datum v kalendáři, bude použito k třídění studentských rezervací

  const tomorrow = dayjs().add(1, 'day');
  const [data, setData] = useState([])
  //console.log(date.$D, date.$M, date.$y)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios(
          {
            method: 'post',
            url: 'http://7d17dc13931b9d11.app.tourdeapp.cz/api/lecturers/a/id_lektor',
            data: {
              token: localStorage.getItem('token')
            }
          }
        );
        console.log(response.data);
        try {
          const responsen = await axios(
            {
              method: 'get',
              url: 'http://7d17dc13931b9d11.app.tourdeapp.cz/api/reservation/' + response.data,
            }
          );
          console.log(responsen.data)
          setUserReservations(responsen.data)
          //setUserId(response.data);
        } catch (error) {
          console.error(error);
        }
        try {
          const responsens = await axios(
            {
              method: 'get',
              url: 'http://7d17dc13931b9d11.app.tourdeapp.cz/api/lecturers/' + response.data,
            }
          );
          console.log(responsens.data)
          setData(responsens.data)
          //setUserId(response.data);
        } catch (error) {
          console.error(error);
        }
        console.log("uziv. jmeno " + response.data)
        setUserId(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();

  }, [])

  // console.log(dayjs(date).toISOString().slice(0, 10))

  //data pro test
  const [loading, setLoading] = useState(1);





  //přibylo username
  const userData = data;
  const name = data.first_name;
  const mid_name = data.middle_name;
  const surname = data.last_name;
  const title_b = data.title_before;
  const title_a = data.title_after;
  const pic_url = data.picture_url;
  const cena = data.price_per_hour;
  const tags = data.tags ? data.tags : [];
  const location = data.location;
  const claim = DOMPurify.sanitize(data.claim);
  const bio = DOMPurify.sanitize(data.bio);
  const username = data.username;
  //const allTags = data.tags //bude potřeba ukázat všechny tagy na výběr, popř přidat nové
  const [allTags, setAllTags] = useState(data.tags)
  const [value, setValue] = useState([]); //tagy ve value se mohou poslat do db, zbytek přes form name/id ? 

  useEffect(() => {
    async function fetchData() {
      let exception = false;
      try {
        const response = await fetch("http://7d17dc13931b9d11.app.tourdeapp.cz/api/tag");
        const result = await response.json();
        setAllTags(result);
      }
      catch (error) {
        console.error("fetch:", error);
        setLoading(2)
        exception = true;
      } if (!exception) {
        setLoading(0)
      };
    }
    fetchData();
  }, [userId]);

  const stringdate = dayjs(date).toISOString().slice(0, 10);

  const filteredDATA = userReservations.filter((node) => {
    console.log(node);
    return node.date_of_reserv === stringdate;
  }
  );

  console.log(filteredDATA)
  console.log(stringdate)

  if (loading === 1) return <FadeInView><div className='font-nadpis text-white text-center flex justify-center'>Vydržte, než se stránka připraví.</div></FadeInView> //zneužiju tenhle Fade efekt a hláška se ukáže zpožděně, tak aspoň nebude otravovat když je zpoždění <0.3s
  if (loading === 2) return <FadeInView><div className='font-nadpis text-white text-center flex justify-center'>Nepodařilo se nám získat data.</div></FadeInView>


  if (loading === 0) {
    const telephone_numbers = data.contact ? data.contact.telephone_numbers : [];
    const emails = data.contact ? data.contact.emails : [];

    return (
      <div className='mx-10'>

        <div className='mt-2 text-white text-center'><p className='text-3xl font-nadpis'>Vítejte na Vašem admin panelu</p><p className='text-sm'>Své údaje lze aktualizovat níže</p></div>
        <div className='text-white text-left text-3xl font-nadpis'>Lidé vidí váš profil takto:</div>
        <div className='min-h-[20rem] mr-2 bg-white rounded-lg p-2'>
          <div className='flex justify-between flex-wrap mb-6 gap-2'>
            <div className="col-span-2 justify-between flex flex-col gap-4">

              <div>
                <h1 className='text-5xl text-left  font-nadpis'>{title_b} {name} {mid_name} {surname} {title_a}</h1>
              </div>

              <div className="flex flex-col gap-2">
                <div className='flex gap-8 flex-wrap'>
                  <div className='flex gap-1'><LocationOnOutlinedIcon /><h2 className="text-xl text-left font-nadpis">{location}</h2></div>
                  <div className='flex gap-1'><PaymentsOutlinedIcon /><h2 className="text-xl text-left font-nadpis">{cena}Kč/60min</h2></div>
                </div>

                <div className='flex flex-wrap w-full gap-2 self-end md:mt-12'> {/* div okolo všech tagů, ještě idk co s tím bude, třeba nějaký pozadí a stylování */}
                  {tags.map((tag, index) => {
                    return (
                      <>
                        {index < 100 ? <div key={tag.uuid} className='tag text-white font-bold bg-prussian overflow-hidden px-2 py-1 w-fit max-h-8 rounded-md'>
                          {tag.name}
                        </div> : (index === 100) && <div className="text-white bg-prussian font-bold px-2 py-1 aspect-square flex justify-center items-center w-[2rem] rounded-md">...</div>}
                      </>
                    )
                  }
                  )}
                </div>
              </div>
              <div><h2 className='text-md italic text-left font-odstavec'>{claim}</h2></div>
              <div className="flex gap-x-10 gap-y-2 flex-wrap">
                <div className="flex flex-col">
                  <div className='flex gap-4 flex-wrap'>
                    {telephone_numbers.map((element, index) => {
                      return (
                        <>
                          {<span className="px-3 bg-prussian py-1 rounded text-white"><LocalPhoneOutlinedIcon />{element}</span>}
                        </>
                      )
                    })}
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className='flex gap-4 flex-wrap'>
                    {emails.map((element, index) => {
                      return (
                        <>
                          {<span className="px-3 bg-prussian py-1 rounded text-white"><EmailOutlinedIcon />{element}</span>}
                        </>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="aspect-square h-full min-w-[15rem] w-[20%] lg:m-auto">
              <img src={pic_url} alt={'Picture of ' + name} className="rounded-md mt-2 w-full min-w-[15rem]" />
            </div>
          </div>
          <div className="flex gap-3 w-full flex-[2] md:flex-col">
            <div className="w-full h-full flex flex-col justify-between">
              <div className="w-full flex flex-col justify-between">
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-jet font-nadpis text-3xl">Něco o mně</h2>
            <div className='mb-4'>
              <div dangerouslySetInnerHTML={{ __html: bio }}></div>
            </div>
          </div>
        </div>

        <div className='flex justify-center flex-col items-center mt-4'>
          <p className='text-white text-3xl font-nadpis text-center'>Upravte si své údaje podle potřeby</p>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><div className='flex w-full font-nadpis text-xl px-8'>Začněte upravovat rozbalením nabídky</div></AccordionSummary>
            <Stack className="my-2 max-w-lg w-full self mr-2 p-2 bg-white rounded-lg flex gap-2">
              <TextField required name='Name' label="Jméno" type="text" id="Name" defaultValue={name}></TextField>
              <TextField required name='Mid_name' label="Prostřední jméno" type="text" id="Mid_name" defaultValue={mid_name}></TextField>
              <TextField required name="Surname" label="Příjmení" type="text" id="Surname" defaultValue={surname}></TextField>
              <TextField required name='Title_b' label="Titul před jménem" type="text" id="Title_b" defaultValue={title_b}></TextField>
              <TextField required name='Title_a' label="Titul před jménem" type="text" id="Title_a" defaultValue={title_a}></TextField>
              <TextField required name='Pic_url' label="Adresa obrázku" type="url" id="Pic_url" defaultValue={pic_url}></TextField>
              <TextField required name='Price' InputProps={{ inputProps: { min: 0 } }} label="Cena za 60 minut" type="number" id="Price" defaultValue={cena}></TextField>
              <TextField required name='Location' label="Lokace" type="text" id="Location" defaultValue={location}></TextField>
              <TextField required name='Claim' label="Claim" type="text" id="Claim" defaultValue={claim}></TextField>
              <TextField required name='Bio' multiline maxRows={4} label="Bio" type="text" id="Bio" defaultValue={bio}></TextField>

              <Autocomplete aria-required required className='bg-white p-2 rounded-xl'
                multiple
                id="Lector-tags"
                name="Lector-tags"
                options={allTags}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
                disableCloseOnSelect={true}
                value={value}
                defaultValue={tags}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Vyberte tagy, o které máte zájem"
                    placeholder="Tagy"
                    inputProps={{
                      ...params.inputProps,
                      required: value.length === 0
                    }}
                    required={true}
                  />
                )}
                onChange={(event, value) => {
                  console.log(value);
                  setValue(value)

                }} />

              <div className='flex w-full gap-4 flex-wrap'>
                {emails.map((element, index) => {
                  return (
                    <>
                      <TextField required name={'Email' + (index > 0 ? index : '')} label="Email" type="email" id={'Email' + (index > 0 ? index : '')} className='w-full' defaultValue={element}></TextField>
                    </>
                  )
                })}
              </div>
              <div className='flex w-full gap-4 flex-wrap'>
                {telephone_numbers.map((element, index) => {
                  return (
                    <>
                      <TextField required name={'tel' + (index > 0 ? index : '')} label="tel" type="tel" id={'tel' + (index > 0 ? index : '')} className='w-full' defaultValue={element}></TextField>
                    </>
                  )
                })}
              </div>
              <Stack direction={"row"} flexWrap={"wrap"} justifyContent={"space-evenly"} className="my-2">
                <Button type="submit" variant="contained" size="large" color="primary" >
                  <span className="font-bold">potvrdit</span>
                </Button>
              </Stack>
            </Stack>
          </Accordion>
        </div>

        <div className='mt-2 text-white text-center'><p className='text-3xl font-nadpis'>Vaši studenti již čekají na schválení!</p><p className='text-sm'>Po schválení či zamítnutí budou studenti obeznámeni.</p> <p className='text-sm'>Zvolte požadované datum v kalendáři níže.</p></div>
        <div className='mt-4 flex flex-row md:flex-col-reverse justify-between gap-2 flex-wrap-reverse'>
          <div className='flex flex-1 items-center flex-col gap-2'>

            {userReservations.length === 0 ? null : filteredDATA.map((data, index) => {
              console.log(index);
              return (<div><FadeInView><ReservedUser userData={data} key={index} /></FadeInView></div>)
            })}


          </div>
          {userReservations.length === 0 ? null : <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
            <div>    <DateCalendar maxDate={dayjs().add(12, 'month')} value={date} onChange={(newDate) => setDate(newDate)} className="bg-sky rounded-lg sticky top-4 md:relative md:top-0 w-fit" /></div>
          </LocalizationProvider>}
        </div>
      </div>
    )
  }
}


