import { IInputs, IOutputs } from './generated/ManifestTypes';
import * as React from 'react';
import { TimeSelector } from './components/TimeSelector';

export class TimePicker implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private context: ComponentFramework.Context<IInputs>;
    private notifyOutputChanged:() => void;
    private d365Date: Date | null;

    constructor() {
    }

    public init(context: ComponentFramework.Context<IInputs>,
      notifyOutputChanged: () => void): void {
      this.context = context;
      this.notifyOutputChanged = notifyOutputChanged;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {

      const currentDate: string | undefined = context.parameters.dateProperty.formatted;
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
