import React, { Component } from 'react';
import withAuth from './withAuth';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import "../pages/style.css";


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
      <div className="container">
        <div className="row">
          <div className="col-sm-3 drop-top card mx-auto bg-light mb-3">
            <img src={this.state.image} />
            <h5>Username: {this.state.username}</h5>
            <h5>{this.state.zipcode}</h5>
            <p>Favorite Brands:{this.state.favBrand}</p>
          </div>
          <div className="col-md-9 shop-save">
            <div className="row drop-top card mx-auto bg-light">
              saved
            </div>
            <div className="row drop-top card mx-auto bg-light">
              shop
            </div>
          </div>

        </div>

        <div className="row drop-top card mx-auto bg-light">Google Places</div>


      </div>
    )
  }
}

export default withAuth(Profile);