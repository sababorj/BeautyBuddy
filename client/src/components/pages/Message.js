import React, { Component } from 'react';
import withAuth from './withAuth';
import API from '../../utils/API';

class Message extends Component {

  state = {
    username: "",
    email: "",
    image: "",
  };

  componentDidMount() {
    API.getUser(this.props.user.id).then(res => {
        this.setState({
          username: res.data.username,
          email: res.data.email,
          image: res.data.image,
        })
    })
  }

  render() {
    return (
      <div className="container Profile">
        <h1>Messages</h1>
      </div>
    )
  }
}

export default withAuth(Message);