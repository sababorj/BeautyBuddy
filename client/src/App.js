import React, { Component } from 'react';
import './App.css';
import AuthService from './components/pages/AuthService';
import withAuth from './components/pages/withAuth';
import Category from './components/pages/Category';
const Auth = new AuthService();

class App extends Component {
  
  render() {
    console.log(process.env.REACT_APP_SECRET_CODE);
    return (
      <div className="App">
        <div className="App-header">
          < Category />
        </div>
      </div> 
    );
  }
}

export default withAuth(App);
