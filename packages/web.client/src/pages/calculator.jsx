import { Grid } from '@material-ui/core';

import Layout from '../components/layout';
import OrderForDay from '../components/orderForDay/orderForDay';
import SelectForm from '../components/UI/select';

const orderInfo = 'Основная информация по заказу';
const days = 'Дней: 3';
const beginDay = 'Дата начала: не выбрано';
const season = 'Сезон: высокий (март-октябрь)';
const language = 'Язык обслуживания: English';
const serviceClass = 'Класс обслуживания: Стандарт';
const country = 'Гражданство/ Страна: Singapore';
const group = 'Состав группы: 7 чел';
const groupAdults = 'Взрослых (от 13лет): 3';
const groupChild1 = 'Дети (7-12 лет): 1';
const groupChild2 = 'Дети (3-6 лет): 1';
const groupChild3 = 'Младенцы (до 3 лет): 1';
const groupTourLeader = 'Турлидеры: 1';
const personal = 'Персонал: 2 чел';
const guide = 'Гиды: 1';
const driver = 'Водители: 1';
const transport = 'Транспорт';
const transportAmount = 'Единиц транспорта: 1';
const transportType = 'Тип транспорта: минивэн 7м';
const accommodationCategory = 'Категория размещения:';
const hotel = 'Отель 4*';
const rooming = 'Размещение/руминг:';
const hotelInfo = '(участники старше 3 лет)';
const roomingDouble = 'Двухместн. номер: 2';
const roomingSingle = 'Одноместн. номер 2';
const roomingThreePlaces = 'Трехмест. размещение** 0';

const Calculator = () => (
  <Layout>
    <Grid container className="flex-row p-1.5 text-blue-900">
      <Grid className="rounded-sm px-4 py-5 rounded bg-grey-100 w-full">
        <h4 className="text-lg mb-3">{orderInfo}</h4>
        <Grid item xs={12} className="w-full h-16 flex justify-between items-start flex-wrap">
          <SelectForm label="Дней в программе" />
          <SelectForm label="Количество человек" />
          <SelectForm label="Дата начала/Сезон" />
          <SelectForm label="Язык обслуживания" />
        </Grid>
        <Grid item xs={12} className="w-full flex justify-between flex-wrap">
          <SelectForm label="Страна/Гражданство" />
          <SelectForm label="Класс обслуживания" />
          <SelectForm label="Категория отеля" />
          <SelectForm label="Руминг" />
        </Grid>
        <Grid container className="justify-between flex-wrap">
          <Grid item className="p-6 text-sm">
            <p>{days}</p>
            <p>{beginDay}</p>
            <p>{season}</p>
            <p>{language}</p>
            <p>{serviceClass}</p>
            <p>{country}</p>
          </Grid>
          <Grid item className="p-6 text-sm">
            <p>
              <b>{group}</b>
            </p>
            <p>{groupAdults}</p>
            <p>{groupChild1}</p>
            <p>{groupChild2}</p>
            <p>{groupChild3}</p>
            <p>{groupTourLeader}</p>
          </Grid>
          <Grid item className="p-6 text-sm">
            <p>
              <b>{personal}</b>
            </p>
            <p>{guide}</p>
            <p>{driver}</p>
            <p>
              <b>{transport}</b>
            </p>
            <p>{transportAmount}</p>
            <p>{transportType}</p>
          </Grid>
          <Grid item className="p-6 text-sm">
            <p>
              <b>{accommodationCategory}</b>
            </p>
            <p>{hotel}</p>

            <p>
              <b>{rooming}</b>
            </p>
            <p>{hotelInfo}</p>
            <p>{roomingDouble}</p>
            <p>{roomingSingle}</p>
            <p>{roomingThreePlaces}</p>
          </Grid>
        </Grid>
      </Grid>
      <OrderForDay dayNumber="1" />
    </Grid>
  </Layout>
);

export default Calculator;
