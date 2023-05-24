import * as React from 'react';
import { DatePicker, mergeStyleSets, DayOfWeek, IDatePicker, IRefObject } from '@fluentui/react';

// Props interface for the DateRangePicker component
interface DateRangePickerProps {
  onStartDateChange?: (startDate: Date | undefined) => void; // Optional callback for start date change
  onEndDateChange?: (endDate: Date | undefined) => void; // Optional callback for end date change
}

// CSS styles for the component
const styles = mergeStyleSets({
  wrapper: { display: 'flex', justifyContent: 'space-between', width: '500px' }, // Styling for the container div
  datePicker: { width: '230px' }, // Styling for the date picker components
});

// DateRangePicker component
const DateRangePicker: React.FunctionComponent<DateRangePickerProps> = ({
  onStartDateChange,
  onEndDateChange
}) => {
  // State hooks for start date and end date
  const [startDate, setStartDate] = React.useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = React.useState<Date | undefined>(undefined);

  // Ref object for the end date picker component
  const endDatePickerRef: IRefObject<IDatePicker> = React.useRef(null);

  // Event handler for start date change
  const handleStartDateChange = React.useCallback((date: Date | null | undefined) => {
    setStartDate(date || undefined); // Update the start date in the component state

    // Check if end date needs to be updated
    if (date && (!endDate || date > endDate)) {
      setEndDate(date || undefined); // Update the end date to the start date only if it's null or the new start date is greater
    }

    // Invoke the onStartDateChange callback if provided
    if (onStartDateChange) {
      onStartDateChange(date || undefined);
    }
  }, [endDate, onStartDateChange]);

  // Event handler for end date change
  const handleEndDateChange = React.useCallback((date: Date | null | undefined) => {
    setEndDate(date || undefined); // Update the end date in the component state

    // Invoke the onEndDateChange callback if provided
    if (onEndDateChange) {
      onEndDateChange(date || undefined);
    }
  }, [onEndDateChange]);

  return (
    <div className={styles.wrapper}>
      {/* Start Date Picker */}
      <DatePicker
        className={styles.datePicker}
        label="Start Date"
        placeholder="Select a start date"
        allowTextInput
        isRequired
        value={startDate}
        onSelectDate={handleStartDateChange}
        firstDayOfWeek={DayOfWeek.Sunday}
      />

      {/* End Date Picker */}
      <DatePicker
        componentRef={endDatePickerRef}
        className={styles.datePicker}
        label="End Date"
        placeholder="Select an end date"
        allowTextInput
        isRequired
        value={endDate}
        onSelectDate={handleEndDateChange}
        firstDayOfWeek={DayOfWeek.Sunday}
        minDate={startDate} // end date starts from the start date
      />
    </div>
  );
};

export default DateRangePicker;
