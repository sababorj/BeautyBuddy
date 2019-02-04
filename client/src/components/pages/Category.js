import React, { Component } from 'react';
import AuthService from './AuthService';
import type from '../../category.json';
import './style.css';
import API from '../../utils/API';

class Category extends Component {
    constructor() {
        super();
        this.Auth = new AuthService();
    }
    state = {
        type: type
    }

    GoToItem = (name) => {
        API.itemCall(name).then(item => {
            this.props.history.replace({
                pathname: '/item',
                state: { productResult: item }
            });
        });

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
                                    <h1 key={item.id} className="category-tag">{item.name}</h1>
                                    <div key={item.name} className="category-image" style={{ backgroundImage: `url(${item.image})` }} onClick={() => this.GoToItem(item.name)}>
                                    </div>
                                </>
                            ))}
                        </div>
                        <div class="card text-center">
                            <div className="card-header">
                                About Us
                        </div>
                            <div className="card-body">
                                <h5 className="card-title">Special title treatment</h5>
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Category;