import { IInputs, IOutputs } from './generated/ManifestTypes';
import * as React from 'react';
import { TimeSelector } from './components/TimeSelector';

export class TimePicker implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private context: ComponentFramework.Context<IInputs>;
    private notifyOutputChanged:() => void;
    private d365Date: Date | null;

    constructor() {
    }

    private correctTimeZoneForD365(context: ComponentFramework.Context<IInputs>,
      date: Date | null): Date | null {
      if (date === null || date.toString() === 'Invalid Date') return null;

      let d365TimeZone = this.context.userSettings.getTimeZoneOffsetMinutes(date);
      context.parameters.dateProperty.attributes?.Behavior === 3 ? d365TimeZone = 0 : d365TimeZone;

      const newDate = new Date(date).setMinutes(
        date.getMinutes() + date.getTimezoneOffset() + d365TimeZone);

      return new Date(newDate);
    }

    public init(context: ComponentFramework.Context<IInputs>,
      notifyOutputChanged: () => void): void {
      this.context = context;
      this.notifyOutputChanged = notifyOutputChanged;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
      this.d365Date = this.correctTimeZoneForD365(context, context.parameters.dateProperty.raw);

      return React.createElement(
        TimeSelector, {
          currentDate: this.d365Date,
          isControlDisabled: context.mode.isControlDisabled,
          onChange: date => {
            this.d365Date = date;
            this.notifyOutputChanged();
          },
        },
      );
    }

    public getOutputs(): IOutputs {
      return {
        dateProperty: this.d365Date ?? undefined,
      };
    }

    public destroy(): void {
    }
}
