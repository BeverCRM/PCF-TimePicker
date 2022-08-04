import { IInputs, IOutputs } from './generated/ManifestTypes';
import * as React from 'react';
import { TimeSelector } from './components/TimeSelector';

export class TimePicker implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container: HTMLDivElement;
    private notifyOutputChanged:()=> void;
    private currentDate: Date | null

    constructor() {
    }

    public correctTimeZoneForD365(d365DateValue: Date,
      context: ComponentFramework.Context<IInputs>) {

      const d365TimeZone = context.userSettings.getTimeZoneOffsetMinutes();
      d365DateValue.setMinutes(
        d365DateValue.getMinutes() + d365DateValue.getTimezoneOffset() + d365TimeZone);
    }

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void,
      state: ComponentFramework.Dictionary, container:HTMLDivElement): void {

      this.container = container;
      this.notifyOutputChanged = notifyOutputChanged;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
      const d365DateValue = context.parameters.dateProperty.raw;
      if (d365DateValue) this.correctTimeZoneForD365(d365DateValue, context);

      return React.createElement(
        TimeSelector, {
          currentDate: d365DateValue,

          onChange: date => {
            this.currentDate = date;
            this.notifyOutputChanged();
          },
        },
      );
    }

    public getOutputs(): IOutputs {
      return {
        dateProperty: this.currentDate ?? undefined,
      };
    }

    public destroy(): void {

    }
}
