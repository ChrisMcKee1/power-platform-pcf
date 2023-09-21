# Export Dataset to Excel PCF component ("DatasetToExcel")

## Overview

**_DatasetToExcel_** is a FluentUI based Power Apps Component Framework (PCF) control which can be utilized in a Microsoft Power Apps application to allow the dynamic exporting of any number of columns from an existing dataset to a Microsoft Excel .xlsx file. It is easy to use and also includes a button that is configurable based on your desired theme and style.

## Features

- Column names based on selected fields in the native Fields property
- Column ordering based on selected fields in the native Fields property
- Loading spinner indicator
- Customizable export activation button
- Customizable columns from the selected dataset, filtered down to only the selected columns the application user chooses to export.
  <br><br>

# How to import the DatasetToExcel component into your tenant

## Pre-requisites

1. Before attempting to import this component into an environment, you will need to ensure the [Power Apps Code Component Framework](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/component-framework-for-canvas-apps) is enabled in the specific Power Platform environment that you will import the DatasetToExcel control into.
2. Download the latest released version of the [DatasetToExcel Solution from Github](https://github.com/ChrisMcKee1/power-platform-pcf/raw/main/PCF/DatasetToExcel/ExcelExporter.zip) and save it locally.

## Installation

1. Navigate to [https://make.powerapps.com](https://make.powerapps.com) and log in with your Microsoft work or school account.
2. Select the appropriate Environment that you wish to utilize this component in.
3. Select **_Solutions_** from the left navigation pane.
4. Select **_Import solution_**.
5. Select the compressed _ExcelExporter.Zip_ file downloaded as part of the pre-requisites steps above.

## Usage

After the _DatasetToExcel_ solution has been successfully imported into the desired environment, you can import the component into a new or existing Power App created in the same environment by performing the following steps:

1. Open an existing, or create a new Power App in the same environment that the _DatasetToExcel_ solution was imported into.
2. Select the **_Insert_** menu from the left Power Apps bar.
3. In the bottom of the side bar, select **_Get more components_**.
   <br><br>
   > <u>Note</u>
   >
   > The **_Get more components_** will not be visible if you used the **_Insert_** menu from the top Power Apps menu bar. Instead, use the **+ Insert** below the _Tree View_ in the left pane.
   > <br><br>
4. A dialog will appear in a pane on the right with two tabs, **_canvas_** and **_code_**. Select the **_code_** tab.
5. Select the **_DatasetToExcel_** component to import it into your Power App.
6. Insert the name of your Power Apps collection containing the dataset to export into the control's _Items_ property.
7. Create another collection (_colSelectedColumns_ for example) that contains the column names and column display names for the dataset you wish to export.
   <br><br>
   > **Example:**
   >
   > Assume you have the following dataset:
   > | columnA | columnB |
   > |-------------|------------|
   > | datainrow1A | datainrow1B|
   > | datainrow2A | datainrow2B|
   >
   > Assume you want the display name of the data in columnA to be "Column A" and the display name of the data in columnB to be "Column B" in the export.
   >
   > The collection to create to map each column name to the appropriate column display name would be created for this example as follows:
   >
   > **ClearCollect(colSelectedColumns,[{ColName: "columnA", ColDisplayName: "Column A"},{ColName: "columnB", ColDisplayName: "Column B"}])** > <br><br>
8. Set the _SelectedColumns_Items_ property to the collection that was created in step 7.
9. In the Power Apps control properties pane, select **_Fields_**, and then select all columns in your dataset that you would like to make available for the purpose of exporting.
10. Click on the **_DatasetToExcel_** control to activate it while your Power App is in Preview or Play mode to activate the control's data export action.

After clicking on the control to activate it, you will be prompted to save the exported Excel .xlsx spreadsheet containing the data exported from your collection defined in the **_Items_** property, and the output will include only the columns identified in the **SelectedColumns_Item** property.

## Component Customization

You can update any of the control's properties, listed in the **_Customizable Control Properties_** table below, to meet your requirements.  
The minimum requirement is to update the _Items_, _SelectedColumns_Items_, _ColName_, and _ColDisplayName_ properties. The remaining properties may optionally be modified as needed based on the desired behavior and appearance of the control.

### Customizable Control Properties

| Property              | Description                                                           | Default |      Example       |
| --------------------- | --------------------------------------------------------------------- | :-----: | :----------------: |
| BGColor               | Background color of the export icon                                   | "white" |       "red"        |
| BorderColor           | Border color of the export icon                                       | "black" |      "green"       |
| BorderHoverColor      | Border hover color of the export icon                                 | "black" |      "orange"      |
| BorderRadius          | Border radius of the export icon                                      |    0    |                    |
| BorderWidth           | Border width of the export icon                                       |    0    |                    |
| ColDisplayName        | Column display names to display in the exported file                  |   ""    |  "ColDisplayName"  |
| ColName               | Columns from the dataset to display in the exported file              |   ""    |     "ColName"      |
| ContentLanguage       | ISO 3166 lanuage code of the content being exported                   |   ""    |      "en-us"       |
| FileName              | Filename of the .xlsx to export                                       |   ""    |   "Export.xlsx"    |
| HoverBGColor          | Hover Background Color of the export icon                             |         |                    |
| HoverTextColor        | Hover Text Color                                                      |         |                    |
| IconColor             | Icon Color                                                            |         |                    |
| IconName              | Icon Name                                                             |         |                    |
| InputEvent            |                                                                       |         |                    |
| Items                 | Collection to use for the export (Table/Collection)                   |         |      colData       |
| Loading               | Animated loading spinner                                              |  false  |        true        |
| OnChange              | Actions to perform upon the OnChange event of the control             |   N/A   |                    |
| OnSelect              | Actions to perform upon the OnSelect event of the control             |   N/A   |                    |
| SelectedColumns_Items | A collection of columns to include in the output to the exported file |   N/A   | colSelectedColumns |

<br><br>

> <u>Note:</u>
>
> Additional standard out-of-box customization options such as Height, Width, Visible, DisplayMode, X, and Y are also supported.
> <br><br>
> A huge thanks goes out to [Hussam Odat](https://www.linkedin.com/in/hussam-odat-5075aa73) who created the initial code that this custom control was created from. Hussam's component helped to solve a primary business requirement. An additional requirement needed was support for the dynamic selection of columns from the dataset to output based on the original dataset to export to the Excel spreadsheet. This is where the need for the creation of the DatasetToExcel component was born.
