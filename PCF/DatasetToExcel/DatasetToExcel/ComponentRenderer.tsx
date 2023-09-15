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
}

export const ComponentRenderer = (props: IDatasetToExcelProps) => {
    const { makerStyleProps, buttonProps, dataSet, selectedColumns, fileName, itemsLoading, isLoading } = props;
    const buttonIcon: IIconProps = { iconName: buttonProps.iconName };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("Total Records: ", dataSet.paging.totalResultCount);
        const dataToExport = prepareData(dataSet, selectedColumns);
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

const getColumnNames = (updateColumns: DataSet): string[] => {
    const tmpList: string[] = updateColumns.columns.map(col => col.name);
    return updateColumns.sortedRecordIds.map(colId => updateColumns.records[colId].getValue(tmpList[0])) as string[];
}

const prepareData = (dataSet: DataSet, updateColumns: DataSet | null = null): any[] => {
    const data: any[] = [];

    if (updateColumns) {
        const columnList: string[] = getColumnNames(updateColumns);
        dataSet.sortedRecordIds.forEach(recId => {
            const record: any = {};
            dataSet.columns.forEach(col => {
                if (columnList.includes(col.name)) {
                    record[col.name] = dataSet.records[recId].getValue(col.name);
                }
            });
            data.push(record);  // <-- Moved outside of the inner loop
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