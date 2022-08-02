import { IInputs, IOutputs } from './generated/ManifestTypes';
import { HelloWorld, IHelloWorldProps } from './HelloWorld';
import * as React from 'react';

export class TimePicker implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;

    constructor() { }
    
    public init(
      context: ComponentFramework.Context<IInputs>,
      notifyOutputChanged: () => void,
      // eslint-disable-next-line no-unused-vars
      state: ComponentFramework.Dictionary,
    ): void {
      this.notifyOutputChanged = notifyOutputChanged;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
      console.log(context);

      const props: IHelloWorldProps = { name: 'Hello, World!' };
      return React.createElement(
        HelloWorld, props,
      );
    }

    public getOutputs(): IOutputs {
      return { };
    }

    public destroy(): void {
      // Add code to cleanup control if necessary
    }
}

// import { IInputs, IOutputs } from './generated/ManifestTypes';
// // import { HelloWorld, IHelloWorldProps } from './HelloWorld';
// import { DatePickerBasicExample } from './HelloWorld';
// import * as React from 'react';
// import ReactDOM = require('react-dom');

// export class TimePicker implements ComponentFramework.ReactControl<IInputs, IOutputs> {
//   private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
//   private notifyOutputChanged: () => void;
//   private container: HTMLDivElement;
//   private entityName : string;

//   constructor() { }

//   public init(
//     context: ComponentFramework.Context<IInputs>,
//     notifyOutputChanged: () => void,
//     state: ComponentFramework.Dictionary,
//     container: HTMLDivElement,
//   ): void {
//     this.notifyOutputChanged = notifyOutputChanged;
//     this.container = container;
//     // this.entityName = context.parameters.sampleProperty.

//   }

//   public updateView(context: ComponentFramework.Context<IInputs>): void {

//     ReactDOM.render(React.createElement(DatePickerBasicExample), this.container);

//   }

//   public getOutputs(): IOutputs {
//     return {};
//   }

//   public destroy(): void {
//     // Add code to cleanup control if necessary
//   }
// }
