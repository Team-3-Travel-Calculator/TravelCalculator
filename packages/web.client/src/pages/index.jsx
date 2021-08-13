import { AppBar, Button, CssBaseline, IconButton, Toolbar } from '@material-ui/core';
import { Mail } from '@material-ui/icons';
import { getSession, signOut, useSession } from 'next-auth/client';
import { useCallback } from 'react';

const App = () => {
  const [session] = useSession();
  const login = 'Login';
  const logout = `You're logged, Logout?`;

  const handleLogOut = useCallback(() => {
    signOut();
  }, []);

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Mail />
          </IconButton>
          {!session && (
            <Button href="/login" color="inherit">
              {login}
            </Button>
          )}
          {session && (
            <div>
              <Button color="inherit" onClick={handleLogOut}>
                {logout}
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export const getServerSideProps = async (context) => ({
  props: {
    session: await getSession(context),
  },
});

export default App;
