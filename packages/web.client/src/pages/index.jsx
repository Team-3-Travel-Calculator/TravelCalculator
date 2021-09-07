import { AppBar, Button, CssBaseline, Toolbar } from '@material-ui/core';
import { getSession, signOut, useSession } from 'next-auth/client';
import { useCallback } from 'react';

const App = () => {
  const [session] = useSession();
  const login = 'Login';
  const logout = `Logout?`;

  const handleLogOut = useCallback(() => {
    void signOut();
  }, []);

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
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
              <Button href="/register" color="inherit">
                Add new manager
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
