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

export const TimeSelector: React.FunctionComponent<ITimeSelectorProps> = props => {
  const { currentDate, onChange } = props;

  return (
    <ComboBox
      text={formattedTime(currentDate)}
      options={timesList}
      styles= {comboBoxStyles}
      allowFreeform
      iconButtonProps={{ onRenderIcon: () => <Icon styles={clockIconeStyles} iconName="clock" /> }}
      onChange={(event, item, index, value) => {
        let newValue: Date | null = currentDate ? new Date(currentDate) : new Date();
      
        if (item) newValue = new Date(`${newValue.toDateString()} ${item.text}`);
        else if (value) newValue = new Date(`${newValue.toDateString()} ${value}`);
        else newValue = null;

        if (newValue?.toString() === 'Invalid Date') newValue = currentDate;
        onChange(newValue);
      }}
    />
  );
};
