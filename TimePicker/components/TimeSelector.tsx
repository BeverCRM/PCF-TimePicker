import * as React from 'react';
import { ComboBox } from '@fluentui/react';
import { Icon } from '@fluentui/react/lib/Icon';
import { timesList } from '../TimeList';
import { comboBoxStyles, clockIconeStyles } from '../styles/comboBoxStyles';

export interface ITimeSelectorProps {
  onChange: (date: Date | null) => void;
  currentDate: Date | null;
  isControlDisabled: boolean;
}

function formattedTime(date?: Date | null): string {
  if (!date) return '---';
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
}

const TimeSelectorInternal: React.FunctionComponent<ITimeSelectorProps> = props => {
  const { currentDate, isControlDisabled, onChange } = props;

  return (
    <ComboBox
      disabled = { isControlDisabled }
      text={formattedTime(currentDate)}
      options={timesList}
      styles={comboBoxStyles}
      allowFreeform

      iconButtonProps={{
        onRenderIcon: () => <Icon styles={clockIconeStyles} iconName="clock"/> }}
      onChange={(event, item, index, value) => {

        let newValue: Date | null = currentDate ?? new Date();

        if (item) newValue = new Date(`${newValue.toDateString()} ${item.text}`);
        else if (value) newValue = new Date(`${newValue.toDateString()} ${value}`);
        else newValue = null;

        if (newValue?.toString() === 'Invalid Date') newValue = currentDate;

        onChange(newValue);
      }}
    />
  );
};

export const TimeSelector = React.memo(TimeSelectorInternal, (prev, next) =>
  formattedTime(prev.currentDate) === formattedTime(next.currentDate) &&
  prev.isControlDisabled === next.isControlDisabled,
);
