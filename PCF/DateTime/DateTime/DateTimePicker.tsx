import * as React from 'react';
import { TimePicker, DatePicker, Label, Text, IStackTokens, Stack, IStackStyles, IComboBox } from '@fluentui/react';

const stackStyles: Partial<IStackStyles> = { root: { width: 500 } };
const stackTokens: IStackTokens = { childrenGap: 20 };

const snapTimeToUpdatedDateAnchor = (datePickerDate: Date, currentTime: Date) => {
  let snappedTime = new Date(currentTime);

  if (currentTime && !isNaN(currentTime.valueOf())) {
    const startAnchor = new Date(datePickerDate);
    const endAnchor = new Date(startAnchor);
    endAnchor.setDate(startAnchor.getDate() + 1);
    if (currentTime < startAnchor || currentTime > endAnchor) {
      snappedTime = new Date(startAnchor);
      snappedTime.setHours(currentTime.getHours());
      snappedTime.setMinutes(currentTime.getMinutes());
      snappedTime.setSeconds(currentTime.getSeconds());
      snappedTime.setMilliseconds(currentTime.getMilliseconds());
    }
  }

  return snappedTime;
};

interface DateTimePickerProps {
  onDateChange?: (date: Date) => void;
  onTimeChange?: (time: Date) => void;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({ onDateChange, onTimeChange }) => {
  const currentDate = new Date();
  const [datePickerDate, setDatePickerDate] = React.useState<Date>(currentDate);
  const [currentTime, setCurrentTime] = React.useState<Date>(new Date());

  const onSelectDate = React.useCallback(
    (selectedDate: Date | null | undefined) => {
      if (!selectedDate) {
        return;
      }
      if (currentTime) {
        const snappedTime = snapTimeToUpdatedDateAnchor(selectedDate, currentTime);
        setCurrentTime(snappedTime);
        setDatePickerDate(selectedDate);
      }
      // Notify the parent about the date change
      if (onDateChange) {
        onDateChange(selectedDate);
      }
    },
    [currentTime, onDateChange],
  );


  const onTimePickerChange = React.useCallback((_ev: React.FormEvent<IComboBox>, date: Date) => {
    const x = ((date as unknown) as { key: string; text: string });
    var date1 = new Date(datePickerDate.getDate() + ' ' + x.text);
    setCurrentTime(date1);
    if (onTimeChange) {
      onTimeChange(date1);
    }
    console.log(x.text);
  }, [onTimeChange, datePickerDate]);

  return (
    <Stack tokens={stackTokens} styles={stackStyles}>
      <Label>{'DatePicker and TimePicker combination'}</Label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '3px' }}>
        <DatePicker placeholder="Select a date..." value={datePickerDate} onSelectDate={onSelectDate} />
        <TimePicker
          placeholder="Select a time"
          dateAnchor={datePickerDate}
          value={currentTime}
          onChange={onTimePickerChange}
        //{onTimePickerChange}
        />
      </div>
    </Stack>
  );
};
