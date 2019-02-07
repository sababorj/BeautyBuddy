import React, { Component } from 'react';
import withAuth from './withAuth';
import API from '../../utils/API';
import "./style.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      image: "",
      zipcode: "_",
      favBrand: "_",
      beautyPlaces: [],
      shop: [],
      brandArray: ["almay", "alva", "anna sui", "annabelle", "benefit", "boosh", "burt's bees", "butter london",
        "c'est moi", "cargo cosmetics", "china glaze", "clinique", "coastal classic creation", "colourpop",
        "covergirl", "dalish", "deciem", "dior", "dr. hauschka", "e.l.f.", "essie", "fenty", "glossier", "green people",
        "iman", "l'oreal", "lotus cosmetics usa", "maia's mineral galaxy", "marcelle", "marienatie"]
    }
    this.uploadPic = this.uploadPic.bind(this);
    this.updateBrand = this.updateBrand.bind(this);

  }

  componentDidMount() {
    API.getUser(this.props.user.id).then(res => {
      this.setState({
        username: res.data.username,
        email: res.data.email,
        image: res.data.image,
        zipcode: res.data.zipcode,
        favBrand: res.data.favBrand
      });
      if (this.state.favBrand !== "_")
        this.getBeautyPlaces();
      if (this.state.zipcode !== "_") {
        this.getShopItems();
      }
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

  getShopItems = () => {
    API.fillShop(this.state.favBrand).then(res => {
      const shop = res.data.filter(item => item)
      console.log(shop)
      this.setState({ shop: shop })
    })
  };

  updateBrand(event) {
    this.setState({
      favBrand: event.target.value
    })
  }

  updateUser = () => {
    API.updateUser('favBrand', this.state.username, this.state.favBrand)
    this.getShopItems();
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

  changeInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  updateZip = () => {
    API.updateUser('zipcode', this.state.username, this.state.zipcode)
      .then((response) => {
        this.getBeautyPlaces()
      })
  }

  render() {
    return (
      <div className="container">

        <div className="row drop">
          <div className="col-sm-4">
            <div className="card mx-auto mb-3 sidebar-prof">
              <h5>Welcome {this.state.username}</h5>
              <div className="profile-image" style={{ backgroundImage: `url(${this.state.image})` }}>
              </div>
              <p className="pad-it">User: {this.state.username}<br></br>
                Zip Code: {this.state.zipcode}<br></br>
                Your Brand: {this.state.favBrand}</p>
              <div className="pad-it">
                <form onSubmit={this.uploadPic} >
                  <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                  <button className="save" type="submit">Save Image</button>
                </form>
                <label htmlFor="zipcode"><strong>change zipcode below</strong></label>
                <input name="zipcode" type="text" value={this.state.zipcode} onChange={this.changeInput} placeholder="Alter Zipcode"></input>
                <button onClick={this.updateZip} className="btn btn-sm btn-outline-secondary">Update Zip</button>
                <label htmlFor="brand"><strong>change barnd below</strong></label>
                <select className="selectpicker" name="brand" onChange={this.updateBrand} value={this.state.favBrand}>
                  {this.state.brandArray.map(item => (
                    <option value={item} key={item}>{item}</option>
                  ))}
                </select>
                <button onClick={this.updateUser} type="button" className="save">Save New Brand</button>
              </div>
            </div>

           
            <button onClick={this.updateZip} className="save">Save New Zipcode</button>


          </div>
          <div className="col-sm-4 bg-light">
            <div className="card-deck">
              <div className="card">
                <img className="card-img-top" src="/image/beautyplace.jpg" alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title">Your Shop</h5>
                  {this.state.shop.map((item, i) => (
                    <div key={i}>
                      <hr />
                      <a href={item.product_link} target="blank">
                        <div className="yourMakeup" style={{ backgroundImage: `url(${item.image_link})` }}>
                        </div>
                      </a>
                      <p>Item: {item.name}</p>
                      <p>Brand: {item.brand}</p>
                      <p>Price: ${item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-4 bg-light">
            <div className="card">
              <img className="card-img-top" src="/image/beautyplace.jpg" alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">Beauty Places</h5>

                {this.state.beautyPlaces.map(yourPlaces => (
                  <div key={yourPlaces.name}>
                    <hr />
                    <h6 className="nav-pages">{yourPlaces.name}</h6>
                    <p>{yourPlaces.address}</p>
                    <p>{yourPlaces.rating} Stars</p>

                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>
      </div >

    )
  }
}

export default withAuth(Profile);