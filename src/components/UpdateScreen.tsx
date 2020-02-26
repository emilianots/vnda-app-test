import React, { Component } from 'react';
import SideMenu from './commons/SideMenu';
import LoadingSpinner from './commons/LoadingSpinner'
import UserService from '../services/UserService';
import User from '../models/UserModel';

import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    TextField,
    MenuItem,
    Snackbar
} from '@material-ui/core'

interface IProps {
    history?: any,
    match?: any
}

interface IState {
    user: User | null;
    isLoading: boolean,
    errorMessage: string,
    emailError: boolean,

}

export default class UpdateScreen extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)
        this.state = {
            user: null,
            isLoading: true,
            errorMessage: "",

            emailError: false
        }
    }

    verifyData() {

    }

    async getUser(id) {
        let user = await UserService.getUser(id);
        if (user.hasOwnProperty("error")) {
            this.setState({
                isLoading: false,
                errorMessage: user.error
            })
            return
        }
        this.setState({
            user: user,
            isLoading: false
        })
        //console.log(this.state.user);
    }

    renderBody() {
        if (this.state.isLoading) {
            return (
                <LoadingSpinner>Carregando usuário</LoadingSpinner>
            )
        }

        return (
            <div className="screen-content__body" >
                <AppBar position="static" color="transparent">
                    <Toolbar>
                        <Typography variant="h6">Atualizar dados: {this.state.user?.name}</Typography>
                    </Toolbar>
                </AppBar>

                <form style={{ padding: '20px' }} >
                    <div >
                        <TextField
                            id='email'
                            variant="outlined"
                            label="E-mail"
                            fullWidth
                            disabled
                            margin="normal"
                            value={this.state.user?.email} />
                    </div>
                    <div>
                        <TextField
                            id="name"
                            variant="outlined"
                            label="Nome"
                            fullWidth
                            margin="normal"
                            value={this.state.user?.name} />
                    </div>
                    <div>
                        <TextField
                            id="role"
                            select
                            label="Função"
                            variant="outlined"
                            value={this.state.user?.role}
                            fullWidth
                            margin="normal">
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
                            value={this.state.user?.external_code} />
                    </div>
                    <div>
                        <TextField
                            id="tags"
                            variant="outlined"
                            label="Tags"
                            fullWidth
                            margin="normal"
                            helperText="Digite as tags separando-as por vírgula"
                            value={this.state.user?.tags.join(", ")} />
                    </div>
                    <div style={{ marginTop: "16px" }}>
                        <Button
                            variant="contained"
                            disabled={this.state.emailError || this.state.user?.email.length === 0}
                            onClick={() => {
                                //this.register()
                                console.log(this.state.user)
                            }}
                        >Salvar</Button>
                    </div>
                </form>
            </div>
        )
    }

    componentDidMount() {
        //console.log(this.props.match.params.id)
        this.getUser(this.props.match.params.id)
        //this.getUser(100)
    }

    render() {
        return (
            <div className="screen-content">
                <SideMenu />
                {this.renderBody()}
            </div>
        )
    }
}
