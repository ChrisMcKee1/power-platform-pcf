# Export Dataset to Excel PCF component ("DatasetToExcel")

---

## Overview

**_DatasetToExcel_** is a FluentUI based Power Apps Component Framework (PCF) control which can be utilized in a Microsoft Power Apps application to allow the exporting of a configurable number of columns from an existing dataset to a Microsoft Excel .xlsx file. It is easy to use and also includes a customizable button based on your desired theme and style.

## Features

- Column names based on selected fields in fields property
- Column ordering based on selected fields in fields property
- Loading spinner indicator
- Customizable export activation button
- Customizable columns from the selected dataset, filtered down to only the selected columns the application user chooses to export.

# How to import the DatasetToExcel component into your tenant

## Pre-requisites

1. Before attempting to import this component into an environment, you will need to ensure the [Power Apps Code Component Framework](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/component-framework-for-canvas-apps) is enabled in the specific Power Platform environment that you will import the DatasetToExcel control into.
2. Download the latest released version of the [DatasetToExcel Solution from Github](https://github.com/ChrisMcKee1/power-platform-pcf/raw/main/PCF/DatasetToExcel/ExcelExporter.zip) and save it locally.

## Installation

1. Navigate to [https://make.powerapps.com](https://make.powerapps.com) and log in with your Microsoft work or school account.
2. Select the appropriate Environment that you wish to utilize this component in.
3. Select **_Solutions_**.
4. Select **_Import solution_**.
5. Select the compressed _ExcelExporter.Zip_ file which was downloaded during the pre-requisite steps.

## Usage

> Once the _DatasetToExcel_ solution has been successfully imported into the desired environment, you can import the component into a new or existing Power App by performing the following steps -

1. Create a new, or open an existing Power App which you would like to utilize the DatasetToExcel component in.
2. Select the **_Insert_** menu from the left or top bar.
3. In the bottom of the side bar, select **_Get more components_**.
   > <u>Note</u>
   >
   > If the **_Get more components_** option is not visible, select **_Components_** while in _Tree View_, select the ellipsis (...), and finally select **_Import components_**.
4. A dialog will appear on the right of the screen with two tabs, **_canvas_** and **_code_**. Select the **_code_** tab.
5. Select the _DatasetToExcel_ component to import it into your Power App.

6. Insert your Power Apps collection containing the data to export into _Items_ property.
7. ?? Create another collection that contains at least one Column (ie: "ColName") with the rows being the column names of the DataSet you wish to export.
8. ?? _Needs Update/Tested: Map ColName to the Column Property._
9. In the Power Apps control properties pane, select **_Fields_**, and then select each column from your dataset that you would like to make available in your Power App for the purpose of exporting.
10. Click on the DatasetToExcel control to while your Power App is in Preview or Play mode to activate the data export action.

After clicking to activate the control, you will be prompted to save the exported Excel .xlsx spreadsheet containing the data exported from the defined collection, including only the columns identified in the **SelectedColumns_Item** property of the control.

## Component Customization

Update any of the _DatasetToExcel_ control properties, as shown in the **_Customizable Control Properties_** table below to meet your desired customization and configuration needs.

You can change the appearance and functionality of the control by modifying any of the control's supported properties.

### Customizable Control Properties

| Property              | Description                                                                         | Default |    Example    |
| --------------------- | ----------------------------------------------------------------------------------- | :-----: | :-----------: |
| BGColor               | Background color of the export icon                                                 | "white" |     "red"     |
| BorderColor           | Border color of the export icon                                                     | "black" |    "green"    |
| BorderHoverColor      | Border hover color of the export icon                                               | "black" |   "orange"    |
| BorderRadius          | Border radius of the export icon                                                    |    0    |               |
| BorderWidth           | Border width of the export icon                                                     |    0    |               |
| Column                | Column names to display in the exported file                                        |   ""    |    "Value"    |
| ContentLanguage       | ISO 3166 lanuage code of the content being exported                                 |   ""    |    "en-us"    |
| FileName              | Filename of the .xlsx to export                                                     |   ""    | "Export.xlsx" |
| HoverBGColor          | Hover Background Color of the export icon                                           |         |               |
| HoverTextColor        | Hover Text Color                                                                    |         |               |
| IconColor             | Icon Color                                                                          |         |               |
| IconName              | Icon Name                                                                           |         |               |
| InputEvent            |                                                                                     |         |               |
| Items                 | Collection to use for the export (Table/Collection)                                 |         |    colData    |
| Loading               | Animated loading spinner                                                            |  false  |     true      |
| OnChange              | Actions to perform upon the OnChange event of the control                           |   N/A   |               |
| OnSelect              | Actions to perform upon the OnSelect event of the control                           |   N/A   |               |
| SelectedColumns_Items | The user selected columns to include in the exported spreadsheet (Table/Collection) |   N/A   |               |

> <u>Note:</u>
>
> Additional common out-of-box customization options such as Height, Width, Visible, DisplayMode, X, and Y are also supported.

Thanks to [Hussam Odat](https://www.linkedin.com/in/hussam-odat-5075aa73) who created the initial code that this custom control was created from. Hussam's component helped to solve a primary business requirement that was needed. However, it did not include a required feature to allow the dynamic selection of individual columns based on the original dataset to export to the Excel _.xlsx_ spreadsheet. This is where the need for the creation of the _DatasetToExcel_ component was born.
