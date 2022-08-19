import { IInputs, IOutputs } from './generated/ManifestTypes';
import * as React from 'react';
import { TimeSelector } from './components/TimeSelector';

export class TimePicker implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private context: ComponentFramework.Context<IInputs>;
    private notifyOutputChanged:() => void;
    private currentDateFormatted: Date | null;

    constructor() {
    }

    private correctTimeZoneForD365(
      date: Date | null): Date | null {
      if (date === null) return null;

      const TIMEZONE_INDEPENDENT_BEHAVIOR = 3;
      const fieldBehavior = this.context.parameters.dateProperty.attributes?.Behavior;
      const timezoneOffsetInMinutes = fieldBehavior === TIMEZONE_INDEPENDENT_BEHAVIOR
        ? 0
        : this.context.userSettings.getTimeZoneOffsetMinutes(date);

      const newDate = new Date(date).setMinutes(
        date.getMinutes() + date.getTimezoneOffset() + timezoneOffsetInMinutes);

      return new Date(newDate);
    }

    public init(context: ComponentFramework.Context<IInputs>,
      notifyOutputChanged: () => void): void {
      this.context = context;
      this.notifyOutputChanged = notifyOutputChanged;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
      this.currentDateFormatted = this.correctTimeZoneForD365(context.parameters.dateProperty.raw);

      return React.createElement(
        TimeSelector, {
          currentDate: this.currentDateFormatted,
          isControlDisabled: context.mode.isControlDisabled,
          onChange: date => {
            this.currentDateFormatted = date;
            this.notifyOutputChanged();
          },
        },
      );
    }

    public getOutputs(): IOutputs {
      return {
        dateProperty: this.currentDateFormatted ?? undefined,
      };
    }

    public destroy(): void {
    }
}
