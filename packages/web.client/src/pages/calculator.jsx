import {
  AppBar,
  Button,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import axios from 'axios';
import ISO6391 from 'iso-639-1';
import moment from 'moment';
import { useSession } from 'next-auth/client';
import { useCallback, useState } from 'react';
import { DateUtils } from 'react-day-picker';

import DateRangePicker from './Components/DateRangePicker';

// Import OrderForDay from './Components/orderForDay/orderForDay';

const Login = 'Login';
const Logout = 'Logout';
const AddNewManager = 'Add new manager';
const DaysInProgramm = 'Дней в программе';
const PeopleQuantity = 'Количество людей';
const Adults = 'Взрослые (от 13 лет)';
const Child13 = 'Дети (7-12 лет)';
const Child6 = 'Дети (3-6 лет)';
const Child3 = 'Младенцы (до 3 лет)';
const Tourlider = 'Турлидер';
const DateSeason = 'Даты поездки/ Сезон';
const HighSeason = 'Высокий сезон (март-октябрь)';
const LowSeason = 'Низкий сезон (октябрь-март)';
const Language = 'Язык обслуживания';
const Citizenship = 'Страна/ Гражданство';
const Type = 'Класс обслуживания';
const Econom = 'Эконом';
const Standard = 'Стандарт (туризм)';
const Comfort = 'Комфорт';
const HotelType = 'Категория отеля';
const NoHotel = 'Не требуется';
const ThreeStar = 'Отель 3*';
const FourStar = 'Отель 4*';
const FiveStar = 'Отель 5*';
const MixedHotel = 'Смешанный';
const Rooming = 'Руминг';
const RoomForTwo = 'Двухмест. номера';
const RoomForOne = 'Одномест. номера';
const RoomForThree = 'Трехмест. размещ.**';
const Days = 'Дней:';
const StartDate = 'Дата начала:';
const Season = 'Сезон:';
const MainInfo = 'Основная информация по заказу';
const GroupInfo = 'Состав группы:';

const Calculator = ({ countries }) => {
  const [calculator, handleCalculator] = useState({
    country: '',
    comfortLevel: '',
    season: '',
    language: '',
    hotelType: '',
  });

  const [person, handlePerson] = useState({
    personAdult: '',
    personChild13: '',
    personChild6: '',
    personChild3: '',
    personTourLeader: '',
  });

  const [rooming, handleRooming] = useState({
    roomingForOne: '',
    roomingForTwo: '',
    roomingForThree: '',
  });

  const languageArr = ISO6391.getAllNames();

  const [dateState, handleDateState] = useState({
    from: null,
    to: null,
  });

  const [peopleSelect, handlePeopleSelect] = useState(false);

  const [roomingSelect, handleRoomingSelect] = useState(false);

  const peopleQnt = Array.from({ length: 50 }, (minus, index) => index);

  const [calendar, handleCalendar] = useState(false);

  const [session] = useSession();

  const handleOnRooming = useCallback(() => {
    handleRoomingSelect(!roomingSelect);
  }, [roomingSelect]);

  const handleOnCalendar = useCallback(() => {
    handleCalendar(!calendar);
  }, [calendar]);

  const handleOnPeople = useCallback(() => {
    handlePeopleSelect(!peopleSelect);
  }, [peopleSelect]);

  const handleOnDayClick = useCallback(
    (day) => {
      const range = DateUtils.addDayToRange(day, dateState);
      handleDateState(range);
    },
    [dateState]
  );

  const handleKeyDown = useCallback(() => {
    handleDateState(false);
  }, []);

  const handleOnDayResetClick = useCallback(() => {
    handleDateState({
      from: null,
      to: null,
    });
    handleCalendar(!calendar);
  }, [calendar]);

  const handleOnSelect = useCallback(
    (event) => {
      handleCalculator({
        ...calculator,
        [event.target.name]: event.target.value,
      });
    },
    [calculator]
  );

  const handleOnPersonSelect = useCallback(
    (event) => {
      handlePerson({
        ...person,
        [event.target.name]: event.target.value,
      });
    },
    [person]
  );

  const handleOnRoomingSelect = useCallback(
    (event) => {
      handleRooming({
        ...rooming,
        [event.target.name]: event.target.value,
      });
    },
    [rooming]
  );

  const daysIsNaN = isNaN(moment(dateState.to).add(1, 'days').diff(moment(dateState.from), 'days'));
  const days = moment(dateState.to).add(1, 'days').diff(moment(dateState.from), 'days');
  const howManyPeople = parseInt(
    person.personAdult +
      person.personChild3 +
      person.personChild6 +
      person.personChild3 +
      person.personTourLeader
  );
  const arePeopleNaN = isNaN(howManyPeople);

  return (
    <div
      className="container"
      style={{
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          {!session && (
            <Button href="/login" color="inherit">
              {Login}
            </Button>
          )}
          {session && (
            <div>
              <Button color="inherit">{Logout}</Button>
              <Button href="/register" color="inherit">
                {AddNewManager}
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div className="calculatorMenu">
        <div>
          {' '}
          <h1 style={{ padding: 20 }}>{MainInfo}</h1>{' '}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          {calendar ? (
            <div>
              <DateRangePicker
                State={dateState}
                onHandleResetClick={handleOnDayResetClick}
                onHandleDayClick={handleOnDayClick}
              />
            </div>
          ) : (
            <div
              className="text"
              id="personQnt"
              style={{
                minWidth: 200,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div className="calculatorMenuItem">
                <div
                  role="button"
                  tabIndex={0}
                  className="text"
                  id="personQnt"
                  onKeyDown={handleKeyDown}
                  onClick={handleOnCalendar}
                >
                  <p style={{ marginTop: '17px' }}>
                    {DaysInProgramm} <ArrowDropDownIcon />
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="calculatorMenuItem" style={{ height: peopleSelect ? '300px' : '60px' }}>
            <div
              className="text"
              id="personQnt"
              style={{
                minWidth: 200,
                marginLeft: 15,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div
                tabIndex={0}
                role="button"
                className="text"
                id="personQnt"
                onKeyDown={handleKeyDown}
                onClick={handleOnPeople}
              >
                <p style={{ marginTop: peopleSelect ? '15px' : '5px' }}>
                  {PeopleQuantity} {peopleSelect ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </p>
              </div>
              {peopleSelect ? (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <FormControl id="personAdult" style={{ width: peopleSelect ? '200px' : '400px' }}>
                    <InputLabel id="personAdult">{Adults}</InputLabel>
                    <Select
                      disableUnderline
                      id="personAdult"
                      name="personAdult"
                      value={person.personAdult}
                      onChange={handleOnPersonSelect}
                    >
                      {peopleQnt.map((id) => (
                        <MenuItem key={id} value={parseInt(id)}>
                          {id}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl id="personChild13" style={{ minWidth: 200 }}>
                    <InputLabel id="personChild13">{Child13}</InputLabel>
                    <Select
                      disableUnderline
                      id="personChild13"
                      name="personChild13"
                      value={person.personChild13}
                      onChange={handleOnPersonSelect}
                    >
                      {peopleQnt.map((id) => (
                        <MenuItem key={id} value={parseInt(id)}>
                          {id}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl id="personChild6" style={{ minWidth: 200 }}>
                    <InputLabel id="personChild6">{Child6}</InputLabel>
                    <Select
                      disableUnderline
                      id="personChild6"
                      name="personChild6"
                      value={person.personChild6}
                      onChange={handleOnPersonSelect}
                    >
                      {peopleQnt.map((id) => (
                        <MenuItem key={id} value={parseInt(id)}>
                          {id}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl id="personChild3" style={{ minWidth: 200 }}>
                    <InputLabel id="personChild3">{Child3}</InputLabel>
                    <Select
                      disableUnderline
                      id="personChild3"
                      name="personChild3"
                      value={person.personChild3}
                      onChange={handleOnPersonSelect}
                    >
                      {peopleQnt.map((id) => (
                        <MenuItem key={id} value={parseInt(id)}>
                          {id}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl id="personTourLeader" style={{ minWidth: 200, marginBottom: 15 }}>
                    <InputLabel id="personTourLeader">{Tourlider}</InputLabel>
                    <Select
                      disableUnderline
                      id="personTourLeader"
                      name="personTourLeader"
                      value={person.personTourLeader}
                      onChange={handleOnPersonSelect}
                    >
                      {peopleQnt.map((id) => (
                        <MenuItem key={id} value={parseInt(id)}>
                          {id}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              ) : null}
            </div>
          </div>
          <div className="calculatorMenuItem">
            <FormControl id="season" style={{ minWidth: 200, marginLeft: 15 }}>
              <InputLabel id="season">{DateSeason}</InputLabel>
              <Select
                disableUnderline
                id="season"
                name="season"
                value={calculator.season}
                onChange={handleOnSelect}
              >
                <MenuItem value={1}>{HighSeason}</MenuItem>
                <MenuItem value={2}>{LowSeason}</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="calculatorMenuItem">
            <FormControl id="language" style={{ minWidth: 200, marginLeft: 15 }}>
              <InputLabel id="language">{Language}</InputLabel>
              <Select
                disableUnderline
                id="language"
                name="language"
                value={calculator.language}
                onChange={handleOnSelect}
              >
                {languageArr.map((id) => (
                  <MenuItem key={id} value={id}>
                    {id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: 20 }}>
          <div className="calculatorMenuItem">
            <FormControl id="country" style={{ minWidth: 200, marginLeft: 15 }}>
              <InputLabel id="country">{Citizenship}</InputLabel>
              <Select
                disableUnderline
                id="country"
                name="country"
                value={calculator.country}
                onChange={handleOnSelect}
              >
                {countries.map((id) => (
                  <MenuItem key={id.name} value={id.name}>
                    {id.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="calculatorMenuItem">
            <FormControl id="comfortLevel" style={{ minWidth: 200, marginLeft: 15 }}>
              <InputLabel id="comfortLevel">{Type}</InputLabel>
              <Select
                disableUnderline
                id="comfortLevel"
                name="comfortLevel"
                value={calculator.comfortLevel}
                onChange={handleOnSelect}
              >
                <MenuItem value={1}>{Econom}</MenuItem>
                <MenuItem value={2}>{Standard}</MenuItem>
                <MenuItem value={3}>{Comfort}</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="calculatorMenuItem">
            <FormControl id="hotelType" style={{ minWidth: 200, marginLeft: 15 }}>
              <InputLabel id="hotelType">{HotelType}</InputLabel>
              <Select
                disableUnderline
                id="hotelType"
                name="hotelType"
                value={calculator.hotelType}
                onChange={handleOnSelect}
              >
                <MenuItem value={10}>{NoHotel}</MenuItem>
                <MenuItem value={1}>{ThreeStar}</MenuItem>
                <MenuItem value={2}>{FourStar}</MenuItem>
                <MenuItem value={3}>{FiveStar}</MenuItem>
                <MenuItem value={10}>{MixedHotel}</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="calculatorMenuItem" style={{ height: roomingSelect ? '200px' : '60px' }}>
            <div
              className="text"
              id="rooming"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '220px',
              }}
            >
              <div
                role="button"
                tabIndex={0}
                className="text"
                id="rooming"
                onKeyDown={handleKeyDown}
                onClick={handleOnRooming}
              >
                <p
                  style={{
                    marginTop: roomingSelect ? '15px' : '5px',
                    width: '185px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{Rooming}</span>{' '}
                  {roomingSelect ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </p>
              </div>
              {roomingSelect ? (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <FormControl
                    id="roomingForTwo"
                    style={{ width: roomingSelect ? '200px' : '400px' }}
                  >
                    <InputLabel id="roomingForTwo">{RoomForTwo}</InputLabel>
                    <Select
                      disableUnderline
                      id="roomingForTwo"
                      name="roomingForTwo"
                      value={rooming.roomingForTwo}
                      onChange={handleOnRoomingSelect}
                    >
                      {peopleQnt.map((id) => (
                        <MenuItem key={id} value={id}>
                          {id}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl id="roomingForOne" style={{ minWidth: 200 }}>
                    <InputLabel id="roomingForOne">{RoomForOne}</InputLabel>
                    <Select
                      disableUnderline
                      id="roomingForOne"
                      name="roomingForOne"
                      value={rooming.roomingForOne}
                      onChange={handleOnRoomingSelect}
                    >
                      {peopleQnt.map((id) => (
                        <MenuItem key={id} value={id}>
                          {id}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl id="roomingForThree" style={{ minWidth: 200, marginBottom: 15 }}>
                    <InputLabel id="roomingForThree">{RoomForThree}</InputLabel>
                    <Select
                      disableUnderline
                      id="roomingForThree"
                      name="roomingForThree"
                      value={rooming.roomingForThree}
                      onChange={handleOnRoomingSelect}
                    >
                      {peopleQnt.map((id) => (
                        <MenuItem key={id} value={id}>
                          {id}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div style={{ paddingBottom: 10, display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ margin: 20 }}>
            <p>
              {Days} {daysIsNaN ? 0 : days}
            </p>
            <p>
              {StartDate} {new Date(dateState.from).toLocaleDateString()}
            </p>
            <p>
              {Season} {calculator.season}
            </p>
            <p>
              {Language} {calculator.language}
            </p>
            <p>
              {Type} {calculator.comfortLevel}
            </p>
            <p>
              {Citizenship} {calculator.country}
            </p>
          </div>
          <div style={{ margin: 20 }}>
            <p>
              {GroupInfo} {arePeopleNaN ? howManyPeople : null}
            </p>
            <p>
              {Adults} {person.personAdult}
            </p>
            <p>
              {Child13} {person.personChild13}
            </p>
            <p>
              {Child6} {person.personChild6}
            </p>
            <p>
              {Child3} {person.personChild3}
            </p>
            <p>
              {Tourlider} {person.personTourLeader}
            </p>
          </div>
          <div style={{ margin: 20 }}>
            <p>
              {HotelType} {calculator.hotelType}
            </p>
            <p>{Rooming} </p>
            <p>
              {RoomForTwo} {rooming.roomingForTwo}
            </p>
            <p>
              {RoomForOne} {rooming.roomingForOne}
            </p>
            <p>
              {RoomForThree} {rooming.roomingForThree}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await axios.get('https://restcountries.eu/rest/v2/all');
  const data = await res.data;
  return {
    props: {
      countries: data,
    },
  };
};

export default Calculator;
