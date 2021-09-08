import 'react-day-picker/lib/style.css';

import { Button } from '@material-ui/core';
import DayPicker from 'react-day-picker';

const DateRangePicker = ({ state, onHandleResetClick, onHandleDayClick }) => {
  const handleResetClick = onHandleResetClick;

  const handleDayClick = onHandleDayClick;

  const Reset = 'Сбросить';

  const FIRST_DAY_OF_WEEK = {
    ru: 1,
  };
  const LABELS = {
    ru: { nextMonth: 'следующий месяц', previousMonth: 'предыдущий месяц' },
  };
  const locale = 'ru';
  const { from, to } = state;
  const modifiers = { start: from, end: to };
  const WEEKDAYS_SHORT = {
    ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  };
  const MONTHS = {
    ru: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
  };
  const WEEKDAYS_LONG = {
    ru: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  };

  return (
    <div className="RangeExample">
      <p style={{ maxWidth: 200 }}>
        {!from && !to && 'Выберите первый день.'}
        {from && !to && 'Выберите второй день.'}
        {from &&
          to &&
          `Выбраны дни с ${from.toLocaleDateString()} по ${to.toLocaleDateString()}`}{' '}
        {from && to && (
          <Button className="link" onClick={handleResetClick}>
            {Reset}
          </Button>
        )}
      </p>
      <DayPicker
        className="Selectable"
        numberOfMonths={1}
        selectedDays={[from, { from, to }]}
        modifiers={modifiers}
        locale={locale}
        months={MONTHS[locale]}
        weekdaysLong={WEEKDAYS_LONG[locale]}
        weekdaysShort={WEEKDAYS_SHORT[locale]}
        firstDayOfWeek={FIRST_DAY_OF_WEEK[locale]}
        labels={LABELS[locale]}
        onDayClick={handleDayClick}
      />
    </div>
  );
};

export default DateRangePicker;
