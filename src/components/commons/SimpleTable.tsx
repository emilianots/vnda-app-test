import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'

import {
    Close,
    Edit
} from '@material-ui/icons';

import User from '../../models/UserModel';


interface IProps {
    users: Array<User>;
    delete?: any
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
                                    <IconButton onClick={() => this.props.delete(row)} ><Close /></IconButton>
                                </TableCell>
                                <TableCell padding="checkbox">
                                    <IconButton onClick={() => console.log(row.id)} ><Edit /></IconButton>
                                </TableCell>
                                <TableCell component="th"scope="row" >{row.email}</TableCell>
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
