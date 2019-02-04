import React, { Component } from 'react';
import withAuth from './withAuth';
import API from '../../utils/API';
<<<<<<< HEAD
=======
import { Link } from 'react-router-dom';
import "../pages/style.css";

>>>>>>> b965222ca2d4f1b38b524e6109c186efdd342eea

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      image: "",
      imageURL: "",
      zipcode: "",
      favBrand: ""
    }

    this.uploadPic = this.uploadPic.bind(this);

  }

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

  uploadPic(e){
    e.preventDefault();
    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('category', 'image');

    fetch('https://www.fileconvrtr.com/api/convert/file?apiKey=a8f545dbb31244a5b081a8cc6bdf37f7', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ image: body.s3Url });
        console.log(this.state)
        API.updateUser('image',this.state.username, body.s3Url)
      })
    });
  }

  render() {
    return (
      <div className="container Profile">
        <h5>Username: {this.state.username}</h5>
        <div className="profile-image" style={{ backgroundImage: `url(${this.state.image})` }}>
        <form onSubmit={this.uploadPic} >
        <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
        <button type="submit">save</button>
        </form>
        </div>
        <h5>{this.state.zipcode}</h5>
        <p>Brands you are interested in:{this.state.favBrand}</p>
      <div className="container-fluid">
        <div className="row">
        
          <div className="col-sm-3 card mx-auto bg-light mb-3">
            <img src={this.state.image} />
            <h5>Username: {this.state.username}</h5>
            <h5>{this.state.zipcode}</h5>
            <p>Favorite Brands:{this.state.favBrand}</p>
          </div>


          <div className="col-md-9 card-columns mx-auto bg-light">
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



          <div className="row drop-top card mx-auto bg-light">
            shop
            </div>
        </div>

        <div className="row drop-top card mx-auto bg-light">Google Places</div>


      </div>



    )
  }
}

export default withAuth(Profile);