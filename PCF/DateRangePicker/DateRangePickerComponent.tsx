import * as React from 'react';
import { DatePicker, mergeStyleSets, DayOfWeek, IDatePicker, IRefObject } from '@fluentui/react';

interface DateRangePickerProps {
  onStartDateChange?: (startDate: Date | undefined) => void;
  onEndDateChange?: (endDate: Date | undefined) => void;
  containerWidth?: number;
  containerHeight?: number;
  minDate?: Date;
  maxDate?: Date;
}

const DateRangePickerComponent: React.FunctionComponent<DateRangePickerProps> = ({
  onStartDateChange,
  onEndDateChange,
  containerWidth = 400,
  containerHeight = 150,
  minDate = new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate()),
  maxDate = new Date(),
}) => {
  const [startDate, setStartDate] = React.useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = React.useState<Date | undefined>(undefined);


  const handleStartDateChange = React.useCallback((date: Date | null | undefined) => {
    setStartDate(date || undefined);
    if (date && (!endDate || date > endDate)) {
      if (onEndDateChange) {
        setEndDate(date);
        onEndDateChange(date);
      }
    } else if (date && endDate && date < endDate) {
      setEndDate(date);
    } else if (date && !endDate) {
      setEndDate(date);
    }
    if (onStartDateChange) {
      onStartDateChange(date || undefined);
    }
  }, [endDate, onEndDateChange, onStartDateChange]);

  const handleEndDateChange = React.useCallback((date: Date | null | undefined) => {
    setEndDate(date || undefined);
    if (onEndDateChange) {
      onEndDateChange(date || undefined);
    }
  }, [onEndDateChange]);

  const styles = React.useMemo(() => mergeStyleSets({
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      height: '100%',
    },
    datePicker: { width: containerWidth, height: containerHeight },
  }), []);

  return (
    <div
      style={{
        display: 'flex',
        // justifyContent: 'space-between',
        gap: '16px',
      }}
    >
      <DatePicker
        style= {{width: containerWidth/2 - 8, height: containerHeight }}
        label="Start Date"
        placeholder="Select a start date"
        allowTextInput
        value={startDate}
        onSelectDate={handleStartDateChange}
        firstDayOfWeek={DayOfWeek.Sunday}
        minDate={minDate}
      />

      <DatePicker
        style= {{width: containerWidth/2 - 8, height: containerHeight }}
        label="End Date"
        placeholder="Select an end date"
        allowTextInput
        value={endDate}
        onSelectDate={handleEndDateChange}
        firstDayOfWeek={DayOfWeek.Sunday}
        minDate={startDate}
        maxDate={maxDate}
      />
    </div>
  );
};

export default DateRangePickerComponent;
