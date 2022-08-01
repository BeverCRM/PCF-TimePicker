import * as React from 'react';
import { ComboBox, Label } from '@fluentui/react';
import { IComboBoxOption, IComboBoxStyles, VirtualizedComboBox } from '@fluentui/react';
import { Icon } from '@fluentui/react/lib/Icon';


export interface IHelloWorldProps {
  name?: any;
}

const days: IComboBoxOption[] = [
  { text: '8:00 AM', key: '8:00 AM' },
  { text: '8:30 AM', key: '8:30 AM' },
  { text: '9:00 AM', key: '9:00 AM' },
  { text: '9:30 AM', key: '9:30 AM' },
  { text: '10:00 AM', key: '10:00 AM' },
  { text: '10:30 AM', key: '10:30 AM' },
  { text: '11:00 AM', key: '11:00 AM' },
];

// const [firstDayOfWeek, setFirstDayOfWeek] = React.useState('8:00');

// const onDropdownChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
//   console.log(event);
// };

// const onDropdownChange = React.useCallback((event: React.FormEvent<HTMLDivElement>,
//   option?: IDropdownOption) => {
//   setFirstDayOfWeek(option?.key as string);
// }, []);

// const rootClass = mergeStyles({ maxWidth: 300, selectors: { '> *': { marginBottom: 150 } } });
// const inputContainer = mergeStyles({ maxWidth: 300, selectors: { '> *': { marginBottom: 150 } } });
// const dropDown = mergeStyles({ maxWidth: 30, selectors: { '> *': { marginLeft: 150 } } });

export class HelloWorld extends React.Component<IHelloWorldProps> {
  public render(): React.ReactNode {
    return (
      <div className ='rootClass'>
        <ComboBox className='childClass'
          // selectedKey = '8:00 AM'
          options={days}
          // onChange={onDropdownChange}
          allowFreeform
          iconButtonProps={{ onRenderIcon: () =>  <Icon iconName='clock'/>}}
        />
      </div>
    );
  }
}

// import * as React from 'react';
// import {
//   DatePicker,
//   IDatePickerStrings,
//   defaultDatePickerStrings,
//   addMonths,
//   addYears,
//   IDatePickerStyles,
// } from '@fluentui/react';
// import { useConst } from '@fluentui/react-hooks';

// const datePickerStyles: Partial<IDatePickerStyles> = { root: { maxWidth: 300, marginTop: 15 } };

// export const DatePickerBoundedExample: React.FunctionComponent = () => {
//   const today = useConst(new Date(Date.now()));
//   const minDate = useConst(addMonths(today, -1));
//   const maxDate = useConst(addYears(today, 1));

//   const strings: IDatePickerStrings = useConst(() => ({
//     ...defaultDatePickerStrings,

//     isOutOfBoundsErrorMessage:
//      `Date must be between ${minDate.toLocaleDateString()} and ${maxDate.toLocaleDateString()}`,
//   }));

//   return (
//     <div>
//       <div>
//         {minDate.toLocaleDateString()} to {maxDate.toLocaleDateString()}.
//       </div>
//       <DatePicker
//         styles={datePickerStyles}
//         // DatePicker uses English strings by default. For localized apps, you must override this prop.
//         strings={strings}
//         placeholder="Select a date..."
//         ariaLabel="Select a date"
//         minDate={minDate}
//         maxDate={maxDate}
//         allowTextInput
//       />
//     </div>
//   );
// };

// import * as React from 'react';
// import {
//   DatePicker,
//   DayOfWeek,
//   Dropdown,
//   IDropdownOption,
//   mergeStyles,
//   defaultDatePickerStrings,
// } from '@fluentui/react';

// const days: IDropdownOption[] = [
//   { text: 'Sunday', key: DayOfWeek.Sunday },
//   { text: 'Monday', key: DayOfWeek.Monday },
//   { text: 'Tuesday', key: DayOfWeek.Tuesday },
//   { text: 'Wednesday', key: DayOfWeek.Wednesday },
//   { text: 'Thursday', key: DayOfWeek.Thursday },
//   { text: 'Friday', key: DayOfWeek.Friday },
//   { text: 'Saturday', key: DayOfWeek.Saturday },
// ];
// const rootClass = mergeStyles({ maxWidth: 300, selectors: { '> *': { marginBottom: 15 } } });

// export const DatePickerWeekNumbersExample: React.FunctionComponent = () => {
//   const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Sunday);

//   const onDropdownChange = React.useCallback((event: React.FormEvent<HTMLDivElement>, option: IDropdownOption) => {
//     setFirstDayOfWeek(option.key as number);
//   }, []);

//   return (
//     <div className={rootClass}>
//       <DatePicker
//         firstDayOfWeek={firstDayOfWeek}
//         showWeekNumbers={true}
//         firstWeekOfYear={1}
//         showMonthPickerAsOverlay={true}
//         placeholder="Select a date..."
//         ariaLabel="Select a date"
//         // DatePicker uses English strings by default. For localized apps, you must override this prop.
//         strings={defaultDatePickerStrings}
//       />
//       <Dropdown
//         label="Select the first day of the week"
//         options={days}
//         selectedKey={firstDayOfWeek}
//         onChange={onDropdownChange}
//       />
//     </div>
//   );
// };
