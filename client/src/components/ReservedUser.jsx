import { Button } from '@mui/material'
import { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FadeInView from './FadeInView';
import dayjs from 'dayjs';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function ReservedUser({ accepted }) {
    //data budou dodána podle zvoleného datumu
    const userData = {
        date: '01-02-2024',
        name: 'Jan',
        surname: 'Novák',
        email: 'example@example.com',
        tel: '123 123 123',
        min_time: '17:00',
        max_time: '19:00',
        tags: [{ 'name': 'Hudba', "uuid": "332e1d6d-f5cb-4e54-97a1-43aeb4b778de" }, { 'name': 'Jsem tag', "uuid": "52fd7f2b-45ef-427a-9087-d2f12f1f7fb4" }, { "name": "Hráč", "uuid": "712644db-89ac-46ef-ac99-783cfae35266" }]

    }

    const [isOpened, setIsOpened] = useState(false)

    const toggleIsOpened = () => {
        setIsOpened(current => !current)
    }

    return (

        <>
            <div className="bg-sky p-3 rounded-md flex flex-wrap flex-col max-w-xl">
                <div className='flex w-full flex-wrap justify-between gap-2'>
                    <div className='flex-1 min-w-full'>
                        <div className='text-white bg-jet rounded-lg p-2 text-center'>{userData.name} {userData.surname}</div>
                        <div className='text-white text-center'>od {userData.min_time} do {userData.max_time}</div>
                    </div>
                    <div className='flex flex-row gap-2  flex-wrap m-auto'>
                        {accepted ? <p className='text-center m-auto font-bold text-white'>Schůzka potvrzena!</p> : <Button size="small" className='aspect-square' variant='contained' color="primary"><CheckIcon fontSize='large' /></Button>}
                        <Button size="small" className='aspect-square' variant='contained' color="secondary"><CloseIcon fontSize='large' /></Button>
                    </div>

                </div>

                <div className={'transition-all ease-in-out duration-300 [&>*]:text-white [&>div]:text-center overflow-hidden mt-2' + (isOpened ? ' max-h-[20rem]' : ' max-h-0 opacity-0')}>
                    <div className='underline underline-offset-2'> <a href={'mailto:' + userData.email}>{userData.email}</a></div>
                    <div className='underline underline-offset-2'> <a href={'tel:' + userData.tel}>{userData.tel}</a></div>
                    <div className='flex gap-2 justify-center flex-wrap mt-2'>
                        <span className=''> Student má zájem o:</span>
                        {userData.tags.map((tag, index) => {
                            return (
                                <>
                                    {<div key={tag.uuid} className='tag text-white font-bold bg-prussian overflow-hidden px-2 py-1 w-fit max-h-8 rounded-md'>
                                        {tag.name}
                                    </div>}
                                </>
                            )
                        }
                        )}
                    </div>
                </div>
                <div className='w-full flex justify-center'>
                    <ExpandMoreIcon onClick={toggleIsOpened} className={'cursor-pointer' + (isOpened ? ' rotate-180' : '')} />
                </div>
            </div>
        </>
    )
}