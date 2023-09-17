# Export Dataset to Excel PCF component

---

### _Power Apps PCF component to export a dataset to a Microsoft Excel XLSX file_

DatasetToExcel is a code component that can be used in Power Apps to export any dataset from a Power App to a Microsoft Excel .xlsx file.

## Features

- Column names based on selected fields in fields property
- Column ordering based on selected fields in fields property
- Loading spinner indicator
- Customizable export activation button
- Customizable columns from the selected DataSet, filtered down to only the selected columns the user chooses to export.

The **_Dataset to Excel_** custom control is a PCF code component to export any dataset within Microsoft Power Apps to an Excel file. It is as simple as working with Power Apps out-of-box gallery control.
It includes a customizable button to match your Power Apps theme and style.

## How to import this component into your tenant

### Pre-requisites

1. Before attempting to import this component, you will need to ensure the [Power Apps Code Component Framework](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/component-framework-for-canvas-apps) is enabled in the specific Power Platform environment that you will import the DatasetToExcel control into.
2. Download the latest released version of the [DatasetToExcel Solution from Github.](https://github.com/ChrisMcKee1/power-platform-pcf/raw/main/PCF/DatasetToExcel/ExcelExporter.zip) locally.

### Installation

1. Download the latest release version of the DatasetToExcel solution.
2. Navigate to [https://make.powerapps.com](https://make.powerapps.com) and log in with your Microsoft work or school account.
3. Select the appropriate Environment that you wish to utilize this component in.
4. Select **_Solutions_**
5. Select **_Import solution_**
6. Select the compressed .ZIP file downloadable from the .

- Once the _DatasetToExcel_ solution has been imported successfully:

1.  Create a new, or open an existing Power App which you would like to utilize the DatasetToExcel component in.
2.  Select the **_Insert_** menu from the left or top bar.
3.  In the bottom of the side bar, select **_Get more components_**. If this option is not visible, select **_Components_** while in _Tree View_, select the ellipsis (...), and finally select **_Import components_**.
4.  A dialog will appear on the right of the screen with two tabs, **_canvas_** and **_code_**. Select the **_code_** tab.
5.  Select the _DatasetToExcel_ component to import it into your Power App.

### Usage

1. Insert the Power Apps collection containing the data to export into _Items_ property.
2. ?? Create another collection that contains at least one Column (ie: "ColName") with the rows being the column names of the DataSet you wish to export.
3. ?? _Needs Update/Tested: Map ColName to the Column Property._
4. In the Power Apps control properties pane, select **_Fields_**, and select each of your dataset's columns that you would like to make available in your Power App for use in both display and exporting.
5. Click on the DatasetToExcel control while playing your Power App to activate the data export action.

You will be prompted to save the resulting Excel .xlsx spreadsheet containing the data in the configured collection, including only the columns identified in the SelectedColumns_Item property of the control.

_Optional_ - Update any of the DatasetToExcel control properties to configure the control to your desired configuration as displayed in the _Control Properties_ table below, as desired.
You can change the appearance and functionality of the control by modifying any of the following supported properties:

> ## Customizable Control Properties
>
> | Property              | Description                                                                         | Default |    Example    |
> | --------------------- | ----------------------------------------------------------------------------------- | :-----: | :-----------: |
> | BGColor               | Background color of the export icon                                                 | "white" |     "red"     |
> | BorderColor           | Border color of the export icon                                                     | "black" |    "green"    |
> | BorderHoverColor      | Border hover color of the export icon                                               | "black" |   "orange"    |
> | BorderRadius          | Border radius of the export icon                                                    |    0    |               |
> | BorderWidth           | Border width of the export icon                                                     |    0    |               |
> | Column                | Column Names to display                                                             |   ""    |    "Value"    |
> | ContentLanguage       | ISO 3166 lanuage code of the content being exported                                 |   ""    |    "en-us"    |
> | FileName              | Filename to export                                                                  |   ""    | "Export.xlsx" |
> | HoverBGColor          | Hover Background Color of the export icon                                           |         |               |
> | HoverTextColor        | Hover Text Color                                                                    |         |               |
> | IconColor             | Icon Color                                                                          |         |               |
> | IconName              | Icon Name                                                                           |         |               |
> | InputEvent            |                                                                                     |         |               |
> | Items                 | Collection to use for the XLSX export (Table/Collection)                            |         |               |
> | Loading               | Loading spinner                                                                     |         |               |
> | OnChange              | The actions to take upon single-clicking                                            |         |               |
> | OnSelect              | The actions to take upon double-clicking                                            |         |               |
> | SelectedColumns_Items | The user selected columns to include in the exported spreadsheet (Table/Collection) |         |               |

_Additional out-of-box settings such as Height, Width, DisplayMode, X, and Y are supported as well._

Thanks to [Hussam Odat](https://www.linkedin.com/in/hussam-odat-5075aa73) who created the initial code that this custom control was created from. While it helped to solve a primary business requirement within our project, it did not include an option required to allow the dynamic selection of individual columns based on the original dataset to export to the Excel _.xlsx_ spreadsheet.
