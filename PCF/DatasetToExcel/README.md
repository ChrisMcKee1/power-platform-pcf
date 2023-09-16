# Export Dataset to Excel PCF component

---

### _Power Apps PCF component to export a dataset to a Microsoft Excel XLSX file_

DatasetToExcel is a code component that can be used in Power Apps to export any dataset from a Power App to a Microsoft Excel .xlsx file.

## Features

- Column names based on selected fields in fields property
- Column ordering based on selected fields in fields property
- Loading indicator
- Customizable export button (color, fill, font color, font size, border radius, and border color)
- Selectable columns to filter the DataSet down to only the columns you would like to export.

The **_Dataset to Excel_** custom control is a PCF code component to export any dataset within Microsoft Power Apps to an Excel file. It is as simple as working with Power Apps out-of-box gallery control.
It includes a customizable button to match your Power Apps theme and style.

### [Download the DatasetToExcel solution](https://github.com/ChrisMcKee1/power-platform-pcf/raw/main/PCF/DatasetToExcel/ExcelExporter.zip)

## Import the component to your tenant

To import this component to your Power Platform tenant:

- Before attempting to import the component, you will need to ensure the [Power Apps Code Component Framework](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/component-framework-for-canvas-apps) is enabled in the environment you will be importing it into.
- From the GitHub repo releases, download the latest released version of the DatasetToExcel solution.
- Navigate to [Power Apps](https://make.powerapps.com) and log in with your Microsoft work or school account.
- Select **_Solutions_**
- Select **_Import solution_**
- Select the compressed .ZIP file you downloaded from the [DatasetToExcel GitHub repo](https://github.com/ChrisMcKee1/power-platform-pcf/raw/main/PCF/DatasetToExcel/ExcelExporter.zip).
- Once the _DatasetToExcel_ solution has been imported successfully:
  - Create a new, or open an existing Power App which you would like to utilize the DatasetToExcel component in.
  - Select the **_Insert_** menu from the left or top bar.
  - In the bottom of the side bar, select **_Get more components_**. If this option is not visible, select **_Components_** while in _Tree View_, select the ellipsis (...), and finally select **_Import components_**.
  - A dialog will appear on the right of the screen with two tabs, **_canvas_** and **_code_**. Select the _code_ tab.
  - Select the DatasetToExcel component to import it into your application.

## Usage

1. Insert the collection containing the data to export into _Items_ property.
2. Create a collection that contains at least one Column (ie: "ColName") with the rows being the column names of the DataSet you wish to export.
3. _Needs Update: Map ColName to the Column Property._
4. In the Properties pane, Select **_Fields_**, to select each of your dataset's columns that you would like to make available in your Power App for use in both display and exporting.
5. Click on the DatasetToExcel control while playing your Power App to perform the data export action. You should be prompted to save the resulting Excel .xlsx spreadsheet containing the data in the configured collection.

> _Optional_ - Update any of the DatasetToExcel control properties to configure the control to your desired configuration as displayed in the _Control Properties_ table below, as desired.

> ### You can change the appearance and functionality of the control by modifying any of the following supported properties:
>
> ## Control Properties
>
> | Property              | Description                                                                                                   |     Default      |    Example    |
> | --------------------- | ------------------------------------------------------------------------------------------------------------- | :--------------: | :-----------: |
> | BGColor               | Background color for the export icon                                                                          |     "white"      |     "red"     |
> | BorderColor           | Border color for the export icon                                                                              |     "black"      |    "green"    |
> | BorderHoverColor      | Border hover color for the export icon                                                                        |     "black"      |   "orange"    |
> | BorderRadius          | Border radius for the export icon                                                                             |        0         |               |
> | BorderWidth           | Border width for the export icon                                                                              |        0         |               |
> | Column                | Column Names                                                                                                  |        ""        |    "Value"    |
> | ContentLanguage       | ISO 3166 lanuage code of the content being exported                                                           |        ""        |    "en-us"    |
> | DisplayMode           | Configures whether the control allows user input (Edit), only displays data (View) or is disabled (Disabled). | DisplayMode.Edit |               |
> | FileName              | Filename to export                                                                                            |        ""        | "Export.xlsx" |
> | HoverBGColor          | Hover Background Color                                                                                        |                  |               |
> | HoverTextColor        | Hover Text Color                                                                                              |                  |               |
> | IconColor             | Icon Color                                                                                                    |                  |               |
> | IconName              | Icon Name                                                                                                     |                  |               |
> | InputEvent            |                                                                                                               |                  |               |
> | Items                 | Collection to use for the XLSX export (Table/Collection)                                                      |                  |               |
> | Loading               | Loading spinner                                                                                               |                  |               |
> | OnChange              | The actions to take upon single-clicking                                                                      |                  |               |
> | OnSelect              | The actions to take upon double-clicking                                                                      |                  |               |
> | SelectedColumns_Items | The user selected columns to include in the exported spreadsheet (Table/Collection)                           |                  |               |

Thanks to [Hussam Odat](https://www.linkedin.com/in/hussam-odat-5075aa73) who created the initial code that this custom control was created from. While it helped to solve a primary business requirement within our project, it did not include support for the dynamic section of individual columns to export to the Excel _.xlsx_ spreadsheet.
