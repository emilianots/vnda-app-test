import React, { Component } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';


export default class Header extends Component {

    render() {
        return (
            <header className="header">
                <div className="aside-options">

                    <MenuIcon className="side-menu-btn" fontSize="large" style={{ color: "gray" }} />

                    <div className="input-field">
                        <SearchIcon />
                        <input className="input-search" />
                    </div>

                </div>

                <div className="logo">
                    <h1>Vnda</h1>
                </div>

                <div className="user-btn">
                    <span>reis@vnda.com</span>
                </div>
            </header>
        )
    }
}