import { Grid, TextField } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import ExploreIcon from '@material-ui/icons/Explore';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import LocalHotelIcon from '@material-ui/icons/LocalHotel';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';

import OrderForDayItems from './OrderForDayItems/OrderForDayItems';

const orderInfo = 'Программа заказа';
const numberOfDay = 'День №';
const toAdd = 'Добавить';
const location = 'локацию';
const numberZero = '0';
const minute = 'минут';
const hour = 'часов';
const kilometres = 'километров';

const OrderForDay = ({ value, handleChange, dayNumber }) => (
  <Grid container className="py-5 px-4 flex-col">
    <Grid item>
      <h4 className="text-lg mb-4">{orderInfo}</h4>
    </Grid>
    <Grid
      container
      className="bg-yellow-200 rounded-full flex-row justify-between items-center pr-7"
    >
      <Grid item>
        <div className="flex w-56 h-20 bg-yellow-300 rounded-full justify-center items-center">
          <h4 className="m-0 text-2xl">{numberOfDay + dayNumber}</h4>
        </div>
      </Grid>
      <Grid item className="w-80 flex flex-row justify-between items-center">
        <p>
          {toAdd} <br /> {location}
        </p>
        <AddCircleOutlineIcon />
        <TextField value={value} className="w-52 h-9" onChange={handleChange} />
      </Grid>
      <Grid className="w-40">
        <Grid className="w-full flex justify-between items-center mb-1">
          <AccessTimeIcon /> <span className="bg-white px-1.5 py-0.5 rounded-sm">{numberZero}</span>{' '}
          {hour}
          <span className="bg-white px-1.5 py-0.5 rounded-sm">{numberZero}</span> {minute}
        </Grid>
        <Grid className="w-full flex justify-between items-center">
          <LocalTaxiIcon /> <span className="bg-white px-1.5 py-0.5 rounded-sm">{numberZero}</span>{' '}
          {kilometres}
        </Grid>
      </Grid>
      <HelpOutlineIcon />
    </Grid>
    <Grid container className="pt-10" spacing={2}>
      <Grid item xs={6}>
        <OrderForDayItems label="Добавить трансфер между двумя точками" icon={<DriveEtaIcon />} />
        <OrderForDayItems
          label="Добавить транспортные услуги по городу"
          icon={<EmojiTransportationIcon />}
        />
        <OrderForDayItems label="Выбрать объекты посещения по городу" icon={<ExploreIcon />} />
        <OrderForDayItems label="Добавить гида/гида-переводчика " icon={<DirectionsWalkIcon />} />
        <OrderForDayItems
          label="Добавить питание. Обеды, ужины, другое"
          icon={<LocalDiningIcon />}
        />
        <OrderForDayItems label="Выбрать дополнительные услуги" icon={<LocalBarIcon />} />
        <OrderForDayItems label="Добавить место размещения/отель" icon={<LocalHotelIcon />} />
      </Grid>
      <Grid item xs={6} className="w-full h-full m-1.5 rounded border-2 border-yellow-300" />
    </Grid>
  </Grid>
);
export default OrderForDay;
