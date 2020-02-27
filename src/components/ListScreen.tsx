import React, { Component } from 'react';
import UserService from '../services/UserService';
import SideMenu from './commons/SideMenu';
import LoadingSpinner from './commons/LoadingSpinner';
import SimpleTable from './commons/SimpleTable';
import User from '../models/UserModel';

import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    Modal,
    Backdrop,
    Fade,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    Snackbar
} from "@material-ui/core";

import { TransitionProps } from '@material-ui/core/transitions'; // testar se com a chamada por nome realmente pesa


const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


interface IProps {
    history?: any,
}

interface IState {
    users: Array<User>;
    isLoading: boolean
    confirm: boolean
    selectedUser: User | null,
    openSnackWarn: boolean
}

export default class ListScreen extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            users: [],
            isLoading: false,
            confirm: false,
            selectedUser: null,
            openSnackWarn: false
        }
        this.deleteUser = this.deleteUser.bind(this);
        this.toUpdateScreen = this.toUpdateScreen.bind(this);
    }

    //  calls the class UserService
    async getData() {
        let response = await UserService.getAllUsers(); //  calls the method that returns the data

        if (response) {
            this.setState({
                users: response,
                isLoading: false,
                confirm: false,
                selectedUser: null
            })
            return
        }
    }


    //  called when the delete comand is cofirmed
    async confirmateDelete(id) {
        this.setState({
            isLoading: true, // start the loading on screen for the DELETE request
        })

        //  call the method to DELETE and assing the response {success: true | false}
        let deletRequest = await UserService.deleteUser(id);

        if (deletRequest.success) {
            this.setState({
                openSnackWarn: true
            })
        }

        this.getData();  //  update the list on the screen with 1 user less
    }

    deleteUser(user: User) {  //  this method is passed as props to the SimpleTable component
        this.setState({
            confirm: true,
            selectedUser: user
        });
    }

    toUpdateScreen(id){
        this.props.history.push('/update/' + id);
    }

    componentDidMount() {
        this.getData(); // calls the method to load the data
    }

    renderList() {
        if (this.state.users.length > 0) { // verify if the data is already loaded
            return (
                <div className="screen-content__body">
                    <AppBar position="static" color="transparent">
                        <Toolbar>
                            <Typography variant="h4" style={{ flexGrow: 1 }}>Usuários</Typography>
                            <Button variant="contained" onClick={() => this.props.history.push("/register")}>
                                Novo Usuário
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <SimpleTable navigate={this.toUpdateScreen} delete={this.deleteUser} users={this.state.users} />
                </div>
            )
        }
        return (
            <LoadingSpinner>Carregando...</LoadingSpinner>
        )
    }

    render() {
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

                <Snackbar //  wanning on delet success
                    anchorOrigin={{horizontal: "center", vertical: "bottom"}}
                    open={this.state.openSnackWarn}
                    onClose={() => this.setState({ openSnackWarn: false })}
                    message="Deletado com sucesso!"
                    autoHideDuration={5000}>
                </Snackbar>

                <Dialog    //  CONFIRM DELETE USER
                    open={this.state.confirm}
                    TransitionComponent={Transition}>
                    <DialogTitle>Você está prestes a deletar {this.state.selectedUser?.name}</DialogTitle>

                    <DialogContent dividers>
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
