import React, { Component } from 'react';
import withAuth from './withAuth';
import API from '../../utils/API';
import {sockets} from '../../utils/sockets';

class Message extends Component {
  
  state = {
    username: "",
    email: "",
    image: "",
    messages: []
  };
  constructor(props) {
    super(props);
    sockets.listenForMessage(data => {
      this.setState({messages: [...this.state.messages, data]})
    });
  }


  componentDidMount() {
    API.getUser(this.props.user.id).then(res => {
        this.setState({
          username: res.data.username,
          email: res.data.email,
          image: res.data.image
        })
    })
    console.log(this.state);
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const {name, value} = event.target;
    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  submitForm = event => {
    event.preventDefault();
    sockets.sendMessage(this.state.message);
    this.setState({message: ""});
  };

  render() {
    return (
      <div className="container Profile">
        <p>Received Messages:</p>
        <div>
          {this.state.messages.map(message => <p key={message}>{message}</p>)}
        </div>
        <form className="form-inline">
          <div className="form-group">
            <input
              value={this.state.message}
              name="message"
              onChange={this.handleInputChange}
              type="text"
              placeholder="your message"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.submitForm}>Submit</button>
        </form>

      </div>
    )
  }
}

export default withAuth(Message);