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

          <div className="col-sm-3 card mx-auto bg-light mb-3">
            <img src={this.state.image} />
            <h5>Username: {this.state.username}</h5>
            <h5>{this.state.zipcode}</h5>
            <p>Favorite Brands:{this.state.favBrand}</p>
          </div>

          <div className="col-md-8 card-columns bg-light">
            <div className="card saved-rem">
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text">SAVED 1</p>
              </div>
            </div>

            <div className="card saved-rem">
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text">SAVED 2</p>
              </div>
            </div>

            <div className="card saved-rem">
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text">SAVED 3</p>
              </div>
            </div>

          </div>


          

        </div>

      </div >



    )
  }
}

export default withAuth(Profile);