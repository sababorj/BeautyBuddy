import React, { Component } from 'react';
import withAuth from './withAuth';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import "../pages/style.css";


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      image: "",
      zipcode: "",
      favBrand: "",
      beautyPlaces: []
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
          zipcode: "No Zipcode",
          favBrand: res.data.favBrand
        })
      } else {
        this.setState({
          username: res.data.username,
          email: res.data.email,
          image: res.data.image,
          zipcode: res.data.zipcode,
          favBrand: res.data.favBrand
        });
        this.getBeautyPlaces();
      };
    });

  }

  getBeautyPlaces = () => {
    API.postZip(this.state.zipcode).then(res => {
      const beautyStores = res.data;
      this.setState({
        beautyPlaces: beautyStores
      })
    });
  }
  uploadPic(e) {
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
        API.updateUser('image', this.state.username, body.s3Url)
      })
    });
  }

  updateZip = () => {
   const newZip = prompt("please provide a five digit zipcode");
   this.setState({ zipcode : newZip });
   API.updateUser('zipcode', this.state.username, newZip)
  }

  render() {
    return (
      <div className="container">

        <div className="row">
          <div className="col-sm-3 card mx-auto sidebar-prof mb-3">
          <h6>Welcome {this.state.username}</h6>
            <div className="profile-image" style={{ backgroundImage: `url(${this.state.image})` }}>
            </div>
            <form onSubmit={this.uploadPic} >
                <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                <button type="submit">Save Image</button>
              </form>

            <div>Zip Code: {this.state.zipcode} </div>
            <button onClick={this.updateZip} >Alter Zipcode</button>
            <h6>Brands you are interested in:{this.state.favBrand}</h6>
          </div>

          <div className="col-md-8 bg-light center-flex">
          <h4>Save or Shop</h4>
            <div className="card-deck">
              <div className="card">
                <img className="card-img-top" src="https://via.placeholder.com/140x100" alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">text</p>
                </div>
              </div>
              <div className="card">
                <img className="card-img-top" src="https://via.placeholder.com/140x100" alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">text.</p>
                </div>
              </div>
              <div className="card">
                <img className="card-img-top" src="https://via.placeholder.com/140x100" alt="Card image cap" />
                <div className="card-body">

                  <h5 className="card-title">Your Places</h5>
                  {this.state.beautyPlaces.map(yourPlaces => (
                    <div key={yourPlaces.name}>

                      <h6 className="nav-pages">{yourPlaces.name}</h6>
                      <p>{yourPlaces.address}</p>
                      <p>{yourPlaces.rating} Stars</p>
                      <hr />
                    </div>
                  ))}

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    )
  }
}

export default withAuth(Profile);