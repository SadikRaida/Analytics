import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button} from "@mui/material";

const data = [
    {
        "id": 1,
        "name": "Société 1",
        "email": " email 1",
        "url": "https://www.google.com"
    },
    {
        "id": 2,
        "name": "Société 2",
        "email": " email 2",
        "url": "https://www.google.com"
    },
    {
        "id": 3,
        "name": "Société 3",
        "email": " email 3",
        "url": "https://www.google.com"
    }
]

const headCells = [
    {id: 'name', numeric: false, disablePadding: true, label: 'Nom de la société'},
    {id: 'email', numeric: true, disablePadding: false, label: 'Email'},
    {id: 'url', numeric: true, disablePadding: false, label: 'Url'},
    {id: 'actions', numeric: true, disablePadding: false, label: 'Actions'},
];

export const AdminOnglet = () => {
    const validateAccount = (id) => {
        console.log(id)
    }
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {
                                headCells.map((headCell) => (
                                    <TableCell key={headCell.id} align={headCell.numeric ? 'right' : 'left'}>
                                        {headCell.label}
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell key={row.id} align={'left'}>
                                    {row.name}
                                </TableCell>
                                <TableCell key={row.id} align={'right'}>
                                    {row.email}
                                </TableCell>
                                <TableCell key={row.id} align={'right'}>
                                    {row.url}
                                </TableCell>
                                <TableCell key={row.id} align={'right'}>
                                    <Button onClick={(e) => validateAccount(e.target.value)} style={{
                                        backgroundColor: '#4caf50',
                                    }}>
                                        Valider
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}