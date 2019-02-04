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
            </div>
            </div>
        );
    }
}

export default Category;