# Export Dataset to Excel file code component
---
### _Powerapp code component to export dataset to excel file_

DatasetToExcel is a code component that can be used in powerapps to export any dataset to an excel file with features:

## Features

- Columns name based on selected fields in fields property
- Columns order based on selected fields in fields property
- Loading indicator
- customizable button (color,fill,font color,font size, border radius,border color)
- Selected Columns to filter DataSet down to only the columns you care about. 


**_Dataset to excel_** custom control is a pcf code compoent to export ant dataset within microsoft powerapps to excel file as simple as dealing with powerapps standard gallery
with customizable button to match your app style.

## Import the component to your tenant

Here is how to add the component to your microsoft dynamic 365:
- Before start using the component, you need to enable the Code Component in your environment if it is not enabled.
- from github repo releases, download the latest released solution.
- in you microsoft account navigate to powerapps, then solutions and select import solution, then continue importing the solution that you have downloaded from github.
- if solution imported successfully, open the app that you want to use the component in it, then select Insert menu form the left side bar, then in yhe bottom of the side bar, select **_Get more components_**, this will open a dialog in the right side, the dialog has 2 tabs, **_canvas_** and **_code_**, select code tab, then find DatasetToExcel component and import it.


## Usage

### [Download Zip](https://github.com/ChrisMcKee1/power-platform-pcf/raw/main/PCF/DatasetToExcel/ExcelExporter.zip)

1. Insert the data collection to "Items" property
2. Insert a collection that contain at least one Column example name is ColName with the rows being the column names of the DataSet you wish to export.
3. Map ColName to the Column Property.
4. Under Properties Select Fields then select all the columns
5. Optional - Update the FileName property.
6. Next you should download Excel file containing the data in collection

- You can change the apearance of button by changing the component properties for color, icon text color, etc..

[Hussam Odat](https://www.linkedin.com/in/hussam-odat-5075aa73) code was used to get started, I built on top of this code to add the custom SelectedColumns Functionality.
