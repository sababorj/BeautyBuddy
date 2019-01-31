import React, { Component } from 'react';
import AuthService from './AuthService';
import { Link } from 'react-router-dom';

class Category extends Component {
    constructor() {
        super();
        this.Auth = new AuthService();
    }


    render() {
        return (
            <div> category </div>
        );
    }
}

export default Category;