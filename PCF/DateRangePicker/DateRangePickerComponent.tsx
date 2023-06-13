import * as React from 'react';
import { DatePicker, mergeStyleSets, DayOfWeek, IDatePicker, IRefObject, IDatePickerStyles } from '@fluentui/react';

interface DateRangePickerProps {
  onStartDateChange?: (startDate: Date | null | undefined) => void;
  onEndDateChange?: (endDate: Date | null | undefined) => void;
  //notifyFn?: () => void;
  containerWidth?: number;
  containerHeight?: number;
  minDate?: Date;
  maxDate?: Date;
  startDate?: Date;
  endDate?: Date;
}

const DateRangePickerComponent: React.FunctionComponent<DateRangePickerProps> = ({
  onStartDateChange,
  onEndDateChange,
  containerWidth = 400,
  containerHeight = 150,
  minDate = new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate()),
  maxDate = new Date(),
  startDate,
  endDate
}) => {


  //const [startDate, setStartDate] = React.useState<Date | undefined>(defaultStartDate);
  //const [endDate, setEndDate] = React.useState<Date | undefined>(defaultEndDate);

  const startDatePickerRef = React.useRef<IDatePicker>(null);
  const endDatePickerRef = React.useRef<IDatePicker>(null);
/*
  const handleStartDateChange = React.useCallback((date: Date | null | undefined) => {

    setStartDate(date || undefined);
    if (onStartDateChange) {
      onStartDateChange(date || undefined);
    }
    if (date && (!endDate || date > endDate)) {
      setEndDate(date || undefined);
      if (onEndDateChange) {
        onEndDateChange(date || undefined);
      }
      //endDatePickerRef.current?.focus();
    }
    if (notifyFn){
      notifyFn()
    }
  }, [endDate, onStartDateChange, onEndDateChange]);

  const handleEndDateChange = React.useCallback((date: Date | null | undefined) => {

    setEndDate(date || undefined);
    if (onEndDateChange) {
      onEndDateChange(date || undefined);
    }
    if (date && (!startDate || date < startDate)) {
      setStartDate(date || undefined);
      if (onStartDateChange) {
        onStartDateChange(date || undefined);
      }
      //startDatePickerRef.current?.focus();
    }
    if (notifyFn){
      notifyFn()
    }
  }, [startDate, onStartDateChange, onEndDateChange]);
*/

  //const datePickerStyles: Partial<IDatePickerStyles> = { root: { minWidth: 100, marginTop: 15, textAlign: 'left' }};

  const onFormatDate = (date?: Date): string => {
    return !date ? '' : (date.getMonth() + 1) + '/' + date.getDate() + '/' +  (date.getFullYear());
  };

  const styles = React.useMemo(() => mergeStyleSets({
    wrapper: {
      display: 'flex',
      //justifyContent: 'space-between',
      width: '100%',
      height: '100%'
    },
    datePicker: { width: containerWidth/2-1, height: 55, minWidth: 100, marginTop: 15, textAlign: 'left'},
  }), []);

  return (
    <div
      className={styles.wrapper}
    >
      <DatePicker
        //style= {{width: containerWidth/2 - 1, height: containerHeight, fontSize: 30 }}
        componentRef={startDatePickerRef}
        className={styles.datePicker}
        label="Start Date"
        placeholder="Select a start date"
        allowTextInput
        value={startDate}
        onSelectDate={onStartDateChange}
        firstDayOfWeek={DayOfWeek.Sunday}
        isRequired={false}
        minDate={minDate}
        maxDate={maxDate}
        //styles={datePickerStyles}
        formatDate={onFormatDate}
      />

      <DatePicker
        componentRef={endDatePickerRef}
        className={styles.datePicker}
        label="End Date"
        placeholder="Select an end date"
        allowTextInput
        value={endDate}
        onSelectDate={onEndDateChange}
        firstDayOfWeek={DayOfWeek.Sunday}
        isRequired={false}
        minDate={minDate}
        maxDate={maxDate}
        //styles={datePickerStyles}
        formatDate={onFormatDate}
      />

    </div>
  );
};

export default DateRangePickerComponent;
