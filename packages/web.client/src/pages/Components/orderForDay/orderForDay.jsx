import { Grid } from '@material-ui/core';
// Import TextField from '@material-ui/core/TextField';
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

// Import Autocomplete from '@material-ui/lab/Autocomplete';
import OrderForDayItems from './OrderForDayItems/OrderForDayItems';

const orderInfo = 'Программа заказа';
const numberOfDay = 'День №';
const toAdd = 'Добавить';
const location = 'локацию';
const numberZero = '0';
const minute = 'минут';
const hour = 'часов';
const kilometres = 'километров';
/*
 * Const Regions = [
 *   { title: 'Almaty', code: 1 },
 *   { title: 'AlmatyRegion', code: 2 },
 *   { title: 'NurSultan', code: 3 },
 *   { title: 'AkmolaRegion', code: 4 },
 *   { title: 'Shymkent', code: 5 },
 *   { title: 'Turkestan', code: 6 },
 *   { title: 'TurkestanRegion', code: 7 },
 *   { title: 'Aktau', code: 8 },
 *   { title: 'MangistauRegion', code: 9 },
 *   { title: 'Karaganda', code: 10 },
 *   { title: 'KaragandaRegion', code: 11 },
 *   { title: 'Oskemen', code: 12 },
 *   { title: 'EastKazakhstanRegion', code: 13 },
 *   { title: 'Petropavlosk', code: 14 },
 *   { title: 'NorthKazakhstanRegion', code: 15 },
 *   { title: 'Kostanay', code: 16 },
 *   { title: 'KostanayRegion', code: 17 },
 *   { title: 'Atyrau', code: 18 },
 *   { title: 'AtyrauRegion', code: 19 },
 *   { title: 'Aktobe', code: 20 },
 *   { title: 'AktobeRegion', code: 21 },
 *   { title: 'Semey', code: 22 },
 *   { title: 'Uralsk', code: 23 },
 *   { title: 'WestKazakhstanRegion', code: 24 },
 *   { title: 'Pavlodar', code: 25 },
 *   { title: 'PavlodarRegion', code: 26 },
 *   { title: 'Taraz', code: 27 },
 *   { title: 'ZhambylRegion', code: 28 },
 *   { title: 'Kokshetau', code: 29 },
 *   { title: 'Kyzylorda', code: 30 },
 *   { title: 'KyzylordaRegion', code: 31 },
 *   { title: 'Temirtau', code: 32 },
 *   { title: 'Taldykorgan', code: 33 },
 *   { title: 'Ekibastuz', code: 34 },
 * ];
 */

const OrderForDay = ({ dayNumber }) => (
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
        {/* <Autocomplete*/}
        {/*  Id="region"*/}
        {/*  Options={Regions}*/}
        {/*  GetOptionLabel={(option) => option.title}*/}
        {/*  Style={{ width: 300, marginLeft: 20 }}*/}
        {/*  RenderInput={(params) => <TextField {...params} label="Регион" variant="outlined" />}*/}
        {/* />*/}
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
