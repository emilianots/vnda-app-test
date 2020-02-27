import React, { Component } from 'react';

import {
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableBody,
    Paper,
    Typography,
    IconButton
} from "@material-ui/core";

import {
    Close,
    Edit
} from '@material-ui/icons';

import User from '../../models/UserModel';


interface IProps {
    users: Array<User>;
    delete?: any, // delete method that cames from the parent
    navigate?: any // this will navigate due to the id passed
}

interface IState {
    users: Array<User>;
}

export default class SimpleTable extends Component<IProps> {

    render() {
        return (
            <TableContainer component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell><Typography variant="h6">Email</Typography></TableCell>
                            <TableCell><Typography variant="h6">Nome</Typography></TableCell>
                            <TableCell><Typography variant="h6">Código externo</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.users.map(row => ( // iterating the user array passed to the props
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <IconButton onClick={() => {
                                        this.props.delete(row) //  delete user selected
                                    }} ><Close /></IconButton>
                                </TableCell>
                                <TableCell padding="checkbox">
                                    <IconButton onClick={() => {
                                        this.props.navigate(row.id); // navigate to edit the user selected
                                    }} ><Edit /></IconButton>
                                </TableCell>
                                <TableCell component="th" scope="row" >{row.email}</TableCell>
                                <TableCell >{row.name}</TableCell>
                                <TableCell >{row.external_code}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}
