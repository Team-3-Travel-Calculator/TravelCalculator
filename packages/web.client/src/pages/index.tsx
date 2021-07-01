import { AppBar, Button, CssBaseline, IconButton, Toolbar } from '@material-ui/core';
import { Mail } from '@material-ui/icons';
import type { NextPage } from 'next';

const App: NextPage = () => {
  const login = 'Login';

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Mail />
          </IconButton>
          <Button color="inherit">{login}</Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default App;
