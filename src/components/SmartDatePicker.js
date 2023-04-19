import { useState, useEffect } from "react";
import { format, getYear, isExists } from "date-fns";
const minYear = 1900;
const days = [...Array(31).keys()].map((e) => e + 1);
const months = [...Array(12).keys()];
const years = [...Array(getYear(new Date()) - minYear + 1).keys()].map(
  (e) => e + minYear
);

function SmartDatePicker({ value }) {
  const [dayOptions, setDayOptions] = useState(days);
  const [date, setDate] = useState({ d: null, m: null, y: null });
  const [pickedDate, setPickedDate] = useState(null);

  useEffect(() => {
    listUpdater()
    dateValidator(date)
  }, [date]);

  useEffect(() => {
    console.log(
      `data inserita: ${pickedDate}`
    );
  }, [pickedDate])

  function listUpdater() {
    setDayOptions(
      days.map((d) =>
        isExists(parseInt(date.y), parseInt(date.m), d) ? d : null
      )
    );
  }

  function dayHandler(e) {
    setDate({ ...date, d: e.target.value });
  }

  function monthHandler(e) {
    setDate({ ...date, m: e.target.value });
  }

  function yearHandler(e) {
    setDate({ ...date, y: e.target.value });
  }

  function dateValidator(date) {
    isExists(parseInt(date.y), parseInt(date.m), parseInt(date.d)) &&
    date.y &&
    date.m &&
    date.d
      ? setPickedDate(new Date(date.y, date.m, date.d))
      : setPickedDate(null);
  }

  return (
    <div>
      <select id="day" onChange={dayHandler} defaultValue={"invalid"}>
        <option value="invalid" disabled>
          Giorno
        </option>
        {dayOptions.map((day) => (
          <option value={day} hidden={day === null}>
            {day}
          </option>
        ))}
      </select>
      <select id="month" onChange={monthHandler} defaultValue={"invalid"}>
        <option value="invalid" disabled>
          Mese
        </option>
        {months.map((month) => (
          <option value={month} hidden={month === null}>
            {format(new Date(1900, month, 1), "MMMM")}
          </option>
        ))}
      </select>
      <select id="year" onChange={yearHandler} defaultValue={"invalid"} >
        <option value="invalid" disabled>
          Anno
        </option>
        {years.map((year) => (
          <option value={year} hidden={year === null}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SmartDatePicker;