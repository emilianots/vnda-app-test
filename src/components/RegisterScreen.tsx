import React, { Component } from 'react';
import SideMenu from './commons/SideMenu';
import LoadingSpinner from '../components/commons/LoadingSpinner';
import UserService from '../services/UserService';
import User from '../models/UserModel';
import { validate } from '../utils/validation';

import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    TextField,
    MenuItem,
    Snackbar,
    IconButton
} from '@material-ui/core'

import {
    NavigateBefore
} from "@material-ui/icons"


interface IProps {
    history?: any
}

interface IState {
    id: number,
    name: string,
    email: string,
    tags: Array<string>,
    role: number,
    external_code: string,

    isLoading: boolean,

    emailError: boolean,
    emailWarn: any,

    openSnackWarn: boolean,
    snackWarning: string,
}

export default class RegisterScreen extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)
        this.state = {
            id: 0,
            name: "",
            email: "",
            tags: [''],
            role: 0,
            external_code: "",

            isLoading: false,

            emailError: false,
            emailWarn: "",

            openSnackWarn: false,
            snackWarning: ""
        }
    }

    async register() {
        this.setState({
            isLoading: true,
        })
        //  NEEDS VERIFICATION OF DATA BEFORE POSTING!!!
        let newUser: User = {
            id: null,
            name: this.state.name,
            email: this.state.email,
            tags: this.state.tags,
            role: this.state.role,
            external_code: this.state.external_code
        }

        //console.log(newUser);
        let post = await UserService.newUser(newUser); //  call the method that post the new user from UserService
        let errors = post.errors

        if (errors) { //  verify if the request returned with any error
            if (errors.hasOwnProperty('email')) {  //  verify it has any erros related to email
                this.setState({
                    emailError: true,
                    emailWarn: errors.email.join(", ") //  transforms the errors array into a full string
                })
            }

            this.setState({
                isLoading: false,
                openSnackWarn: true,
                snackWarning: `O email ${newUser.email} já existe!` // update the message to display on the snackbar
            });
            return
        }

        this.setState({
            isLoading: false,
            openSnackWarn: true,
            snackWarning: `Usuário ${newUser.name} adicionado com sucesso!` //  assign the success message
        })
        //this.props.history.goBack();
    }

    changeRole(value) {
        this.setState({
            role: value
        })
    }

    addTag(value: string) {
        let tags = value.split(",");
        this.setState({
            tags
        })
    }

    renderBody() {
        if (this.state.isLoading) {
            return (
                <LoadingSpinner>Enviando dados...</LoadingSpinner>
            )
        }

        return (
            <div className="screen-content__body" >
                <AppBar position="static" color="transparent">
                    <Toolbar>
                        <IconButton onClick={() => this.props.history.goBack()}>
                            <NavigateBefore />
                        </IconButton>
                        <Typography variant="h6">Novo Usuário</Typography>
                    </Toolbar>
                </AppBar>

                <form style={{ padding: '20px' }} >
                    <div >
                        <TextField
                            id='email'
                            variant="outlined"
                            label="E-mail"
                            fullWidth
                            margin="normal"
                            helperText={this.state.emailWarn}
                            error={this.state.emailError}
                            onChange={(email) => {
                                this.setState({ email: email.target.value });
                                let v = validate('email', email.target.value);
                                this.setState({
                                    emailError: !v[0], emailWarn: v[1]
                                })
                            }} />
                    </div>
                    <div>
                        <TextField
                            id="name"
                            variant="outlined"
                            label="Nome"
                            fullWidth
                            margin="normal"
                            onChange={(name) => {
                                this.setState({ name: name.target.value })
                            }} />
                    </div>
                    <div>
                        <TextField
                            id="role"
                            select
                            label="Função"
                            variant="outlined"
                            value={this.state.role}
                            fullWidth
                            margin="normal"
                            onChange={(role) => this.changeRole(role.target.value)}>
                            <MenuItem key="Gestor" value={0}>Gestor</MenuItem>
                            <MenuItem key="Agente" value={1}>Agente</MenuItem>
                            <MenuItem key="Local" value={2}>Local</MenuItem>
                        </TextField>
                    </div>
                    <div>
                        <TextField
                            id="external_code"
                            variant="outlined"
                            label="Código externo"
                            fullWidth
                            margin="normal"
                            onChange={(external_code) => this.setState({ external_code: external_code.target.value })} />
                    </div>
                    <div>
                        <TextField
                            id="tags"
                            variant="outlined"
                            label="Tags"
                            fullWidth
                            margin="normal"
                            helperText="Digite as tags separando-as por vírgula"
                            onChange={(tags) => this.addTag(tags.target.value)} />
                    </div>
                    <div style={{ marginTop: "16px" }}>
                        <Button
                            variant="contained"
                            disabled={this.state.emailError || this.state.email.length === 0}
                            onClick={() => {
                                this.register()
                            }}
                        >Salvar</Button>
                    </div>
                </form>
            </div>
        )
    }

    render() {
        return (
            <div className="screen-content">
                <SideMenu />
                {this.renderBody()}
                <Snackbar
                    anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
                    open={this.state.openSnackWarn}
                    onClose={() => this.setState({ openSnackWarn: false })}
                    message={this.state.snackWarning}
                    autoHideDuration={5000}>
                </Snackbar>

            </div>
        )
    }
}
