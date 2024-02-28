import { Paper, Stack, TextField, IconButton, InputAdornment, Button, } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { Autocomplete, FormControl } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar, TimeClock } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import('dayjs/locale/cs')

export default function ReserveBox({ tags, cena }) {
    //const today = dayjs();
    const tomorrow = dayjs().add(1, 'day');

    const maxHour = 20;

    const [date, setDate] = useState(tomorrow);
    const [time, setTime] = useState(dayjs().hour(13));
    console.log(date.$D, date.$M, date.$y)
    const [value, setValue] = useState([]);
    const [duration, setDuration] = useState(1);
    const [maxDuration, setMaxDuration] = useState(maxHour - time.hour());
    useEffect(() => {
        setMaxDuration(maxHour - time.hour())
        if (duration > maxHour - time.hour()) {
            setDuration(maxHour - time.hour()) //kdyz tu byl setDur(maxDur), tak byl o 1 stav opozden, asi race condition? nvm
        }
    }, [time])
    
    

    function getDuration(e) {
        setDuration(parseInt(e.target.value))
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            alert('odešli formulář s' + document.getElementById('Telefon').value + ' a ' + document.getElementById('E-Mail').value);
        }}>
            <Paper elevation={5} className="p-3 text-center flex-col font-semibold flex lg:flex-col">

                <div className="flex lg:block justify-between">
                    <div className="w-full">
                        Řekněte nám pár údajů o sobě a zarezervujte si schůzku!
                        <Stack className="my-2">
                            <TextField required autoComplete="given-name" label="Jméno" type="text" id="Jmeno"></TextField>
                        </Stack>
                        <Stack className="my-2">
                            <TextField required autoComplete="family-name" label="Příjmení" type="text" id="Prijmeni"></TextField>
                        </Stack>

                        <Stack className="my-2">
                            <TextField required label="E-Mail" type="email" id="E-Mail"></TextField>
                        </Stack>

                        <Stack className="my-2">
                            <TextField required label="Telefonní číslo" type="tel" id="Telefon"></TextField>
                        </Stack>

                        <Autocomplete aria-required required className='bg-white p-2 rounded-xl'
                            multiple
                            id="Lector-tags"
                            options={tags}
                            getOptionLabel={(option) => option.name}
                            isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
                            disableCloseOnSelect={true}
                            value={value}
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
                    </div>
                    <Stack className="ml-3">
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
                            <p>Datum Vaší schůzky:</p>
                            <DateCalendar minDate={tomorrow} maxDate={dayjs().add(12, 'month')} value={date} onChange={(newDate) => setDate(newDate)} className="bg-sky rounded-lg" />
                        </LocalizationProvider>
                    </Stack>
                </div>

                <Stack>
                    <p className="text-xl">Vyberte si čas začátku schůzky</p>
                    <small>Naši lektoři tu jsou pro Vás od 8:00 do 20:00</small>
                </Stack>

                <Stack className="flex-1">
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
                        <TimeClock ampm={false} minTime={dayjs().hour(8)} maxTime={dayjs().hour(19)} value={time} onChange={(newValue) => setTime(newValue)} views={['hours']} sx={{
                            '& .css-4f0ona-MuiClock-clock': {
                                backgroundColor: 'rgb(116 199 211)',
                            }
                        }} />
                    </LocalizationProvider>
                </Stack>


                <Stack>
                    <div className="flex gap-5 justify-center w-full mt-3">
                        <label htmlFor="Doba">Počet hodin:</label>
                        <input type="number" name="Doba" id="Doba" value={duration} onChange={getDuration} max={maxDuration} min={1} className="max-w-[3rem] text-center bg-sunglow rounded-md"></input>
                    </div>
                    <p className="italic mb-3">Cena: { cena * duration}</p>
                    <p className="text-2xl"> <span className="text-prussian">{date.$D}.{date.$M}. {date.$y}</span> <br /><span className="text-prussian">{time.hour()}:00</span> - <span className="text-prussian">{time.hour() + duration}:00</span></p>
                </Stack>

                <Stack direction={"row"} flexWrap={"wrap"} justifyContent={"space-evenly"} className="my-2">
                    <Button type="submit" variant="contained" size="large" color="primary" >
                        <span className="font-bold">Závazně rezervovat</span>
                    </Button>

                </Stack>
                <small>Po rezervaci vyčkejte na reakci lektora. <br /> Lektor se může rozhodnout schůzku potvrdit či zrušit. <br /> V obou případech Vám zašleme e-mail.</small>
            </Paper>
        </form>

    )
}