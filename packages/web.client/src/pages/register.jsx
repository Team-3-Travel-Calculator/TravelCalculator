import {
  AppBar,
  Button,
  CssBaseline,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Toolbar,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { getSession, useSession } from 'next-auth/client';
import { useCallback, useState } from 'react';

const Role = 'Role';
const Manager = 'Manager';
const Admin = 'Admin';

const RegisterPage = () => {
  const [session] = useSession();

  const [userForm, setUserForm] = useState({
    email: '',
    password: '',
    role: 0,
  });

  const LoginText = 'Add new user';

  const MainPage = 'Travel Calculator';

  const handleInput = useCallback(
    (event) => {
      if (event.target.id === 'role') {
        const role = parseInt(event.target.value);
        setUserForm({
          ...userForm,
          [event.target.id]: role,
        });
      } else {
        setUserForm({
          ...userForm,
          [event.target.id]: event.target.value,
        });
      }
    },
    [userForm]
  );

  const handleRegisterUser = useCallback(() => {
    axios.post('http://localhost:9811/user', userForm, {
      headers: { Authorization: `Bearer ${session.token}` },
    });
  }, [userForm, session.token]);

  return (
    <div>
      <div>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <div>
              <Button href="/" color="inherit">
                {MainPage}
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifycontent="center"
        style={{ minHeight: '70vh' }}
      >
        <div style={{ margin: 20 }}>
          <FormControl style={{ minWidth: 195 }}>
            <InputLabel>{Role}</InputLabel>
            <Select native inputProps={{ name: 'Role', id: 'role' }} onChange={handleInput}>
              <option aria-label="None" value="" />
              <option value={2}>{Manager}</option>
              <option value={4}>{Admin}</option>
            </Select>
          </FormControl>
        </div>
        <div style={{ margin: 20 }}>
          <TextField color="primary" id="email" label="Email" onChange={handleInput} />
        </div>
        <div style={{ margin: 20 }}>
          <TextField color="primary" id="password" label="Password" onChange={handleInput} />
        </div>
        <div>
          <Button
            style={{ margin: 20 }}
            variant="outlined"
            color="primary"
            onClick={handleRegisterUser}
          >
            {LoginText}
          </Button>
        </div>
      </Grid>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};

export default RegisterPage;
