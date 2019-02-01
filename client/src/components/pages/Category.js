import React, { Component } from 'react';
import AuthService from './AuthService';
import type from '../../category.json'
import { Link } from 'react-router-dom';
import './style.css'

class Category extends Component {
    constructor() {
        super();
        this.Auth = new AuthService();
    }
 state={
     type: type
 }

 
    render() {
        return (
            <div classNAme="row">
            <div classNAme="col-6">
                {this.state.type.map(item => (
                    <>
                <h1 className="category-tag">{item.name}</h1>
                <div className="category-image" style={ {backgroundImage : `url(${item.image})`}}>
                </div>
                </>
                ))}
                </div>
              </div>  
        );
    }
}

export default Category;