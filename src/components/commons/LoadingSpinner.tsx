import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class LoadingSpinner extends Component {

    render() {
        return (
            <div className="loading-spinner">
                <CircularProgress size={50} />
                <h2>{this.props.children}</h2>
            </div>
        )
    }
}