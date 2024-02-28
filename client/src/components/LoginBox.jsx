import { Paper, Stack, TextField, IconButton, InputAdornment, Button} from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useContext, useState } from "react";
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


//příhlášení
const handleLogin = async() => {
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



export function LoginBox() {
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            alert('přihlaš mě s bcrypt('+document.getElementById('Heslo').value+') a '+document.getElementById('Username').value);
            handleLogin();
        }}>
        <Paper elevation={5} className="p-3 text-center font-semibold">
        Přihlaste se začněte vyučovat!
            <Stack className="my-2">
                <TextField required label="Username" type="tex" id="Username"></TextField>
            </Stack>

            <Stack className="my-2">
                <PasswordInput />
            </Stack>
            <Stack direction={"row"} flexWrap={"wrap"} justifyContent={"center"} className="my-2">
            <Button size="small" color="secondary" onClick={() => {
                    alert('no tak to seš v ******')
                }}>
                      <span  className="italic">Zapomněl jsem heslo</span>
                </Button>
            </Stack>
            <Stack direction={"row"} flexWrap={"wrap"} justifyContent={"space-evenly"} className="my-2" gap={1}>

                <Button variant="contained" size="large" color="secondary" href="/register">
                    Registrace
                </Button>

                <Button variant="contained" type="submit" size="large" color="primary">
                    <span className="font-bold">Přihlásit</span>
                </Button>
            </Stack>
            
        </Paper>
        </form>
    )
}