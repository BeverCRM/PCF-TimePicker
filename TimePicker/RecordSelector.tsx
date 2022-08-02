import * as React from 'react';
import { ComboBox, IDropdownStyles } from '@fluentui/react';
import { Icon } from '@fluentui/react/lib/Icon';
import { timesList } from './TimeList';

export interface IRecordSelectorProps {
  onChange: (date: Date) => void;
  currentDate: Date | null;
}

type TAM_PM = 'PM' | 'AM';

function formatAMPM(date?: Date | null) {
  if (!date) return null;

  let hours: number = date.getHours();
  const minutes: number = date.getMinutes();

  const ampm: TAM_PM = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours ? hours : 12;
  const strMinutes: string =
  minutes < 10 ? `0${String(minutes)}` : String(minutes);

  return `${String(hours)}:${strMinutes} ${ampm}`;
}

function getTimeAmPm(date?: Date | null): string {
  if (!date) return '---';
  const timeAmPM: string | null = formatAMPM(date);

  return timeAmPM || '---';
}

const comboBoxStyles: Partial<IDropdownStyles> = {
  callout: { height: 160, overflowY: 'overlay', width: 200 },
  root: {
    '&.ms-ComboBox::after': { border: 'none' },
    ':hover': { border: '1px solid' },
  },
};

export const RecordSelector: React.FunctionComponent<IRecordSelectorProps> = props => {
  const { onChange, currentDate } = props;
  let text = getTimeAmPm(currentDate);
  const selectedKey = React.useRef<string | undefined>(text);
  selectedKey.current = text;

  return (
    <ComboBox
      text={selectedKey.current}
      options={timesList}
      styles= {comboBoxStyles}
      allowFreeform
      iconButtonProps={{ onRenderIcon: () => <Icon
        styles={{ root: { fontSize: 15 } }}
        iconName="clock" /> }}

      onChange={(event, item, index, value) => {
        const newDate = currentDate ?? new Date();
        let time, format, hour, minute;

        if (item) {
          [hour, minute] = item.key.toString().split(':');
          newDate.setHours(Number(hour));
          newDate.setMinutes(Number(minute));
        }

        if (value) {
          [time, format] = value.split(' ');
          [hour, minute] = time.split(':');

          if (format === 'PM') {
            if (Number(hour) === 12) newDate.setHours(12);
            else newDate.setHours(Number(hour) + 12);
          }
          else if (Number(hour) === 12) {
            newDate.setHours(0);
          }
          else {
            newDate.setHours(Number(hour));
          }
          newDate.setMinutes(Number(minute));
        }
        text = getTimeAmPm(newDate);
        selectedKey.current = text;
        onChange(newDate);
      }
      }
    />
  );
};
