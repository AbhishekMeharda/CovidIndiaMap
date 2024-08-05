// src/components/DataTable.jsx

import React from 'react';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    header: {
        backgroundColor: '#f5f5f5',
    },
    headCell: {
        fontWeight: 'bold',
        fontSize: '1.1rem',
    },
    bodyCell: {
        fontSize: '1rem',
    },
    tableContainer: {
        maxHeight: 428, // Adjust the height as needed
        overflowY: 'auto', // Enable vertical scrolling
    },
});

const DataTable = ({ data }) => {
    const classes = useStyles();

    console.log('DataTabel', data);

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table" stickyHeader>
                <TableHead className={classes.header}>
                    <TableRow>
                        <TableCell className={classes.headCell}>State</TableCell>
                        <TableCell className={classes.headCell} align="right">Suspected</TableCell>
                        <TableCell className={classes.headCell} align="right">Tested</TableCell>
                        <TableCell className={classes.headCell} align="right">Confirmed</TableCell>
                        <TableCell className={classes.headCell} align="right">Deaths</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.state}>
                            <TableCell component="th" scope="row" className={classes.bodyCell}>
                                {row.state}
                            </TableCell>
                            <TableCell align="right" className={classes.bodyCell}>{row.suspected}</TableCell>
                            <TableCell align="right" className={classes.bodyCell}>{row.tested}</TableCell>
                            <TableCell align="right" className={classes.bodyCell}>{row.confirmed}</TableCell>
                            <TableCell align="right" className={classes.bodyCell}>{row.deaths}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DataTable;