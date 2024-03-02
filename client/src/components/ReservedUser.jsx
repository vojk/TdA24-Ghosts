import { Button } from '@mui/material'
import { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FadeInView from './FadeInView';
import dayjs from 'dayjs';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import ConfirmDialog from './ConfirmDialog';

import { VCALENDAR, VEVENT } from 'ics-js';
import axios from 'axios';

export default function ReservedUser({ userData }) {

  const UserData = userData;

  const [potvrzeno, setPotvrzeno] = useState(userData.souhlas)
  //data budou dodána podle zvoleného datumu

  /*   const userData = {
      date: '2024-01-28',
      name: 'Jan',
      surname: 'Novák',
      email: 'example@example.com',
      tel: '123 123 123',
      min_time: '17',
      max_time: '19',
      location: 'online',
      tags: [{ 'name': 'Hudba', "uuid": "332e1d6d-f5cb-4e54-97a1-43aeb4b778de" }, { 'name': 'Jsem tag', "uuid": "52fd7f2b-45ef-427a-9087-d2f12f1f7fb4" }, { "name": "Hráč", "uuid": "712644db-89ac-46ef-ac99-783cfae35266" }]
    } */



  //const [isOpened, setIsOpened] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  function deleteUser() {
    axios.delete('http://7d17dc13931b9d11.app.tourdeapp.cz/api/reservation/' + userData.uuid)
    document.getElementById(userData.uuid).remove()
    //window.location.reload()
  }

  /*   const toggleIsOpened = () => {
      setIsOpened(current => !current)
    } */




  const cal = new VCALENDAR();
  cal.addProp('VERSION', 2) // Number(2) is converted to '2.0'
  cal.addProp('PRODID', 'Teacher Digital Agency');

  const event = new VEVENT();
  event.addProp('UID')
  event.addProp('DTSTAMP', dayjs(userData.date_of_reserv + ' ' + userData.from_time).toDate(), { VALUE: 'DATE-TIME' });
  event.addProp('ATTENDEE', null, {
    CN: userData.firstName + ' ' + userData.lastName,
    RSVP: 'TRUE:mailto:' + userData.email
  })
  event.addProp('LOCATION', userData.location)

  cal.addComponent(event);
  console.log(cal.toString())
  console.log(UserData)
  const downloadFile = window.URL.createObjectURL(cal.toBlob())

  return (

    <div id={userData.uuid}>
      <a href={downloadFile}>stáhnout do kalendáře (.ics)</a>

      <div className="bg-white max-w-2xl min-w-[20rem] p-3 px-10 rounded-md flex flex-wrap flex-col w-full">
        <div className='flex w-full flex-wrap justify-between gap-2'>

          <div className='flex-1 min-w-full'>
            <div className='text-jet rounded-lg p-2 text-left font-bold'>{userData.firstName} {userData.middleName} {userData.lastName}</div>
            <div className='text-jet text-left capitalize'>{dayjs(userData.date_of_reserv).format('D. M. YYYY')} {userData.from_time}:00 - {userData.to_time}:00 {userData.location}</div>
          </div>

          <div className={'[&>*]:text-jet [&>div]:text-center flex gap-5 w-full'}>
            <div className='underline underline-offset-2'> <a href={'mailto:' + userData.email}>{userData.email}</a></div>
            <div className='underline underline-offset-2'> <a href={'tel:' + userData.prefix + userData.telephone}>+{userData.prefix} {userData.telephone}</a></div>
          </div>

          <div className='flex gap-2 w-full flex-wrap'>
            {userData.tags ? userData.tags.map((tag, index) => {
              return (
                <>
                  {<div key={tag.uuid} className='tag text-white text-xs bg-prussian overflow-hidden px-1 w-fit p-1 rounded-md'>
                    {tag.name}
                  </div>}
                </>
              )
            }
            ) : <></>}
          </div>



          <div className='flex flex-row gap-2 flex-wrap items-end justify-end w-full'>
            {potvrzeno === 1 ? <p className='text-center m-auto font-bold text-jet'>Schůzka potvrzena!</p> : <Button size="large" className='' variant='contained' color="primary"
              onClick={() => {
                axios.put('http://7d17dc13931b9d11.app.tourdeapp.cz/api/reservation/updateTeacher', { "id": userData.uuid, "souhlas": 1 })
                setPotvrzeno(1)

              }}>potvrdit</Button>}
            <Button size="large" className='' variant='contained' color="secondary" aria-label='delete' onClick={() => setConfirmOpen(true)}>Zrušit</Button>
            <ConfirmDialog
              title="Odstranit studenta?"
              open={confirmOpen}
              setOpen={setConfirmOpen}
              onConfirm={deleteUser}
            >
              Vážně chcete studenta odstranit?
            </ConfirmDialog>
          </div>

        </div>


      </div>
    </div>
  )
}