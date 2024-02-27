import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState } from 'react';
import dayjs from 'dayjs';
import ReservedUser from './ReservedUser';


export default function LektorAdmin() {
    const [date, setDate] = useState(dayjs());
    const tomorrow = dayjs().add(1, 'day');
    console.log(date.$D, date.$M, date.$y)

    return (
        <div className='mt-4 flex max-w-6xl m-auto flex-row md:flex-col-reverse justify-between gap-2 flex-wrap'>
            <div className='flex items-center flex-col gap-2 flex-1'>
                <ReservedUser accepted={false}/>
                <ReservedUser accepted={true}/>
                <ReservedUser/>
                <ReservedUser/>
                <ReservedUser/>
                <ReservedUser/>
                <ReservedUser/>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
                <DateCalendar maxDate={dayjs().add(12, 'month')} value={date} onChange={(newDate) => setDate(newDate)} className="bg-sky rounded-lg m-0" />
            </LocalizationProvider>
        </div>
    )
}


