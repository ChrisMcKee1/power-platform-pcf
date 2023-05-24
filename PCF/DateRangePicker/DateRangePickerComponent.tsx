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

  const endDatePickerRef: IRefObject<IDatePicker> = React.useRef(null);

  const handleStartDateChange = React.useCallback((date: Date | null | undefined) => {
    setStartDate(date || undefined);
    if (date && (!endDate || date > endDate)) {
      setEndDate(date || undefined);
    }
    if (onStartDateChange) {
      onStartDateChange(date || undefined);
    }
  }, [endDate, onStartDateChange]);

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
        style= {{width: containerWidth, height: containerHeight }}
        label="Start Date"
        placeholder="Select a start date"
        allowTextInput
        value={startDate}
        onSelectDate={handleStartDateChange}
        firstDayOfWeek={DayOfWeek.Sunday}
        isRequired={true}
        minDate={minDate}
      />

      <DatePicker
        componentRef={endDatePickerRef}
        style= {{width: containerWidth, height: containerHeight }}
        label="End Date"
        placeholder="Select an end date"
        allowTextInput
        value={endDate}
        onSelectDate={handleEndDateChange}
        firstDayOfWeek={DayOfWeek.Sunday}
        isRequired={true}
        minDate={startDate}
        maxDate={maxDate}
      />
    </div>
  );
};

export default DateRangePickerComponent;
