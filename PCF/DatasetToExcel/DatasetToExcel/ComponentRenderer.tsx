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
    //PropertyHelper.DataSetApi.Column[];
    fileName: string;
    itemsLoading: boolean;
    isLoading: boolean;
}


export const ComponentRenderer = (props: IDatasetToExcelProps) => {
    const { makerStyleProps, buttonProps, dataSet, selectedColumns, fileName, itemsLoading, isLoading } = props;

    const buttonIcon: IIconProps = { iconName: buttonProps.iconName };

    //const readyToExport = dataToExport ? true : false;

    const handleClick = (event: any) => {
        console.log("Total Records: ", dataSet.paging.totalResultCount);
        /* eslint-disable no-mixed-spaces-and-tabs */
        const dataToExport = prepareData(dataSet, selectedColumns);
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
        /* eslint-enable no-mixed-spaces-and-tabs */
    }

    return (
        <>
            {itemsLoading || isLoading && (
                <DefaultButton
                    styles={getStyle(makerStyleProps)}
                    title="Loading data"
                    ariaLabel="Loading data"
                    disabled={true}
                    checked={false}
                    onClick={handleClick}
                    onRenderIcon={() => <Spinner label="Loading data" />}
                >
                </DefaultButton>
            )}

            {!itemsLoading && !isLoading && (
                <DefaultButton
                    styles={getStyle(makerStyleProps)}
                    iconProps={buttonIcon}
                    title="Export To Excel"
                    ariaLabel="Export To Excel"
                    disabled={false}
                    checked={false}
                    onClick={handleClick}
                >
                    {buttonProps.buttonText}
                </DefaultButton>
            )}
        </>
    )
};

const getColumnNames = (updateColumns: ComponentFramework.PropertyTypes.DataSet) => {
    var columns: any = [];
    var tmpList: string[] = updateColumns.columns.map((col: any) => col.name);
    updateColumns.sortedRecordIds.map((colId: any) => {
        columns.push(updateColumns.records[colId].getValue(tmpList[0]))
    });
    return columns
}

const prepareData = (dataSet: ComponentFramework.PropertyTypes.DataSet, updateColumns: ComponentFramework.PropertyTypes.DataSet | null = null) => {
    var data: any = [];

    if (updateColumns) {
        const columnList: any = getColumnNames(updateColumns);
        dataSet.sortedRecordIds.map((recId: any) => {
            var record: any = {};
            dataSet.columns.map((col: any) => {
                if (columnList.find((colName: string) => colName === col.name)) {
                    record[col.name] = dataSet.records[recId].getValue(col.name);
                    data.push(record);
                }
            })
        });
    } else if (!updateColumns) {
        dataSet.sortedRecordIds.map((recId: any) => {
            var record: any = {};
            dataSet.columns.map((col: any) => {

                const colName: string = col?.name;
                record[colName] = dataSet.records[recId].getValue(colName)
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