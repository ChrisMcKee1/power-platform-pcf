import { IIconProps, IButtonStyles, DefaultButton, Spinner } from "@fluentui/react";
import * as React from "react"
import * as XLSX from 'xlsx';

// the colors from app maker
export interface IMakerStyleProps {
    textColor: string;
    bgColor: string;
    iconColor: string;
    hoverTextColor: string;
    hoverBgColor: string;
    borderColor: string;
    borderHoverColor: string;
    borderWidth: number;
    borderRadius: number;
    buttonWidth: number;
    buttonHeight: number;
}

export interface IMakerButtonProps {
    buttonText: string;
    iconName: string;
}

export interface IDatasetToExcelProps {
    makerStyleProps: IMakerStyleProps;
    buttonProps: IMakerButtonProps;
    dataSet: ComponentFramework.PropertyTypes.DataSet;
    selectedColumns: ComponentFramework.PropertyTypes.DataSet;
    fileName: string;
    itemsLoading: boolean;
    isLoading: boolean;
    onButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ComponentRenderer = (props: IDatasetToExcelProps) => {
    const { makerStyleProps, buttonProps, dataSet, selectedColumns, fileName, itemsLoading, isLoading } = props;
    const buttonIcon: IIconProps = { iconName: buttonProps.iconName };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.onButtonClick(event);
        console.log("Total Records: ", dataSet.paging.totalResultCount);
        const dataToExport = prepareData(dataSet, selectedColumns);
        // If dataToExport is empty, then there is no data to export
        if (dataToExport.length === 0) {
            console.log("No data to export");
            return;
        }
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    }

    const isLoadingState = itemsLoading || isLoading;

    return (
        <DefaultButton
            styles={getStyle(makerStyleProps)}
            title={isLoadingState ? "Loading data" : "Export To Excel"}
            ariaLabel={isLoadingState ? "Loading data" : "Export To Excel"}
            disabled={isLoadingState}
            checked={false}
            onClick={handleClick}
            iconProps={isLoadingState ? undefined : buttonIcon}
            onRenderIcon={isLoadingState ? () => <Spinner label="Loading data" /> : undefined}
        >
            {isLoadingState ? null : buttonProps.buttonText}
        </DefaultButton>
    );
};

type DataSet = ComponentFramework.PropertyTypes.DataSet;

const getColumnNames = (selectedColumns: DataSet): Array<{ key: string, value: string }> => {
    // Check if both ColName and DisplayName columns exist
    const hasColName = selectedColumns.columns.some(col => col.name === 'ColName');
    const hasDisplayName = selectedColumns.columns.some(col => col.name === 'ColDisplayName');

    if (hasColName && hasDisplayName) {
        return selectedColumns.sortedRecordIds.map(colId => ({
            key: selectedColumns.records[colId].getValue('ColName') as string,
            value: selectedColumns.records[colId].getValue('ColDisplayName') as string
        }));
    } else {
        console.log("Either ColName or ColDisplayName column is missing. Please update the dataset to include both columns and set the properties to the correct column names.");
    }

    // If the columns don't exist, return the original column names
    return selectedColumns.columns.map(col => ({ key: col.name, value: col.name }));
}

const prepareData = (dataSet: DataSet, selectedColumns: DataSet | null = null): any[] => {
    const data: any[] = [];

    console.log("Selected Columns: ", selectedColumns?.sortedRecordIds.length);

    if (selectedColumns && selectedColumns.sortedRecordIds.length > 0) {
        const columnList: Array<{ key: string, value: string }> = getColumnNames(selectedColumns);
        dataSet.sortedRecordIds.forEach(recId => {
            const record: any = {};
            dataSet.columns.forEach(col => {
                const matchingColumn = columnList.find(item => item.key === col.name);
                if (matchingColumn) {
                    record[matchingColumn.value] = dataSet.records[recId].getValue(matchingColumn.key);
                }
            });
            data.push(record);
        });
    } else {
        dataSet.sortedRecordIds.forEach(recId => {
            const record: any = {};
            dataSet.columns.forEach(col => {
                const colName: string = col?.name;
                record[colName] = dataSet.records[recId].getValue(colName);
            });
            data.push(record);
        });
    }
    return data;
}

const getStyle = (styleProps: IMakerStyleProps) => {
    const borderStyle = styleProps.borderWidth && styleProps.borderWidth > 0 ?
        `solid ${styleProps.borderWidth}px ${styleProps.borderColor}` : "none"

    const styles: IButtonStyles = {
        root: {
            color: styleProps.textColor,
            border: borderStyle,
            backgroundColor: styleProps.bgColor,
            borderRadius: `${styleProps.borderRadius}px`,
            width: `${styleProps.buttonWidth}px`,
            height: `${styleProps.buttonHeight}px`
        },
        icon: {
            color: styleProps.iconColor

        },
        rootHovered: {
            color: styleProps.hoverTextColor,
            backgroundColor: styleProps.hoverBgColor,
            border: `solid ${styleProps.borderWidth}px ${styleProps.borderHoverColor}`
        },
        iconHovered: {
            color: "inherit"
        },
        textContainer: {
            flexGrow: 0
        }
    }

    return styles;
}