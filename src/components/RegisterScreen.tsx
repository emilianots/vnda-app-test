import React, { Component } from 'react';
import SideMenu from './commons/SideMenu';
import LoadingSpinner from '../components/commons/LoadingSpinner';
import UserService from '../services/UserService';
import User from '../models/UserModel';
import { validate } from '../utils/validation'

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';

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
    snackWarn: ""
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
            snackWarn: ""
        }
    }

    async register() {
        this.setState({
            isLoading: true,
            openSnackWarn: true
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
 
        if (post.errors) { //  verify if the request returned with any error
            console.log(post.errors);
            this.setState({
                isLoading: false,
            });
            return
        }

        console.log(post);
        this.setState({
            isLoading: false,
            openSnackWarn: true
        })
    }

    changeRole = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value: number = parseInt(event.target.value, 10);
        console.log(event.target.id)
        this.setState({
            role: value
        })
    }

    addTag = (event: React.ChangeEvent<HTMLInputElement>) => {
        let tags = event.target.value.split(',');
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
                    <ToolBar>
                        <Typography variant="h6">Novo Usuário</Typography>
                    </ToolBar>
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
                            onChange={this.changeRole}
                        >
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
                            onChange={this.addTag} />
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
                    message="Usuário adicionado com sucesso!"
                    autoHideDuration={5000}>
                </Snackbar>

            </div>
        )
    }
}
