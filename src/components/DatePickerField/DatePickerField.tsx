import { forwardRef } from 'react';
import { useRef } from 'react';
import DatePicker, { DatePickerProps } from 'react-datepicker';
import s from './DatePickerField.module.css';

import { registerLocale } from 'react-datepicker';
import { enGB } from 'date-fns/locale/en-GB';
registerLocale('en', enGB);

type DatePickerFieldProps = DatePickerProps & {
  placeholderText?: string;
  maxDate?: Date;
};

const DatePickerField = forwardRef<DatePicker, DatePickerFieldProps>(
  (
    {
      placeholderText = 'Select your birthday',
      maxDate = new Date(),
      ...rest
    },
    ref
  ) => {
    const isSelected = !!rest.selected;
    const inputRef = useRef<HTMLInputElement | null>(null);
    return (
      <div
        className={`${s.datePickerWrapperWithIcon} ${isSelected ? s.selected : ''}`}
        onClick={() => inputRef.current?.click()}
      >
        <DatePicker
          {...rest}
          locale="en"
          shouldCloseOnSelect
          maxDate={maxDate}
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={100}
          dateFormat="dd.MM.yyyy"
          placeholderText={placeholderText}
          wrapperClassName={s.datePickerWrapper}
          className={s.datePickerInput}
          selected={rest.selected}
          ref={(ref) => {
            if (ref?.input instanceof HTMLInputElement) {
              inputRef.current = ref.input;
            }
          }}
        />
        <svg className={s.calendarIcon} width={18} height={18}>
          <use href="/icons.svg#icon-calendar" />
        </svg>
      </div>
    );
  }
);

export default DatePickerField;
