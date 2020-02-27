import React, { Component } from 'react';
import SideMenu from './commons/SideMenu';
import LoadingSpinner from './commons/LoadingSpinner'
import UserService from '../services/UserService';
import User from '../models/UserModel';

import { } from 'react-router-dom';

import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    TextField,
    MenuItem,
    Snackbar,
    IconButton
} from '@material-ui/core';
import { NavigateBefore } from '@material-ui/icons'

interface IProps {
    history?: any,
    match?: any,
    wanring?: any
}

interface IState {
    id: number | null,
    email: string,
    name: string,
    tags: Array<string>,
    role: number,
    external_code: string,

    isLoading: boolean,

    openSnackWarn: boolean,
    snackWarning: string
}

export default class UpdateScreen extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)
        this.state = {

            id: null,
            email: "",
            name: "",
            tags: [],
            role: 0,
            external_code: "",

            isLoading: true,

            openSnackWarn: false,
            snackWarning: ""
        }
    }

    async getUser(id) {  //  it will get the user form the server
        let user = await UserService.getUser(id);
        if (user.hasOwnProperty("error")) {
            this.setState({
                isLoading: false,
                openSnackWarn: false,
                snackWarning: user.error
            })
            return
        }
        this.setState({
            id: user.id,
            name: user.name,
            email: user.email,
            tags: user.tags,
            role: user.role,
            external_code: user.external_code,

            isLoading: false
        })
    }

    async register() {
        this.setState({
            isLoading: true,
        })
        let user: User = {
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            tags: this.state.tags,
            role: this.state.role,
            external_code: this.state.external_code
        }

        let post = await UserService.updateUser(user); //  call the method that post the new user from UserService

        this.setState({
            openSnackWarn: true,
            snackWarning: `Usuário "${user.name}" atualizado com sucesso!` //  assign the success message
        })
        this.getUser(user.id);
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
                <LoadingSpinner>Carregando usuário</LoadingSpinner>
            )
        }
        if (!this.state.id) {
            return (
                <div className="d-flex-col-center">
                    <Typography variant="h4" >
                        Erro: usuário não encontrado
                    </Typography>

                </div>
            )
        }

        return (
            <div className="screen-content__body" >
                <AppBar position="static" color="transparent">
                    <Toolbar>
                        <IconButton onClick={()=> this.props.history.goBack()}>
                            <NavigateBefore/>
                        </IconButton>
                        <Typography variant="h6">Atualizar dados: {this.state.email}</Typography>
                    </Toolbar>
                </AppBar>

                <form style={{ padding: '20px' }} >
                    <div >
                        <TextField
                            id='email'
                            variant="outlined"
                            label="E-mail"
                            fullWidth
                            disabled  //  email can not be changed
                            margin="normal"
                            value={this.state.email} />
                    </div>
                    <div>
                        <TextField
                            id="name"
                            variant="outlined"
                            label="Nome"
                            fullWidth
                            margin="normal"
                            value={this.state.name}
                            onChange={(name) => this.setState({ name: name.target.value })} />
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
                            value={this.state.external_code}
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
                            value={this.state.tags.join(",")}
                            onChange={(tags) => this.addTag(tags.target.value)} />
                    </div>
                    <div style={{ marginTop: "16px" }}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                this.register()
                            }}
                        >Salvar</Button>
                    </div>
                </form>
            </div>
        )
    }

    componentDidMount() {
        this.getUser(this.props.match.params.id)
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
