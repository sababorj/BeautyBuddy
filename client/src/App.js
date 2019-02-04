import React, { Component } from 'react';
import './App.css';
import AuthService from './components/pages/AuthService';
import withAuth from './components/pages/withAuth';
import Category from './components/pages/Category';
const Auth = new AuthService();

class App extends Component {
  
  // handleLogout = () => {
  //   Auth.logout();
  //   this.props.history.replace('/signup');
  // };

  // goToEditProfile = () => {
  //   this.props.history.replace('/profile');
  // };
  render() {
    console.log(process.env.REACT_APP_SECRET_CODE);
    return (
      <div className="App">
        <div className="App-header">
          < Category />
        </div>
        {/* <p className="App-intro">
          <button type="button" className="btn btn-primary" onClick={this.goToEditProfile}>Go to Profile</button>
          <button type="button" className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
        </p> */}
      </div> 
    );
  }
}

export default withAuth(App);
