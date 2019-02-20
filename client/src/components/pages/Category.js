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
                                Who We Are
                        </div>
                            <div className="card-body white-bk1">
                                <h5 className="card-title">The Beauty Buddies!</h5>
                                <p className="card-text">Beauty Buddy is the journaled resource hub for luxury and designer cosmetics, all falling under The Beauty Buddy umbrella. Beauty Buddy features in-depth products, reviews, photos, swatches, and even video tutorials. Focused on providing beautiful peeople all over the world with insight on new and trendy products. It serves as a trusted guide when navigating through the oftentimes overwhelming world of luxury beauty products and goods.</p>
                                <p>Always have your favorite beauty products at the tip of your fingers!</p>
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
            </div>
        );
    }
}

export default Category;