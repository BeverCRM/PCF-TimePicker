import * as React from 'react';
import { ComboBox, IComboBoxOption } from '@fluentui/react';
import { Icon } from '@fluentui/react/lib/Icon';
import { timesList } from '../TimeList';
import { comboBoxStyles, clockIconeStyles } from '../styles/TimePickerStyles';

export interface ITimeSelectorProps {
  onChange: (date: Date | null) => void;
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

// let text: string;

export const onValueChange = (item: IComboBoxOption | undefined,
  value: string | undefined, changedValue: Date | null,
  onChange: Function, setCurrentDate: Function, setText: Function) => {

  let newValue: Date | null = changedValue ? new Date(changedValue) : new Date();
  let time, format, hour, minute;

  if (value) {
    [time, format] = value.split(' ');
    [hour, minute] = time.split(':');

    if (format === 'PM') {
      if (Number(hour) === 12) newValue.setHours(12);
      else newValue.setHours(Number(hour) + 12);
    }
    else if (format === 'AM' && Number(hour) === 12) {
      newValue.setHours(0);
    }
    else {
      newValue.setHours(Number(hour));
    }
    newValue.setMinutes(Number(minute));
  }

  else if (item) {
    if (item.key === '---') { newValue = null; }
    else {
      [hour, minute] = item.key.toString().split(':');
      newValue.setHours(Number(hour));
      newValue.setMinutes(Number(minute));
    }
  }

  // text = formattedTime(newValue);
  setText(formattedTime(newValue));
  setCurrentDate(newValue);
  onChange(newValue);
};

export const TimeSelector: React.FunctionComponent<ITimeSelectorProps> = props => {

  const { onChange, currentDate } = props;
  const [ changedValue, setCurrentDate ] = React.useState(currentDate);
  const [ text, setText ] = React.useState(formattedTime(changedValue));

  // setCurrentDate(currentDate);

  return (
    <ComboBox
      text={text}
      options={timesList}
      styles= {comboBoxStyles}
      allowFreeform
      iconButtonProps={{ onRenderIcon: () => <Icon styles={clockIconeStyles} iconName="clock" /> }}
      onChange = { (event, item, index, value) => {
        onValueChange(item, value, changedValue, onChange, setCurrentDate, setText);
      }}
    />
  );
};
