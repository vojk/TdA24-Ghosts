import { Paper, Stack, TextField, IconButton, InputAdornment, Button } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useContext, useState } from "react";
import axios from 'axios'
import shajs from 'sha.js';

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
      id="password"
      value={password}
      autoComplete="current-password"
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
const handleLogin = async () => {
  const username = document.getElementById('loginName').value
  const password = shajs('sha256').update(document.getElementById('password').value).digest('hex');


  console.log(username, password);

  try {
    const response = await axios(
      {
        method: 'post',
        url: 'http://grf-4f82aad588e7b46f.app.tourdeapp.cz/api/login/',
        data: {
          loginName: username,
          password: password
        }
      }
    );
    if (response.status !== 200 || !response.data.token) {
      throw new Error('Login failed');
    }
    const token = response.data.token;
    localStorage.setItem('token', token);
    window.location.href = '/admin';
  } catch (error) {
    console.error('Login failed', error);
  }
};



export function LoginBox() {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      //alert('přihlaš mě s bcrypt(' + document.getElementById('Heslo').value + ') a ' + document.getElementById('Username').value);
      handleLogin();
    }}>
      <Paper elevation={5} className="p-3 text-center font-semibold md:max-w-md m-auto">
        Přihlaste se začněte vyučovat!
        <Stack className="my-2">
          <TextField required label="Username" type="tex" id="loginName"></TextField>
        </Stack>

        <Stack className="my-2">
          <PasswordInput />
        </Stack>

        {/* "zapomněl jsem heslo" a registrace */}

        {/*         <Stack direction={"row"} flexWrap={"wrap"} justifyContent={"center"} className="my-2">
          <Button size="small" color="secondary" onClick={() => {
            alert('no tak to seš v ******')
          }}>
            <span className="italic">Zapomněl jsem heslo</span>
          </Button>
        </Stack> */  }

        <Stack direction={"row"} flexWrap={"wrap"} justifyContent={"space-evenly"} className="my-2" gap={1}>

          {/*       <Button variant="contained" size="large" color="secondary" href="/register">
            Registrace
          </Button> */}

          <Button variant="contained" type="submit" size="large" color="primary">
            <span className="font-bold">Přihlásit</span>
          </Button>
        </Stack>

      </Paper>
    </form>
  )
}