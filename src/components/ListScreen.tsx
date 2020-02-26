import React, { Component } from 'react';
import UserService from '../services/UserService';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';

import { TransitionProps } from '@material-ui/core/transitions'; // testar se com a chamada por nome realmente pesa

import SideMenu from './commons/SideMenu';
import LoadingSpinner from './commons/LoadingSpinner';
import SimpleTable from './commons/SimpleTable';
import User from '../models/UserModel';

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


interface IProps {
    history?: any
}

interface IState {
    users: Array<User>;
    isLoading: boolean
    confirm: boolean
    selectedUser: User | null,
    success: boolean
}

export default class ListScreen extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            users: [],
            isLoading: false,
            confirm: false,
            selectedUser: null,
            success: false
        }
        this.deleteUser = this.deleteUser.bind(this);
    }

    //  calls the class UserService
    async getData() {
        let response = await UserService.getAllUsers(); //  calls the method that returns the data

        this.setState({
            users: response,
            isLoading: false,
            confirm: false,
            selectedUser: null,
            success: false
        })
    }
    async confirmateDelete(id) {
        this.setState({
            isLoading: true
        })
        let deletRequest = await UserService.deleteUser(id);
        console.log(deletRequest);
        if(deletRequest.success){
            this.setState({
                success: true
            })
        }
        this.getData();
    }

    async deleteUser(user: User) {
        this.setState({
            confirm: true,
            selectedUser: user
        });
    }

    componentDidMount() {
        this.getData(); // calls the method to load the data
    }

    renderList() {
        if (this.state.users.length > 0) { // verify if the data is already loaded
            return (
                <div className="screen-content__body">
                    <AppBar position="static" color="transparent">
                        <ToolBar>
                            <Typography variant="h4" style={{ flexGrow: 1 }}>Usuários</Typography>
                            <Button variant="contained" onClick={() => console.log(this.props.history.push("/register"))}>
                                Novo Usuário
                            </Button>
                        </ToolBar>
                    </AppBar>
                    <SimpleTable delete={this.deleteUser} users={this.state.users} />
                </div>
            )
        }
        return (
            <LoadingSpinner>Carregando...</LoadingSpinner>
        )
    }

    render() {
        //console.log(this.state.users)
        return (
            <div className="screen-content">
                <SideMenu />

                <Modal // LOADING MODAL FOR DELETING 
                    open={this.state.isLoading}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Fade in={this.state.isLoading} >
                        <div className="modal__box" >
                            <LoadingSpinner>Aguarde</LoadingSpinner>
                        </div>
                    </Fade>
                </Modal>

                <Snackbar open={this.state.success} message="Deletado com sucesso!" autoHideDuration={6000}>
                </Snackbar>

                <Dialog    //  CONFIRM DELETE USER
                    open={this.state.confirm}
                    TransitionComponent={Transition}>
                    <DialogTitle>Você está prestes a deletar {this.state.selectedUser?.name}</DialogTitle>

                    <DialogContent>
                        <DialogContentText>Você tem certeza de que quer deletar {this.state.selectedUser?.name}?</DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => this.confirmateDelete(this.state.selectedUser?.id)} >
                            Deletar
                        </Button>

                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={() => {
                                this.setState({ confirm: false })
                            }} >
                            Cancelar
                        </Button>
                    </DialogActions>
                </Dialog>
                {this.renderList()}
            </div>
        )
    }
}
