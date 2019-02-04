import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './AuthService';
import API from '../../utils/API';
import "./style.css";

class Signup extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      this.props.history.replace('/');
    }
  }

  handleFormSubmit = event => {
    event.preventDefault();
    API.signUpUser(this.state.username, this.state.email, this.state.password)
      .then(res => {
        // once the user has signed up
        // send them to the login page
        this.props.history.replace('/login');
      })
      .catch(err => alert(err));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="container">
        <div className="drop-top card mx-auto bg-light mb-3">
          <div className="card-header">Sign Up</div>
          <div className="card-body pearl">
            <form onSubmit={this.handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input className="form-control"
                  placeholder="Enter a Username"
                  name="username"
                  type="text"
                  id="username"
                  onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address:</label>
                <input className="form-control"
                  placeholder="Enter your Email"
                  name="email"
                  type="email"
                  id="email"
                  onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="pwd">Password:</label>
                <input className="form-control"
                  placeholder="Choose a Password"
                  name="password"
                  type="password"
                  id="pwd"
                  onChange={this.handleChange} />
              </div>
              <button type="submit" className="btn mx-auto btn-light">Submit</button>
              <button className="btn mx-auto btn-light"><Link to="/login" className="text-dark">Go to Login</Link></button>


            </form>
          </div>
        </div>
      </div>


    );
  }
}

export default Signup;