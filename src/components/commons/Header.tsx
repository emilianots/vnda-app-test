import React, { Component } from 'react';

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Input,
    InputAdornment,
} from "@material-ui/core";

import {
    Menu,
    Search
} from "@material-ui/icons"

export default class Header extends Component {

    render() {
        return (
            <AppBar
                style={{backgroundColor: "#2c3049"}}
                position="static"
                variant="elevation">
                <Toolbar>
                    <IconButton>
                        <Menu style={{color: "lightgrey"}} />
                    </IconButton>
                    <Input
                        className="input-field"
                        startAdornment={
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        }
                    />
                    <Typography style={{ flex: 1 }} variant="h4">Vnda</Typography>
                    <Typography style={{ color: "lightgrey" }} >vnda@vnda.com.br</Typography>
                </Toolbar>

            </AppBar>


        )
    }
}
