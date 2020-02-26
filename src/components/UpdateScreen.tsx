import React, { Component } from 'react';
import SideMenu from './commons/SideMenu';
import UserService from '../services/UserService';
import User from '../models/UserModel';

interface IProps {
    history?: any
}

interface IState {
    user: User;
    isLoading: boolean
}

export default class UpdateScreen extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)
        this.state = {
            user: {
                id: 0,
                name: "",
                email: "",
                tags: [''],
                role: 0,
                external_code: ""
            },
            isLoading: false
        }
    }

    verifyData(){
        
    }

    async register() {

        //  NEEDS VERIFICATION OF DATA BEFORE POSTING!!!
        let newUser: User = {
            id: null,
            name: this.state.user.name,
            email: this.state.user.email,
            tags: this.state.user.tags,
            role: this.state.user.role,
            external_code: this.state.user.external_code
        }
        let post = await UserService.newUser(newUser); //  call the method that post the new user form UserService

        if (post.errors) { //  verify if the request has any error
            console.log(post.errors);
            this.setState({
                isLoading: false
            });
            return
        }
        console.log(post);
        this.setState({
            isLoading: false
        })

    }

    render() {
        return (
            <div className="list-screen">
                <SideMenu />
                <h4>Adicionar</h4>
                
            </div>
        )
    }
}
