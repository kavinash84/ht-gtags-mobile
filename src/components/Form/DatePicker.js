import React, { Component } from 'react';
// import DayPickerInput from 'react-day-picker/DayPickerInput';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import DayPicker from 'react-day-picker';
import { formatDate, parseDate } from 'react-day-picker/moment';
import PropTypes from 'prop-types';
// import dateFnsFormat from 'date-fns/format';
import 'react-day-picker/lib/style.css';
import styles from './Form.module.scss';
import './Form.module.css';
import moment from 'moment';

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear, 0);
const toMonth = new Date(currentYear - 100, 11);

function YearMonthForm({ date, localeUtils, onChange }) {
  const months = localeUtils.getMonths();

  const years = [];
  for (let i = fromMonth.getFullYear(); i >= toMonth.getFullYear(); i -= 1) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <form className="DayPicker-Caption">
      <select name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
  );
}

// function FormatDate(date, format, locale) {
//   return dateFnsFormat(date, format, { locale });
// }
// FIXME - change it to HTC
class DatePickerForm extends Component {
  state = {
    displayDatePicker: false,
    selectedDay: null,
    month: fromMonth
  };

  handleYearMonthChange = month => {
    this.setState({ month }, () => console.log(month, 'month'));
  };

  toggleDatePicker = () => {
    this.setState({
      displayDatePicker: !this.state.displayDatePicker
    });
  };

  handleDayClick(day, { selected }) {
    this.setState({
      selectedDay: selected ? undefined : day
    });
  }

  render() {
    const { onChange, selectedDay } = this.props;
    const { displayDatePicker } = this.state;
    return (
      <div className={styles.profile_datepicker}>
        {/* <p className={styles.label}>Date of birth *</p> */}
        <div style={{ width: '100%' }}>
          {/* <DayPickerInput
            onDayChange={onChange}
            formatDate={FormatDate}
            format={format}
            parseDate={parseDate}
            value={value}
            {...props}
          /> */}
          <FormInput
            label="Date of birth *"
            type="text"
            value={selectedDay ? moment(selectedDay).format('DD/MM/YYYY') : ''}
            placeholder={selectedDay ? selectedDay : 'Click to select your Date of Birth'}
            onClick={this.toggleDatePicker}
            readOnly
          />
          {displayDatePicker ? (
            <DayPicker
              month={this.state.month}
              fromMonth={fromMonth}
              toMonth={toMonth}
              selectedDays={selectedDay}
              onDayClick={e => {
                onChange(e);
                this.toggleDatePicker();
              }}
              disabledDays={[{ after: new Date() }]}
              captionElement={({ date, localeUtils }) => (
                <YearMonthForm date={date} localeUtils={localeUtils} onChange={this.handleYearMonthChange} />
              )}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

DatePickerForm.propTypes = {
  onChange: PropTypes.func
};

DatePickerForm.defaultProps = {
  onChange: () => {}
};

export default DatePickerForm;
