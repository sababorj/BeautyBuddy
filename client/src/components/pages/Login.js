import React, { Component } from 'react';
import AuthService from './AuthService';
import { Link } from 'react-router-dom';
import "./login.css";
class Login extends Component {
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

    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        // once user is logged in
        // take them to their profile page
        this.props.history.replace(`/profile`);
      })
      .catch(err => {
        alert(err.response.data.message)
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="container pearl center">
        <div className="drop-top card mx-auto border-dark bg-light mb-3">
          <div className="card-header ">Login</div>
          <div className="card-body pearl">
            <form onSubmit={this.handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email address:</label>
                <input className="form-control"
                  placeholder="Email"
                  name="email"
                  type="email"
                  id="email"
                  onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="pwd">Password:</label>
                <input className="form-control"
                  placeholder="Password"
                  name="password"
                  type="password"
                  id="pwd"
                  onChange={this.handleChange} />
              </div>
              <button type="submit" className="btn mx-auto btn-dark">Submit</button>
              <p><Link to="/signup" className="text-dark">Register</Link></p>
              </form>
            
          </div>
        </div>
      </div>



    );
  }
}

export default Login;