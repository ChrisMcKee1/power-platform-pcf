import { IInputs, IOutputs } from "./generated/ManifestTypes"; // Importing the input and output types from the generated ManifestTypes
import DateRangePickerComponent from "./DateRangePickerComponent"; // Importing the DateRangePicker component
import * as React from "react"; // Importing React
import { v4 as uuid } from 'uuid';

export class DateRangePicker implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    // Private variables
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>; // Reference to the ReactControl instance
    private notifyOutputChanged: () => void; // Callback to notify the framework about output changes
    private startDate: Date | null | undefined; // Start date value
    private endDate: Date | null | undefined; // End date value
    private uuid: string;
    private workaroundFlag: boolean

    constructor() {
        this.uuid = uuid()
        console.log(`#### Constructor(): ${this.uuid}`)
        this.workaroundFlag = false
    }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        console.log(`### init(defStart=${context.parameters.DefaultStartDate.raw}, defEnd=${context.parameters.DefaultEndDate.raw}): ${this.uuid}`)
        context.mode.trackContainerResize(true); // Track container resize 
        // this.notifyOutputChanged = notifyOutputChanged;       
        this.startDate = context.parameters.DefaultStartDate.raw || new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-1);
        this.endDate = context.parameters.DefaultEndDate.raw || new Date();
        this.notifyOutputChanged = notifyOutputChanged;
        this.notifyOutputChanged();
    }

    private handleStartDateChange = (date: Date | null | undefined): void => {
        console.log(`### handleStartDateChange(): ${this.uuid}`)
        this.startDate = date; // Update the start date property with the selected date
        if (date && (!this.endDate || date > this.endDate)) {
            this.endDate = this.startDate
        }
        this.workaroundFlag = true;
        this.notifyOutputChanged(); // Notify the framework about the output change
    };

    private handleEndDateChange = (date: Date | null | undefined): void => {
        console.log(`### handleEndDateChange(): ${this.uuid}`)
        this.endDate = date; // Update the end date property with the selected date
        if (date && (!this.startDate || date < this.startDate)) {
            this.startDate = this.endDate
        }
        this.workaroundFlag = true;
        this.notifyOutputChanged(); // Notify the framework about the output change
    };


    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        console.log(`### updateView(start=${this.startDate}, end=${this.endDate}, defStart=${context.parameters.DefaultStartDate.raw}, defEnd=${context.parameters.DefaultEndDate.raw}): ${this.uuid}`)
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
                maxDate: context.parameters.MaxDate.raw || undefined, // Pass the maximum date value
                startDate: this.workaroundFlag ? this.startDate || undefined : context.parameters.DefaultStartDate.raw || undefined, // Pass the start date value
                endDate: this.workaroundFlag ? this.endDate || undefined : context.parameters.DefaultEndDate.raw || undefined // Pass the end date value
            }
        );
    }

    public getOutputs(): IOutputs {
        console.log(`### getOutputs(): ${this.uuid}`)
        return {
            StartDate: this.startDate || undefined, // Return the current start date value as an output
            EndDate: this.endDate || undefined // Return the current end date value as an output
        };
    }

    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
