import * as React from 'react';
import { ComboBox, IComboBoxOption } from '@fluentui/react';
import { Icon } from '@fluentui/react/lib/Icon';
import { timesList } from '../TimeList';
import { comboBoxStyles, clockIconeStyles } from '../styles/TimePickerStyles';

export interface ITimeSelectorProps {
  onChange: (date: Date) => void;
  currentDate: Date | null;
}

function formattedTime(date?: Date | null): string {
  if (!date) return '---';
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
}

export const onValueChange = (item: IComboBoxOption | undefined,
  value: string | undefined, currentDate: Date | null,
  onChange: Function) => {

  !currentDate ? currentDate = new Date() : currentDate;
  let time, format, hour, minute;

  if (value) {
    [time, format] = value.split(' ');
    [hour, minute] = time.split(':');

    if (format === 'PM') {
      if (Number(hour) === 12) currentDate.setHours(12);
      else currentDate.setHours(Number(hour) + 12);
    }
    else if (format === 'AM' && Number(hour) === 12) {
      currentDate.setHours(0);
    }
    else {
      currentDate.setHours(Number(hour));
    }
    currentDate.setMinutes(Number(minute));
  }

  else if (item) {
    if (item.key === '---') { currentDate = null; }
    else {
      [hour, minute] = item.key.toString().split(':');
      currentDate.setHours(Number(hour));
      currentDate.setMinutes(Number(minute));
    }
  }
  onChange(currentDate);
};

export const TimeSelector: React.FunctionComponent<ITimeSelectorProps> = props => {
  const { onChange, currentDate } = props;
  const text = formattedTime(currentDate);

  return (
    <ComboBox
      text={text}
      options={timesList}
      styles= {comboBoxStyles}
      allowFreeform
      iconButtonProps={{ onRenderIcon: () => <Icon styles={clockIconeStyles} iconName="clock" /> }}
      onChange = { (event, item, index, value) => {
        onValueChange(item, value, currentDate, onChange);
      }}
    />
  );
};
