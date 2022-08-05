import { IInputs, IOutputs } from './generated/ManifestTypes';
import * as React from 'react';
import { TimeSelector } from './components/TimeSelector';

export class TimePicker implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private context: ComponentFramework.Context<IInputs>;
    private container: HTMLDivElement;
    private notifyOutputChanged:()=> void;
    private changedDate: Date | null;

    constructor() {
    }

    public correctTimeZoneForD365(d365DateValue: Date) {

      const d365TimeZone = this.context.userSettings.getTimeZoneOffsetMinutes();
      d365DateValue.setMinutes(
        d365DateValue.getMinutes() + d365DateValue.getTimezoneOffset() + d365TimeZone);
    }

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void,
      state: ComponentFramework.Dictionary, container:HTMLDivElement): void {
      this.context = context;
      this.container = container;
      this.changedDate = context.parameters.dateProperty.raw;
      this.notifyOutputChanged = notifyOutputChanged;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
      this.changedDate = context.parameters.dateProperty.raw;
      if (this.changedDate) this.correctTimeZoneForD365(this.changedDate);

      return React.createElement(
        TimeSelector, {
          currentDate: this.changedDate,

          onChange: date => {
            this.changedDate = date;
            this.notifyOutputChanged();
          },
        },
      );
    }

    public getOutputs(): IOutputs {
      return {
        dateProperty: this.changedDate ?? undefined,
      };
    }

    public destroy(): void {

    }
}
