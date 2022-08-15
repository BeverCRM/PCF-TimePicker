import { IInputs, IOutputs } from './generated/ManifestTypes';
import * as React from 'react';
import { TimeSelector } from './components/TimeSelector';

export class TimePicker implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private context: ComponentFramework.Context<IInputs>;
    private notifyOutputChanged:() => void;
    private d365Date: Date | null;

    constructor() {
    }

    public changeFormatOfDate(currentDate: string): string {
      const [date, hour, format] = currentDate.split(' ');
      const [year, month, day ] = date.split(/[-/.]+/);

      return `${month}/${day}/${year} ${hour} ${format}`;
    }

    public init(context: ComponentFramework.Context<IInputs>,
      notifyOutputChanged: () => void): void {
      this.context = context;
      this.notifyOutputChanged = notifyOutputChanged;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
      let currentDate: string | undefined = context.parameters.dateProperty.formatted;

      if (currentDate !== undefined && new Date(currentDate).toString() === 'Invalid Date') {
        currentDate = this.changeFormatOfDate(currentDate);
      }

      currentDate ? this.d365Date = new Date(currentDate) : this.d365Date = null;

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
