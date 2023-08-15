// Import the necessary components from Fluent UI React
import * as React from 'react';
import { DatePicker, mergeStyleSets, DayOfWeek, IDatePicker } from '@fluentui/react';

// Define the props for the DateRangePickerComponent
interface DateRangePickerProps {
  onStartDateChange?: (startDate: Date | null | undefined) => void; // Callback for when the start date is changed
  onEndDateChange?: (endDate: Date | null | undefined) => void; // Callback for when the end date is changed
  containerWidth?: number; // Width of the container element
  containerHeight?: number; // Height of the container element
  minDate?: Date; // Minimum selectable date
  maxDate?: Date; // Maximum selectable date
  startDate?: Date; // Selected start date
  endDate?: Date; // Selected end date
}

// Define the DateRangePickerComponent as a function component
const DateRangePickerComponent: React.FunctionComponent<DateRangePickerProps> = ({
  onStartDateChange,
  onEndDateChange,
  containerWidth = 400,
  containerHeight = 150,
  minDate = new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate()), // Default to one year ago
  maxDate = new Date(), // Default to today
  startDate,
  endDate
}) => {

  // Create refs for the start and end date pickers
  const startDatePickerRef = React.useRef<IDatePicker>(null);
  const endDatePickerRef = React.useRef<IDatePicker>(null);

  // Define a function to format the selected dates
  const onFormatDate = (date?: Date): string => {
    return !date ? '' : (date.getMonth() + 1) + '/' + date.getDate() + '/' + (date.getFullYear());
  };

  // Define some CSS styles for the DatePickers
  const styles = React.useMemo(() => mergeStyleSets({
    wrapper: {
      display: 'flex',
      width: '100%',
      height: '100%'
    },
    datePicker: { width: containerWidth / 2 - 1, height: 55, minWidth: 100, marginTop: 15, textAlign: 'left' },
  }), []);

  // Render the DatePickers
  return (
    <div
      className={styles.wrapper}
    >
      <DatePicker
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
        formatDate={onFormatDate}
      />

    </div>
  );
};

export default DateRangePickerComponent;