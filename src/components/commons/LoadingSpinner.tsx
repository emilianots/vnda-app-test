import React, { Component } from 'react';
import { CircularProgress, Typography } from '@material-ui/core';

export default class LoadingSpinner extends Component {

    render() {
        return (
            <div className="loading-spinner">
                <CircularProgress size={50} />
                <Typography variant="h5" >{ this.props.children}</Typography>
            </div>
        )
    }
}