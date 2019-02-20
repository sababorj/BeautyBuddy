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
        "iman", "l'oreal", "lotus cosmetics usa", "maia's mineral galaxy", "marcelle", "marienatie"],
      saveItem: []
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
      this.getSavedItems(this.state.username)
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
      this.setState({ shop: shop })
    })
  };

  getSavedItems = () => {
    API.findSaveItems(this.state.username).then(res => {
      const save = res.data.filter(item => item)
      this.setState({ saveItem: save })
      console.log(this.state.saveItem)
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
        // console.log(this.state)
        API.updateUser('image', this.state.username, body.s3Url)
          .then(async (response) => {
            const image = await API.face(this.state.username)
            console.log(image.data)
            API.facialRecognition(image.data)
              .then(response => {
                console.log(response)
                // The base64 data of the image
                const base64Image = e.target.result;

                // // / / Upload images in binary mode
                // // / / Turn base64 into binary
                // let image = API.face.dataURItoBlob(base64Image);
                // // / / According to the individual needs to fill in the parameters, here are all written, including age and gender, etc., see the official document for details
                // let attributes = 'gender';
                // // Upload the image and get the result
                // let dataDic = { 'image_file': image, 'return_landmark': 2, 'return_attributes': attributes };
                // console.log(image)
                // console.log(attributes)
                // console.log(dataDic)
                // console.log(response)
              })
          })
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
      .then(response => this.getBeautyPlaces())
  }

  saveItem = (index) => {
    API.saveItem(this.state.username, this.state.shop[index].image_link, this.state.shop[index].product_link, this.state.shop[index].name, this.state.shop[index].brand, this.state.shop[index].price)
      .then(response => this.getSavedItems(this.state.username))
  }

  UnsaveItem = (index) => {
    API.UnSave(this.state.username, this.state.saveItem[index].name)
      .then(response => this.getSavedItems(this.state.username))
  }

  render() {
    return (
      <div>


        <div className="row drop">
          <div className="col-sm-1"></div>

          {/* Profile Sidebar */}
          <div className="col-sm-3">
            <div className="card mx-auto mb-3 sidebar-prof">
              <h5 className="prof-header center-flex">Welcome {this.state.username}</h5>
              <div className="profile-image center-flex" style={{ backgroundImage: `url(${this.state.image})` }}>
              </div>
              <p className="pad-it center-flex">User: {this.state.username}<br></br>
                Zip Code: {this.state.zipcode}<br></br>
                Your Brand: {this.state.favBrand}</p>
              <div className="pad-it">
                <form onSubmit={this.uploadPic} >
                  <input ref={(ref) => { this.uploadInput = ref; }} type="file" className="btn btn-sm btn-light" />
                  <button className="btn btn-sm btn-light" type="submit">Save Image</button>
                </form>

                <p className="my-profile">
                  <label htmlFor="zipcode" className="profile-labels"><br></br><strong>Update Zip Code</strong></label>
                  <br></br><input name="zipcode" type="text" value={this.state.zipcode} onChange={this.changeInput} placeholder="Alter Zipcode"></input>
                  <br></br><button onClick={this.updateZip} className="btn btn-sm btn-light">Update Zip</button><br></br>
                  <br></br><label htmlFor="brand" className="profile-labels"><br></br><strong>Shop By Brand</strong></label>
                  <br></br><select className="selectpicker" name="brand" onChange={this.updateBrand} value={this.state.favBrand}>
                    {this.state.brandArray.map(item => (
                      <option value={item} key={item}>{item}</option>
                    ))}
                  </select>
                  <br></br><button onClick={this.updateUser} type="button" className="btn btn-md btn-outline-secondary">Save New Brand</button>
                  <hr />
                </p>
              </div>
            </div>
          </div>





          {/* SHOP BRANDS */}

          <div className="col-7 all-white ">
            <div>
              <div className="row scrolling-wrapper card-sections " id="main">
                <div>
                  <h5 className="prof-header center-flex">Shop Your Brands</h5>
                  <div>
                    <div className="scrolling-wrapper">
                      {this.state.shop.map((item, i) => (
                        <div key={i}>
                          <hr />
                          <div className="card-group">
                            <div className="card items-cards text-center">
                              <div className="products-thumbs yourMakeup" style={{ backgroundImage: `url(${item.image_link})` }} />
                              <div className="card-body">
                                <p>{item.name}</p>
                                <p>${item.price}0</p>
                                <button className="btn btn-light btn-block save" onClick={() => { this.saveItem(i) }}>Save</button>
                                <a href={item.product_link} target="blank"></a>
                                <a href={item.product_link} target="blank"> </a>
                              </div>
                            </div>
                          </div>
                        </div>

                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* WISHLIST */}
              <div className="row scrolling-wrapper card-sections">
                <div>
                  <h5 className="prof-header center-flex">Your Wishlist</h5>
                  <div>
                    <div className="scrolling-wrapper">
                      {this.state.saveItem.map((item, i) => (
                        <div key={i}>
                          <hr />
                          <div className="card-group">
                            <div className="card items-cards text-center">
                              <a href={item.product_link} target="blank"><img className="yourMakeup center" style={{ backgroundImage: `url(${item.image_link})` }} />
                              </a><div className="card-body">
                                <p>Item: {item.name}</p>
                                <p>Price: ${item.price}</p>
                                <button className="btn btn-block btn-light save" onClick={() => { this.UnsaveItem(i) }}>Remove</button>
                                <a href={item.product_link} target="blank"></a>
                              </div>
                            </div>
                          </div>
                        </div>

                      ))}
                    </div>
                  </div>
                </div>
                </div>

                {/* STUDIOS */}


                <div className="row scrolling-wrapper card-sections">
                  <div>
                    <h5 className="prof-header center-flex">Studios and Salons</h5>
                    <div>
                      <div className="scrolling-wrapper">
                        {this.state.beautyPlaces.map((yourPlaces, i) => (
                          <div key={i}>
                            <hr />
                            <div className="card-group">
                              <div className="card items-cards text-center">
                                 <div className="card-body">
                                  <h6 className="nav-pages">{yourPlaces.name}</h6>
                                  <p>{yourPlaces.address}</p>
                                  <p>{yourPlaces.rating} Stars</p>
                                  <button className="btn btn-block btn-light save" href="www.google.com/maps">Directions</button>
                                </div>
                              </div>
                            </div>
                          </div>

                        ))}
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>

          </div>
          <div className="col-1"></div>

        </div>              

    )
  }
}

export default withAuth(Profile);