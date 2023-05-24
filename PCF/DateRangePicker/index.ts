import { IInputs, IOutputs } from "./generated/ManifestTypes"; // Importing the input and output types from the generated ManifestTypes
import DateRangePickerComponent from "./DateRangePickerComponent"; // Importing the DateRangePicker component
import * as React from "react"; // Importing React

export class DateRangePicker implements ComponentFramework.ReactControl<IInputs, IOutputs> {
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
        context.mode.trackContainerResize(true); // Track container resize
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
        let width = context.mode.allocatedWidth;
        let height = context.mode.allocatedHeight;
    
        // If width or height is -1, set it to a default value
        if (width === -1) {
            width = 400; // or whatever default value you want to use
        }
        if (height === -1) {
            height = 150; // or whatever default value you want to use
        }
                
        return React.createElement(
            DateRangePickerComponent, // Render the DateRangePicker component
            {
                onStartDateChange: this.handleStartDateChange, // Pass the callback for start date change
                onEndDateChange: this.handleEndDateChange, // Pass the callback for end date change
                containerHeight: height, // Pass the container height
                containerWidth: width, // Pass the container width
                minDate: context.parameters.MinDate.raw || undefined, // Pass the minimum date value
                maxDate: context.parameters.MaxDate.raw || undefined // Pass the maximum date value
            }
        );
    }

    public getOutputs(): IOutputs {
        return {
            StartDate: this.startDate, // Return the current start date value as an output
            EndDate: this.endDate // Return the current end date value as an output
        };
    }

    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
