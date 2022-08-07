import { IInputs, IOutputs } from './generated/ManifestTypes';
import * as React from 'react';
import { TimeSelector } from './components/TimeSelector';

export class TimePicker implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private context: ComponentFramework.Context<IInputs>;
    private notifyOutputChanged:()=> void;
    private d365Date: Date | null;

    constructor() {
      
    }

    public correctTimeZoneForD365(date: Date | null): Date | null {
      if (date === null || date.toString() === 'Invalid Date') return null;

      const d365TimeZone = this.context.userSettings.getTimeZoneOffsetMinutes();
      return new Date(date.setMinutes(
        date.getMinutes() + date.getTimezoneOffset() + d365TimeZone)
      );
    }

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void,
      state: ComponentFramework.Dictionary, container:HTMLDivElement): void {
      this.context = context;
      this.notifyOutputChanged = notifyOutputChanged;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
      this.d365Date = this.correctTimeZoneForD365(context.parameters.dateProperty.raw);

      return React.createElement(
        TimeSelector, {
          currentDate: this.d365Date,

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
