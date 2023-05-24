import { IInputs, IOutputs } from "./generated/ManifestTypes"; // Importing the input and output types from the generated ManifestTypes
import DateRangePicker from "./DateRangePicker"; // Importing the DateRangePicker component
import * as React from "react"; // Importing React

export class PCFDateRangePicker implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    // Private variables
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>; // Reference to the ReactControl instance
    private notifyOutputChanged: () => void; // Callback to notify the framework about output changes
    private startDate: Date | undefined; // Start date value
    private endDate: Date | undefined; // End date value

    constructor() { }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
    }

    private handleStartDateChange = (date: Date | undefined): void => {
        this.startDate = date; // Update the start date property with the selected date
        this.notifyOutputChanged(); // Notify the framework about the output change
    };

    private handleEndDateChange = (date: Date | undefined): void => {
        this.endDate = date; // Update the end date property with the selected date
        this.notifyOutputChanged(); // Notify the framework about the output change
    };

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        return React.createElement(
            DateRangePicker, // Render the DateRangePicker component
            {
                onStartDateChange: this.handleStartDateChange, // Pass the callback for start date change
                onEndDateChange: this.handleEndDateChange // Pass the callback for end date change
            }
        );
    }

    public getOutputs(): IOutputs {
        return {
            startDate: this.startDate, // Return the current start date value as an output
            endDate: this.endDate // Return the current end date value as an output
        };
    }

    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
