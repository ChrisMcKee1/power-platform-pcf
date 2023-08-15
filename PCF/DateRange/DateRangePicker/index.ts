import { IInputs, IOutputs } from "./generated/ManifestTypes";
import DateRangePickerComponent from "./DateRangePickerComponent";
import * as React from "react";

export class DateRangePicker implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    private startDate: Date | null | undefined;
    private endDate: Date | null | undefined;

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        context.mode.trackContainerResize(true);
        this.startDate = context.parameters.DefaultStartDate.raw || new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-1);
        this.endDate = context.parameters.DefaultEndDate.raw || new Date();
        this.notifyOutputChanged = notifyOutputChanged;
        this.notifyOutputChanged();
    }

    private handleStartDateChange = (date: Date | null | undefined): void => {
        this.startDate = date;
        if (date && (!this.endDate || date > this.endDate)) {
            this.endDate = this.startDate
        }
        this.notifyOutputChanged();
    };

    private handleEndDateChange = (date: Date | null | undefined): void => {
        this.endDate = date;
        if (date && (!this.startDate || date < this.startDate)) {
            this.startDate = this.endDate
        }
        this.notifyOutputChanged();
    };


    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        let width = context.mode.allocatedWidth;
        let height = context.mode.allocatedHeight;

        if (width === -1) {
            width = 400;
        }
        if (height === -1) {
            height = 150;
        }

        return React.createElement(
            DateRangePickerComponent,
            {
                onStartDateChange: this.handleStartDateChange,
                onEndDateChange: this.handleEndDateChange,
                containerHeight: height,
                containerWidth: width,
                minDate: context.parameters.MinDate.raw || undefined,
                maxDate: context.parameters.MaxDate.raw || undefined,
                startDate: this.startDate || undefined,
                endDate: this.endDate || undefined
            }
        );
    }

    public getOutputs(): IOutputs {
        return {
            StartDate: this.startDate || undefined,
            EndDate: this.endDate || undefined
        };
    }

    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}