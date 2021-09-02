import { Grid, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';

const OrderForDayItems = ({ label, icon }) => (
  <Grid container alignItems="flex-end">
    {icon}
    <Grid item className="w-4/5 pl-3">
      <TextField label={label} className="w-11/12" />
    </Grid>
    <InfoIcon />
    <AddIcon />
    <CloseIcon />
  </Grid>
);

export default OrderForDayItems;
