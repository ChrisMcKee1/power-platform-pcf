import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import { IDatasetToExcelProps, IMakerButtonProps, IMakerStyleProps } from "./ComponentRenderer";
import { ComponentRenderer } from "./ComponentRenderer";

export class ExportDatasetToExcel implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;

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
        this.notifyOutputChanged = notifyOutputChanged;
        context.mode.trackContainerResize(true);
        context.parameters.DatasetToExport.paging.setPageSize(99999);
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const {
            TextColor, BGColor, IconColor, HoverTextColor, HoverBGColor, BorderColor,
            BorderHoverColor, BorderWidth, BorderRadius, Text, IconName, FileName, Loading
        } = context.parameters;
    
        const stylesProps: IMakerStyleProps = {
            textColor: TextColor.raw || "black",
            bgColor: BGColor.raw || "rgba(0,0,0,0)",
            iconColor: IconColor.raw || "inherit",
            hoverTextColor: HoverTextColor.raw || TextColor.raw || "black",
            hoverBgColor: HoverBGColor.raw || "rgba(0,0,0,0)",
            borderColor: BorderColor.raw || "rgba(0,0,0,0)",
            borderHoverColor: BorderHoverColor.raw || "rgba(0,0,0,0)",
            borderWidth: BorderWidth.raw || 1,
            borderRadius: BorderRadius.raw || 0,
            buttonWidth: context.mode.allocatedWidth,
            buttonHeight: context.mode.allocatedHeight
        };
    
        const buttonUiProps: IMakerButtonProps = {
            buttonText: Text.raw || "",
            iconName: IconName.raw || "ExcelDocument"
        }
    
        const dataSet = context.parameters.DatasetToExport;
        const selectedColumns = context.parameters.SelectedColumns;
    
        const props: IDatasetToExcelProps = {
            makerStyleProps: stylesProps,
            buttonProps: buttonUiProps,
            dataSet: dataSet,
            selectedColumns: selectedColumns,
            fileName: FileName.raw || `generated_file_${Date.now()}`,
            itemsLoading: dataSet.loading,
            isLoading: Loading.raw // this can be set by the app maker
        };
    
        return React.createElement(
            ComponentRenderer, props
        );
    }
    

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
