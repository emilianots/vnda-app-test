import React, { Component } from 'react';
import ListScreen from './components/ListScreen';
import RegisterScreen from './components/RegisterScreen'
import UpdateScreen from './components/UpdateScreen'
import Header from './components/commons/Header';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

class App extends Component {

  render() {

    return (

      <Router>
        <Header />

        <Route exact path="/" component={ListScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/update/:id" component={UpdateScreen} />
      </Router>
    )
  }
}

export default App;
