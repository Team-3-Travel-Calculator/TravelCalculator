import {
  AppBar,
  Button,
  CssBaseline,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Mail } from '@material-ui/icons';

const confidentialityInfo = 'Политика конфиденциальности';
const contract = 'Договор оферты';
const contacts = 'Контакты';

const Layout = ({ children }) => {
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
      <Grid>{children}</Grid>
      <AppBar position="static">
        <Toolbar className="w-full items-stretch justify-between text-base">
          <Typography>{confidentialityInfo}</Typography>
          <Typography>{contract}</Typography>
          <Typography>{contacts}</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Layout;
