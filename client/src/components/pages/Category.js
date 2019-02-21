import React, { Component } from 'react';
import AuthService from './AuthService';
import type from '../../category.json';
import './style.css';

class Category extends Component {
    constructor() {
        super();
        this.Auth = new AuthService();
    }
    state = {
        type: type
    }

    GoToItem = (name) => {
        this.props.history.replace({
            pathname: '/item',
            state: { productName: name }
        });
        // API.itemCall(name).then(item => {
        //     console.log(this.props)
        //     this.props.history.replace({
        //         pathname: '/item',
        //         state: { productResult: name }
        //     });
        // });

    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>Shop, Smile &amp; Shine!</h1>
                </div>
                <div data-spy="scroll" data-target="#navbar-example3" data-offset="0">
                    <div className="container">
                        <div className="row white-bk">
                            {this.state.type.map(item => (
                                <>
                                    {/* <h1 key={item.id} className="category-tag">{item.name}</h1> */}
                                    <div key={item.name} className="category-image" style={{ backgroundImage: `url(${item.image})` }} onClick={() => this.GoToItem(item.name)}>
                                    </div>
                                </>
                            ))}
                        </div>
                        <br></br>
                        <br></br>
                        <div className="card text-center">
                            <div className="card-header text-center about-us">
                                About Us
                        </div>
                            <div className="card-body white-bk1">
                                <h5 className="card-title">Beauty Buddy</h5>
                                <p className="card-text">The Beauty Buddy is the resource hub for luxury and designer cosmetics, all falling under Beauty Buddies umbrella. The Beauty Buddy features in-depth products, reviews, photos, and even some video tutorials. Focused on providing #BeautyBuddies all around the globe with insight on all different products for all. It serves as a trusted guide when navigating through the oftentimes overwhelming world of luxury beauty products and goods.</p>
                                <p>Always have your favorite beauty products at the tip of your fingers!</p>
                                <a href="/" className="btn btn-md btn-outline-secondary">Subscribe</a>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <div className="row picheading">
                            <h2 className="header">Follow Us on Instagram #BeautyBuddies</h2>
                        </div>
                        <div className="row seperate1">
                            <img src="./image/stockimg.png" alt="Stock Pretty Images" />
                        </div>
                    </div>
                </div>
                <br></br>
                <br></br>

                <footer className="page-footer font-small special-color-dark pt-4">
                    <div className="container-2">
                        <ul className="list-unstyled list-inline text-center">
                            <li className="list-inline-item">
                                <a className="btn-floating btn-fb mx-1">
                                    <i className="fab fa-facebook-f"> </i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a className="btn-floating btn-tw mx-1">
                                    <i className="fab fa-twitter"> </i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a className="btn-floating btn-gplus mx-1">
                                    <i className="fab fa-google-plus-g"> </i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a className="btn-floating btn-li mx-1">
                                    <i className="fab fa-linkedin-in"> </i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a className="btn-floating btn-dribbble mx-1">
                                    <i className="fab fa-dribbble"> </i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-copyright text-center py-3">© 2019 Copyright:
      <a href="https://beautybuddy.herokuapp.com/">beautybuddy.herokuapp.com</a>
                    </div>
                </footer>
            </div>

        );
    }
}

export default Category;