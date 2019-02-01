import React, { Component } from 'react';
import AuthService from './AuthService';
import { Link } from 'react-router-dom';

class Item extends Component {
    constructor() {
        super();
        this.Auth = new AuthService();
    }


    render() {
        return (
            <div> Item </div>
        );
    }
}

export default Item;