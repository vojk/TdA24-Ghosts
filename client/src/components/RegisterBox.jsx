import { Paper, Stack, TextField, IconButton, InputAdornment, Button, Autocomplete } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useContext, useState, useEffect } from "react";
import axios from 'axios'

/* https://medium.com/@sumsourabh14/how-i-created-toggle-password-visibility-with-material-ui-b3fb975b5ce4 */
const PasswordInput = ({ password, handlePassword }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <TextField
            type={showPassword ? "text" : "password"}
            label="Heslo"
            id="Heslo"
            value={password}
            onChange={handlePassword}
            required={true}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            fullWidth
        />
    );
};

const handleLogin = async () => {
    const username = document.getElementById('Username').value
    const password = document.getElementById('Heslo').value;

    try {
        const response = await axios.post('/api/credentials/checkuser', {
            username,
            password //přidat hash
        });
        const token = response.data.token;
        localStorage.setItem('token', token);
    } catch (error) {
        console.error('Login failed', error);
    }
};

export function RegisterBox() {
    const [tags, setTags] = useState([]);
    const [value, setValue] = useState([]);

    const fetchURL = "http://7d17dc13931b9d11.app.tourdeapp.cz/api/tag"

    useEffect(() => {
        async function fetchData() {
            var data = await fetch(fetchURL + "/tag" /*"http://7d17dc13931b9d11.app.tourdeapp.cz/api/tag"*/).then(res => {
                return res.json();
            }).catch((error) => {
                console.log(error);
            });

            setTags(data);
            console.log(data);
        }
        fetchData();


    }, []);

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
        }}>
            <Paper elevation={5} className="p-3 text-center font-semibold">

                {(typeof tags === 'ChangeMe') ? 'Nepodařilo se nám načíst potřebné tagy, zkuste to prosím později' : <> Vytvořte účet a začněte vyučovat! <Stack className="my-2">
                    <TextField required label="Username" type="text" id="Username"></TextField>
                </Stack>

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

                    <Stack className="my-2">
                        <PasswordInput />
                    </Stack>
                    <Stack className="my-2">
                        <TextField required label="Odkaz na fotku" type="url" id="Username" placeholder="https://example.com/uzasnafotka.jpg"></TextField>
                    </Stack>

                    <Stack direction={"row"} flexWrap={"wrap"} justifyContent={"space-evenly"} className="my-2" gap={1}>

                        <p>Vyberte si pomocí tagů svá zaměření</p>
                        {(typeof tags === 'undefined') ? 'Nepodařilo se nám načíst potřebné tagy, zkuste to prosím později' : <Autocomplete aria-required required className='bg-white p-2 rounded-xl'
                            multiple
                            id="lector-tags"
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

                            }} />}
                        <Button variant="contained" size="large" color="primary" type="submit">
                            <span className="font-bold">Registrovat</span>
                        </Button>
                    </Stack></>}


            </Paper>
        </form>
    )
}