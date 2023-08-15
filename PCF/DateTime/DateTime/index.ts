import { DateTimePicker } from "./DateTimePicker";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";

export class DateTime implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    private selectedDate?: Date;
    private selectedTime?: Date;
    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        // inintialize the selected date to the current date
        this.selectedDate = new Date();
        this.selectedTime = new Date();
        this.notifyOutputChanged = notifyOutputChanged;
        this.notifyOutputChanged();
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        // Create the React control
        const reactElement = React.createElement(
            DateTimePicker
            ,
            {
            onDateChange: (date: Date) => {
                this.selectedDate = date;
                this.notifyOutputChanged();
            },
            onTimeChange: (time: Date) => {
                // const [hours, minutes] = timeObj.key.split(":").map(Number);
                // console.log(hours);
                // console.log(minutes);
                console.log(time);
                this.selectedTime = time;
                this.notifyOutputChanged();
            }
        }
        );
        return reactElement;
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        // Combine the selected date and time into a single Date object
        var combinedDateTime = this.selectedDate ? new Date(this.selectedDate) : new Date();
        console.log("combinedDateTime: " + combinedDateTime);
        if (this.selectedTime) {
            combinedDateTime.setHours(this.selectedTime.getHours());
            combinedDateTime.setMinutes(this.selectedTime.getMinutes());
            console.log("Set time");
            console.log(combinedDateTime);
        }
        return { combinedDateTime }; // Return in the shape that matches your IOutputs interface
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
