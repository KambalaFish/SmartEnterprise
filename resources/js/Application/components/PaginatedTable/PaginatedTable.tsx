import React, {useEffect, useState} from "react";
import {Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from "@material-ui/core";
import {useStyles} from './includes/stylesTest';
import {PaginatedTableTestProps} from "../../utils/Interfaces/PropsInterfaces";

export function PaginatedTable({
                                   children,
                                   data,
                                   perPage,
                                   emptyRowsNumber,
                                   pageCount,
                                   columns,
                                   actionColumns,
                                   tableCellHeight
                               }: PaginatedTableTestProps): JSX.Element {
    const [emptyRows, setEmptyRows] = useState<JSX.Element[]>([]);
    const [columnNameElements, setColumnNameElements] = useState<JSX.Element[]>([]);
    const classes = useStyles({rowsPerPage: perPage, tableCellHeight: tableCellHeight});


    useEffect(() => {
        const rows: JSX.Element[] = [];
        if (emptyRowsNumber > 0) {
            let cols = columns.map((x) => {
                return <TableCell key={x.name} className={classes.tableCell} style={{width: x.percent + '%'}}/>;
            });
            const actCols = actionColumns?.map((x) => {
                return <TableCell key={x.name} className={classes.tableCell} style={{width: x.percent + '%'}}/>
            });
            cols = actCols ? [...cols, ...actCols] : [...cols];
            const index = perPage * (pageCount - 1) + data.length;
            for (let i = 1; i <= emptyRowsNumber; i++) {
                rows.push(<TableRow key={index + i}>{cols}</TableRow>);
            }
        }
        setEmptyRows(rows);
    }, [emptyRowsNumber, pageCount, perPage]);

    useEffect(() => {
        const colNames = columns.map(
            (column) =>
                (<TableCell align="center" key={column.name} className={classes.tableHeaderCell}
                            style={{width: column.percent + '%'}}>{column.name}</TableCell>)
        );
        const actionColNames = actionColumns?.map(
            (column) =>
                (<TableCell align="center" key={column.name} className={classes.tableHeaderCell}
                            style={{width: column.percent + '%'}}>{column.name}</TableCell>)
        );
        const res = actionColNames ? [...colNames, ...actionColNames] : [...colNames];
        setColumnNameElements(res);
    }, []);

    function mapTableContent(): JSX.Element[] {

        function mapColumns(cur: { [x: string]: never }): JSX.Element[] {
            return columns.map(
                (column) =>
                    (
                        <TableCell align='center' key={column.name} className={classes.tableCell}
                                   style={{width: `${column.percent}%`}}>
                            {cur[column.property]}
                        </TableCell>
                    )
            )
        }

        function mapActionColumns(cur: { [x: string]: never }): JSX.Element[] {
            return !actionColumns ? [] : actionColumns.map(
                (column) => (
                    <TableCell align='center' key={column.name} className={classes.tableCell}
                               style={{width: `${column.percent}%`}}>
                        {column.actions.map(
                            action => {
                                return action.clickableButton(cur[action.targetProperty])
                            }
                        )}
                    </TableCell>
                )
            )
        }

        return data.map(
            (cur: { [x: string]: never; }) => (
                <TableRow key={cur['id']} className={classes.tableRow}>
                    {[
                        ...mapColumns(cur),
                        ...mapActionColumns(cur)
                    ]}
                </TableRow>
            )
        )
    }

    return (
        <TableContainer className={classes.tableContainer} component={Paper} elevation={24}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {columnNameElements}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mapTableContent()}
                    {emptyRows}
                </TableBody>
            </Table>
            {children}
        </TableContainer>
    );
}
