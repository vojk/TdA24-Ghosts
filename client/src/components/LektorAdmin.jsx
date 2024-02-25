import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState } from 'react';
import dayjs from 'dayjs';


export default function LektorAdmin() {
    const [value, setValue] = useState(dayjs());
    console.log(value.$D,value.$M,value.$y)

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
        </LocalizationProvider>
    )
}


