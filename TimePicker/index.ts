import { IInputs, IOutputs } from './generated/ManifestTypes';
import * as React from 'react';
import { RecordSelector } from './RecordSelector';
import { unmountComponentAtNode } from 'react-dom';

export class TimePicker implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container: HTMLDivElement;
    private notifyOutputChanged:()=> void;
    private currentDate: Date | null

    constructor() {
    }

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void,
      state: ComponentFramework.Dictionary, container:HTMLDivElement): void {

      this.container = container;
      this.notifyOutputChanged = notifyOutputChanged;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
      const d365DateValue = context.parameters.sampleProperty.raw;

      if (d365DateValue) {
        const d365TimeZone = context.userSettings.getTimeZoneOffsetMinutes();
        d365DateValue.setMinutes(
          d365DateValue.getMinutes() + d365DateValue.getTimezoneOffset() + d365TimeZone);
      }

      return React.createElement(
        RecordSelector, {
          currentDate: d365DateValue,

          onChange: date => {
            this.currentDate = date;
            context.parameters.sampleProperty.raw = date;
            this.notifyOutputChanged();
          },
        },
      );
    }

    public getOutputs(): IOutputs {
      return {
        sampleProperty: this.currentDate ?? undefined,
      };
    }

    public destroy(): void {
      unmountComponentAtNode(this.container);
    }
}
