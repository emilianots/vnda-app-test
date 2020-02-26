import React, { Component } from 'react';
import SideMenu from './commons/SideMenu';
import LoadingSpinner from './commons/LoadingSpinner'
import UserService from '../services/UserService';
import User from '../models/UserModel';

interface IProps {
    history?: any,
    match?: any
}

interface IState {
    user: User | null;
    isLoading: boolean
}

export default class UpdateScreen extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)
        this.state ={
            user: null,
            isLoading: true
        }
    }

    verifyData() {

    }

    async getUser(id) {
        console.log(this.state.user);

        let user = await UserService.getUser(id);
        this.setState({
            user: user,
            isLoading: false
        })
        console.log(this.state.user);
    }

    renderBody(){
        if(this.state.isLoading){
            return(
                <LoadingSpinner>Carregando usuário</LoadingSpinner>
            )
        }
    }

    componentDidMount() {
        //console.log(this.props.match.params.id)
        this.getUser(this.props.match.params.id)
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
