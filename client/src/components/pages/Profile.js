import React, { Component } from 'react';
import withAuth from './withAuth';
import API from '../../utils/API';
import { Link } from 'react-router-dom';

class Profile extends Component {

  state = {
    username: "",
    email: "",
    image: "",
    zipcode: "",
    favBrand: ""
  };

  componentDidMount() {
    API.getUser(this.props.user.id).then(res => {
      if (res.data.zipcode === 0) {
        this.setState({
          username: res.data.username,
          email: res.data.email,
          image: res.data.image,
          zipcode: "No Zipcode is provided",
          favBrand: res.data.favBrand
        })
      } else {
        this.setState({
          username: res.data.username,
          email: res.data.email,
          image: res.data.image,
          zipcode: res.data.zipcode,
          favBrand: res.data.favBrand
        })
      };
    })
  }

  render() {
    return (
      <div className="container Profile">
        <h5>Username: {this.state.username}</h5>
        <img src={this.state.image} />
        <h5>{this.state.zipcode}</h5>
        <p>Brands you are interested in:{this.state.favBrand}</p>
      </div>
    )
  }
}

export default withAuth(Profile);