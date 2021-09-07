import { AppBar, Button, CssBaseline, TextField, Toolbar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { getSession, signIn } from 'next-auth/client';
import { useCallback, useState } from 'react';

const LoginPage = () => {
  const [userForm, setUserForm] = useState({
    email: '',
    password: '',
  });

  const LoginText = 'Log In';
  const MainPage = 'Main Page';

  const handleInput = useCallback(
    (event) => {
      setUserForm({
        ...userForm,
        [event.target.id]: event.target.value,
      });
    },
    [userForm]
  );
  const handleLoginUser = useCallback(() => {
    void signIn('credentials', userForm);
  }, [userForm]);

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
            onClick={handleLoginUser}
          >
            {LoginText}
          </Button>
        </div>
      </Grid>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
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
}

export default LoginPage;
