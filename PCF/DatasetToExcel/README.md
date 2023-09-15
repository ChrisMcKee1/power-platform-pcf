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

- Before start using the component, you need to enable the [Code Component Framework](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/component-framework-for-canvas-apps) in your environment, if it is not already enabled.
- From the GitHub repo releases, download the latest released version of the DatasetToExcel solution.
- Navigate to [Power Apps](https://make.powerapps.com) and log in with your Microsoft work or school account.
- Select **_Solutions_**
- Select **_Import solution_**
- Select the compressed file downloaded from the DatasetToExcel GitHub repo.
- Once the solution has been imported successfully:
  - Create a new, or open an existing Power App that you would like to use the DatasetToExcel component in.
  - Select the _Insert_ menu form the left or top bar
  - In the bottom of the side bar, select **_Get more components_**, or if it's not visible, select **_Components_** in the Tree View and select the ellipsis (...) and select **_Import components_**
  - This will open a dialog in the right side with 2 tabs, **_canvas_** and **_code_**. Select the _code_ tab.
  - Select the DatasetToExcel component to import it.

## Usage

1. Insert the collection containing the data to export into _Items_ property.
2. Create a collection that contains at least one Column example name is ColName with the rows being the column names of the DataSet you wish to export.
3. Map ColName to the Column Property.
4. Under Properties Select Fields then select all the columns
5. Optional - Update the FileName property.
6. Next you should download Excel file containing the data in collection

- You can change the apearance of the control's button by modifying any of the component's control properties. The configurable properties of the custom control are as follows:

## Control Properties

| Property         | Description                                                                                                   |     Default      |    Example    |
| ---------------- | ------------------------------------------------------------------------------------------------------------- | :--------------: | :-----------: |
| BGColor          | Background color for the export icon                                                                          |     "white"      |     "red"     |
| BorderColor      | Border color for the export icon                                                                              |     "black"      |    "green"    |
| BorderHoverColor | Border hover color for the export icon                                                                        |     "black"      |   "orange"    |
| BorderRadius     | Border radius for the export icon                                                                             |        0         |               |
| BorderWidth      | Border width for the export icon                                                                              |        0         |               |
| Column           | Column Name                                                                                                   |        ""        |    "Value"    |
| ContentLanguage  | ISO3166 lanuage code of the content                                                                           |        ""        |    "en-us     |
| DisplayMode      | Configures whether the control allows user input (Edit), only displays data (View) or is disabled (Disabled). | DisplayMode.Edit |
| FileName         | Filename to export                                                                                            |        ""        | "Export.xlsx" |

Thanks to [Hussam Odat](https://www.linkedin.com/in/hussam-odat-5075aa73) who created the code that this custom control originated from. I built on top of this code to add the custom SelectedColumns functionality to allow exporting a columns dynamically selected by the end-user.
