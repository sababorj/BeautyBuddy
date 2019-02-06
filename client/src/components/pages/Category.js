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
                    <h1>Wink, Smile & Shine!</h1>
                </div>
                <div data-spy="scroll" data-target="#navbar-example3" data-offset="0">
                    <div className="container">
                        <div className="row">
                            {this.state.type.map(item => (
                                <>
                                    {/* <h1 key={item.id} className="category-tag">{item.name}</h1> */}
                                    <div key={item.name} className="category-image" style={{ backgroundImage: `url(${item.image})` }} onClick={() => this.GoToItem(item.name)}>
                                    </div>
                                </>
                            ))}
                        </div>
                        <div className="card text-center">
                            <div className="card-header">
                                About Us
                        </div>
                            <div className="card-body">
                                <h5 className="card-title">Always have your favorite beauty products at the tip of your hands!</h5>
                                <p className="card-text">This will be edited</p>
                                <button className="btn btn-primary">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Category;