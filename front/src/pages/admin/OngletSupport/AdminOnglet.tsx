import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button} from "@mui/material";
import {useEffect} from "react";
import AuthService from "../../../services/AuthService";

const headCells = [
    {id: 'society', numeric: false, disablePadding: true, label: 'Nom de la société'},
    {id: 'email', numeric: true, disablePadding: false, label: 'Email'},
    {id: 'url', numeric: true, disablePadding: false, label: 'Url'},
    {id: 'actions', numeric: true, disablePadding: false, label: 'Actions'},
];

export const AdminOnglet = () => {

    const [data, setData] = React.useState([])
    const validateAccount = (id :any) => {
        console.log(id)
        AuthService.verifyUser(id).then((res :any) => {
            getUsers()
        })
    }

    const getUsers = () => {
        AuthService.getUsers().then((res :any) => {
            setData(res)
        })
    }

    useEffect(() => {
        getUsers()
    }, [])

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
                        {data.map((row :any, key:number) => (
                            <TableRow
                                key={key}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align={'left'}>
                                    {row?.society}
                                </TableCell>
                                <TableCell align={'right'}>
                                    {row?.email}
                                </TableCell>
                                <TableCell align={'right'}>
                                    {row?.url}
                                </TableCell>
                                {
                                    !row?.isVerified ?
                                    <TableCell align={'right'}>
                                        <Button onClick={() => validateAccount(row.id)} style={{
                                            backgroundColor: '#4caf50',
                                        }}>
                                            Vérifier
                                        </Button>
                                    </TableCell>
                                        :
                                    <TableCell align={'right'}>
                                    </TableCell>
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}